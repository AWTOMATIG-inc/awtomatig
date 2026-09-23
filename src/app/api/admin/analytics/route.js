import { BetaAnalyticsDataClient } from "@google-analytics/data";
import { getAuthenticatedUser } from "@/lib/auth-service";

// In-memory cache to prevent exceeding Google Analytics API rate limits
const cache = new Map();
const CACHE_TTL_MS = 3 * 60 * 1000; // 3 minutes cache

export async function GET(request) {
  const user = await getAuthenticatedUser(request);
  if (!user) {
    return Response.json(
      { success: false, message: "Unauthorized." },
      { status: 401 }
    );
  }

  const { searchParams } = new URL(request.url);
  const period = searchParams.get("period") || "30d";
  const forceRefresh = searchParams.get("refresh") === "true";

  const propertyId = process.env.GA_PROPERTY_ID;
  const clientEmail = process.env.GA_CLIENT_EMAIL;
  let privateKey = process.env.GA_PRIVATE_KEY;

  if (!propertyId || !clientEmail || !privateKey) {
    return Response.json({
      success: false,
      configured: false,
      errorType: "CONFIG_MISSING",
      propertyId: propertyId || "",
      clientEmail: clientEmail || "",
      message:
        "Google Analytics credentials are not fully configured in environment variables.",
    });
  }

  // Check in-memory cache
  const cacheKey = `analytics_${propertyId}_${period}`;
  const cached = cache.get(cacheKey);
  if (!forceRefresh && cached && Date.now() - cached.timestamp < CACHE_TTL_MS) {
    return Response.json({ success: true, ...cached.data, fromCache: true });
  }

  try {
    privateKey = privateKey.replace(/\\n/g, "\n");

    const client = new BetaAnalyticsDataClient({
      credentials: {
        client_email: clientEmail,
        private_key: privateKey,
      },
    });

    const propertyName = `properties/${propertyId.trim()}`;

    // Define date ranges based on selected period
    let days = 30;
    if (period === "7d") days = 7;
    if (period === "90d") days = 90;

    const currentStartDate = `${days}daysAgo`;
    const currentEndDate = "today";
    const prevStartDate = `${days * 2}daysAgo`;
    const prevEndDate = `${days + 1}daysAgo`;

    // Run parallel queries to GA4
    const [
      overviewReport,
      timelineReport,
      channelsReport,
      topPagesReport,
      geoReport,
      deviceReport,
      realtimeReport,
    ] = await Promise.allSettled([
      // 1. Overview KPIs (Current & Previous periods)
      client.runReport({
        property: propertyName,
        dateRanges: [
          { startDate: currentStartDate, endDate: currentEndDate, name: "current" },
          { startDate: prevStartDate, endDate: prevEndDate, name: "previous" },
        ],
        metrics: [
          { name: "activeUsers" },
          { name: "newUsers" },
          { name: "sessions" },
          { name: "screenPageViews" },
          { name: "averageSessionDuration" },
          { name: "bounceRate" },
        ],
      }),

      // 2. Timeline Trend
      client.runReport({
        property: propertyName,
        dateRanges: [{ startDate: currentStartDate, endDate: currentEndDate }],
        dimensions: [{ name: "date" }],
        metrics: [
          { name: "activeUsers" },
          { name: "screenPageViews" },
          { name: "sessions" },
        ],
        orderBys: [{ dimension: { dimensionName: "date" }, desc: false }],
      }),

      // 3. Acquisition Channels
      client.runReport({
        property: propertyName,
        dateRanges: [{ startDate: currentStartDate, endDate: currentEndDate }],
        dimensions: [{ name: "sessionDefaultChannelGroup" }],
        metrics: [{ name: "activeUsers" }, { name: "sessions" }],
        orderBys: [{ metric: { metricName: "activeUsers" }, desc: true }],
        limit: 8,
      }),

      // 4. Top Pages
      client.runReport({
        property: propertyName,
        dateRanges: [{ startDate: currentStartDate, endDate: currentEndDate }],
        dimensions: [{ name: "pagePath" }, { name: "pageTitle" }],
        metrics: [{ name: "screenPageViews" }, { name: "activeUsers" }],
        orderBys: [{ metric: { metricName: "screenPageViews" }, desc: true }],
        limit: 10,
      }),

      // 5. Geography (Countries)
      client.runReport({
        property: propertyName,
        dateRanges: [{ startDate: currentStartDate, endDate: currentEndDate }],
        dimensions: [{ name: "country" }],
        metrics: [{ name: "activeUsers" }, { name: "sessions" }],
        orderBys: [{ metric: { metricName: "activeUsers" }, desc: true }],
        limit: 7,
      }),

      // 6. Device Categories
      client.runReport({
        property: propertyName,
        dateRanges: [{ startDate: currentStartDate, endDate: currentEndDate }],
        dimensions: [{ name: "deviceCategory" }],
        metrics: [{ name: "activeUsers" }],
        orderBys: [{ metric: { metricName: "activeUsers" }, desc: true }],
      }),

      // 7. Realtime Users (last 30 minutes)
      client.runRealtimeReport({
        property: propertyName,
        metrics: [{ name: "activeUsers" }],
      }),
    ]);

    // Check if the primary overview report was rejected due to permissions or API error
    if (overviewReport.status === "rejected") {
      const errorMsg = overviewReport.reason?.message || "Failed to query Google Analytics";
      const isPermissionDenied = errorMsg.includes("PERMISSION_DENIED");

      return Response.json({
        success: false,
        configured: true,
        errorType: isPermissionDenied ? "PERMISSION_DENIED" : "API_ERROR",
        propertyId,
        clientEmail,
        message: errorMsg,
      });
    }

    // ── Parse Overview KPIs ──
    const overviewRows = overviewReport.value?.[0]?.rows || [];
    const currentRow = overviewRows.find((r) => !r.dimensionValues?.[0]?.value || r.dimensionValues?.[0]?.value === "current") || overviewRows[0];
    const prevRow = overviewRows.find((r) => r.dimensionValues?.[0]?.value === "previous") || overviewRows[1];

    const parseNum = (val) => {
      const n = Number(val);
      return Number.isFinite(n) ? n : 0;
    };

    const currentMetrics = {
      activeUsers: parseNum(currentRow?.metricValues?.[0]?.value),
      newUsers: parseNum(currentRow?.metricValues?.[1]?.value),
      sessions: parseNum(currentRow?.metricValues?.[2]?.value),
      pageviews: parseNum(currentRow?.metricValues?.[3]?.value),
      avgSessionDuration: parseNum(currentRow?.metricValues?.[4]?.value),
      bounceRate: parseNum(currentRow?.metricValues?.[5]?.value) * 100,
    };

    const prevMetrics = {
      activeUsers: parseNum(prevRow?.metricValues?.[0]?.value),
      newUsers: parseNum(prevRow?.metricValues?.[1]?.value),
      sessions: parseNum(prevRow?.metricValues?.[2]?.value),
      pageviews: parseNum(prevRow?.metricValues?.[3]?.value),
      avgSessionDuration: parseNum(prevRow?.metricValues?.[4]?.value),
      bounceRate: parseNum(prevRow?.metricValues?.[5]?.value) * 100,
    };

    const calcDelta = (curr, prev) => {
      if (prev === 0) return curr > 0 ? 100 : 0;
      return Number((((curr - prev) / prev) * 100).toFixed(1));
    };

    const kpiSummary = {
      activeUsers: { value: currentMetrics.activeUsers, change: calcDelta(currentMetrics.activeUsers, prevMetrics.activeUsers) },
      newUsers: { value: currentMetrics.newUsers, change: calcDelta(currentMetrics.newUsers, prevMetrics.newUsers) },
      sessions: { value: currentMetrics.sessions, change: calcDelta(currentMetrics.sessions, prevMetrics.sessions) },
      pageviews: { value: currentMetrics.pageviews, change: calcDelta(currentMetrics.pageviews, prevMetrics.pageviews) },
      avgSessionDuration: {
        value: Math.round(currentMetrics.avgSessionDuration),
        change: calcDelta(currentMetrics.avgSessionDuration, prevMetrics.avgSessionDuration),
      },
      bounceRate: {
        value: Number(currentMetrics.bounceRate.toFixed(1)),
        change: calcDelta(currentMetrics.bounceRate, prevMetrics.bounceRate),
      },
    };

    // ── Parse Timeline ──
    const timelineRows = timelineReport.status === "fulfilled" ? timelineReport.value[0]?.rows || [] : [];
    const timeline = timelineRows.map((r) => {
      const rawDate = r.dimensionValues?.[0]?.value || "";
      // rawDate is YYYYMMDD -> parse to friendly label
      let label = rawDate;
      if (rawDate.length === 8) {
        const year = rawDate.substring(0, 4);
        const month = rawDate.substring(4, 6);
        const day = rawDate.substring(6, 8);
        const dateObj = new Date(`${year}-${month}-${day}T00:00:00Z`);
        label = dateObj.toLocaleDateString("en-US", { month: "short", day: "numeric", timeZone: "UTC" });
      }

      return {
        date: rawDate,
        label,
        users: parseNum(r.metricValues?.[0]?.value),
        pageviews: parseNum(r.metricValues?.[1]?.value),
        sessions: parseNum(r.metricValues?.[2]?.value),
      };
    });

    // ── Parse Channels ──
    const channelRows = channelsReport.status === "fulfilled" ? channelsReport.value[0]?.rows || [] : [];
    const totalChannelUsers = channelRows.reduce((acc, r) => acc + parseNum(r.metricValues?.[0]?.value), 0) || 1;
    const channels = channelRows.map((r) => {
      const name = r.dimensionValues?.[0]?.value || "Direct";
      const users = parseNum(r.metricValues?.[0]?.value);
      const sessions = parseNum(r.metricValues?.[1]?.value);
      const percentage = Math.round((users / totalChannelUsers) * 100);
      return { name, users, sessions, percentage };
    });

    // ── Parse Top Pages ──
    const pageRows = topPagesReport.status === "fulfilled" ? topPagesReport.value[0]?.rows || [] : [];
    const maxPageviews = Math.max(...pageRows.map((r) => parseNum(r.metricValues?.[0]?.value)), 1);
    const topPages = pageRows.map((r) => {
      const path = r.dimensionValues?.[0]?.value || "/";
      const title = r.dimensionValues?.[1]?.value || path;
      const views = parseNum(r.metricValues?.[0]?.value);
      const users = parseNum(r.metricValues?.[1]?.value);
      const percentage = Math.round((views / maxPageviews) * 100);
      return { path, title, views, users, percentage };
    });

    // ── Parse Geography ──
    const geoRows = geoReport.status === "fulfilled" ? geoReport.value[0]?.rows || [] : [];
    const totalGeoUsers = geoRows.reduce((acc, r) => acc + parseNum(r.metricValues?.[0]?.value), 0) || 1;
    const countries = geoRows.map((r) => {
      const country = r.dimensionValues?.[0]?.value || "Unknown";
      const users = parseNum(r.metricValues?.[0]?.value);
      const sessions = parseNum(r.metricValues?.[1]?.value);
      const percentage = Math.round((users / totalGeoUsers) * 100);
      return { country, users, sessions, percentage };
    });

    // ── Parse Devices ──
    const deviceRows = deviceReport.status === "fulfilled" ? deviceReport.value[0]?.rows || [] : [];
    const totalDeviceUsers = deviceRows.reduce((acc, r) => acc + parseNum(r.metricValues?.[0]?.value), 0) || 1;
    const devices = deviceRows.map((r) => {
      const category = r.dimensionValues?.[0]?.value || "desktop";
      const users = parseNum(r.metricValues?.[0]?.value);
      const percentage = Math.round((users / totalDeviceUsers) * 100);
      return { category, users, percentage };
    });

    // ── Parse Realtime ──
    let realtimeActiveUsers = 0;
    if (realtimeReport.status === "fulfilled" && realtimeReport.value[0]?.rows?.length > 0) {
      realtimeActiveUsers = parseNum(realtimeReport.value[0].rows[0]?.metricValues?.[0]?.value);
    }

    const payload = {
      configured: true,
      propertyId,
      period,
      realtimeActiveUsers,
      kpiSummary,
      timeline,
      channels,
      topPages,
      countries,
      devices,
      updatedAt: new Date().toISOString(),
    };

    // Store in cache
    cache.set(cacheKey, { timestamp: Date.now(), data: payload });

    return Response.json({ success: true, ...payload });
  } catch (error) {
    console.error("Google Analytics API Handler Error:", error);
    return Response.json({
      success: false,
      configured: true,
      errorType: "INTERNAL_ERROR",
      propertyId,
      clientEmail,
      message: error.message || "An unexpected error occurred while communicating with Google Analytics.",
    });
  }
}
