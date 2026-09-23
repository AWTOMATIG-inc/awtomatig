"use client";

import { useState, useEffect, useId } from "react";
import {
  TrendingUp,
  TrendingDown,
  Users,
  Eye,
  Activity,
  Clock,
  Globe,
  Smartphone,
  Monitor,
  Tablet,
  RefreshCw,
  AlertTriangle,
  Copy,
  Check,
  ExternalLink,
  Loader2,
  Calendar,
} from "lucide-react";

export default function AnalyticsSection() {
  const [period, setPeriod] = useState("30d");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [activeHoverPoint, setActiveHoverPoint] = useState(null);

  const fetchAnalytics = async (selectedPeriod = period, isRefresh = false) => {
    if (isRefresh) setRefreshing(true);
    else setLoading(true);
    setError(null);

    try {
      const res = await fetch(
        `/api/admin/analytics?period=${selectedPeriod}${isRefresh ? "&refresh=true" : ""}`
      );
      const json = await res.json();

      if (!json.success) {
        setError(json);
        setData(null);
      } else {
        setData(json);
        setError(null);
      }
    } catch (err) {
      setError({
        errorType: "NETWORK_ERROR",
        message: err.message || "Failed to reach analytics server.",
      });
      setData(null);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchAnalytics(period);
  }, [period]);

  const handleCopyEmail = (email) => {
    if (!email) return;
    navigator.clipboard.writeText(email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const formatDuration = (seconds) => {
    if (!seconds || seconds <= 0) return "0s";
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    if (mins === 0) return `${secs}s`;
    return `${mins}m ${secs}s`;
  };

  const formatNumber = (num) => {
    if (num === undefined || num === null) return "0";
    return Number(num).toLocaleString();
  };

  return (
    <div className="space-y-6 w-full">
      {/* ── Top Header Controls ── */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight font-heading">
              Google Analytics Overview
            </h2>
            {data?.realtimeActiveUsers !== undefined && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#33E6D8]/10 border border-[#33E6D8]/20 text-[#33E6D8] text-xs font-mono font-medium">
                <span className="w-2 h-2 rounded-full bg-[#33E6D8] animate-pulse" />
                <span>{data.realtimeActiveUsers} active now</span>
              </span>
            )}
          </div>
          <p className="text-xs text-white/50 font-mono mt-1">
            Real-time web traffic, user engagement, and audience demographics
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2.5 self-stretch sm:self-auto">
          {/* Timeframe Pills */}
          <div className="bg-[#090A0E] border border-white/[0.08] p-1 rounded-xl flex items-center gap-1">
            {[
              { key: "7d", label: "7 Days" },
              { key: "30d", label: "30 Days" },
              { key: "90d", label: "90 Days" },
            ].map((t) => (
              <button
                key={t.key}
                onClick={() => setPeriod(t.key)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-colors cursor-pointer ${
                  period === t.key
                    ? "bg-[#33E6D8] text-black font-semibold shadow-sm"
                    : "text-white/60 hover:text-white hover:bg-white/[0.04]"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* Refresh Button */}
          <button
            onClick={() => fetchAnalytics(period, true)}
            disabled={loading || refreshing}
            className="p-2 bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] hover:border-[#33E6D8]/30 rounded-xl text-white/70 hover:text-[#33E6D8] transition-all cursor-pointer disabled:opacity-50"
            title="Refresh Analytics Data"
            aria-label="Refresh Analytics Data"
          >
            <RefreshCw
              className={`w-4 h-4 ${refreshing ? "animate-spin text-[#33E6D8]" : ""}`}
            />
          </button>
        </div>
      </div>

      {/* ── Diagnostics / Permission Banner ── */}
      {error && (
        <div className="bg-[#090A0E] border border-amber-500/30 rounded-2xl p-6 sm:p-7 shadow-xl space-y-4">
          <div className="flex items-start gap-4">
            <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 shrink-0">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-base font-bold text-white font-heading tracking-tight mb-1">
                {error.errorType === "PERMISSION_DENIED"
                  ? "Google Analytics Viewer Permission Needed"
                  : error.errorType === "CONFIG_MISSING"
                  ? "Google Analytics Environment Variables Missing"
                  : "Google Analytics Connection Notice"}
              </h3>
              <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
                {error.errorType === "PERMISSION_DENIED" ? (
                  <>
                    Your Google Cloud Service Account is communicating successfully, but
                    needs to be added as a <strong>Viewer</strong> inside your Google
                    Analytics 4 Property.
                  </>
                ) : (
                  error.message
                )}
              </p>

              {error.clientEmail && (
                <div className="mt-4 p-4 rounded-xl bg-[#050608] border border-white/[0.08] space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <p className="text-[11px] font-mono uppercase text-white/40 font-medium">
                        Service Account Email to Grant Access:
                      </p>
                      <p className="text-xs sm:text-sm font-mono text-[#33E6D8] font-semibold break-all mt-0.5">
                        {error.clientEmail}
                      </p>
                    </div>

                    <button
                      onClick={() => handleCopyEmail(error.clientEmail)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/[0.06] hover:bg-white/[0.1] border border-white/[0.1] rounded-lg text-xs font-mono text-white transition-colors cursor-pointer shrink-0"
                    >
                      {copiedEmail ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-emerald-400">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy Email</span>
                        </>
                      )}
                    </button>
                  </div>

                  <div className="text-xs text-white/60 space-y-1 pt-2 border-t border-white/[0.06]">
                    <p className="font-semibold text-white/80">Follow these 3 quick steps:</p>
                    <ol className="list-decimal list-inside space-y-1 text-white/60 text-xs">
                      <li>
                        Go to{" "}
                        <a
                          href="https://analytics.google.com/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#33E6D8] hover:underline inline-flex items-center gap-1"
                        >
                          Google Analytics <ExternalLink className="w-3 h-3" />
                        </a>{" "}
                        &rarr; <strong>Admin (⚙️)</strong> &rarr; <strong>Property Access Management</strong>.
                      </li>
                      <li>
                        Click the blue <strong>+</strong> button &rarr; <strong>Add users</strong> &rarr; paste the email above.
                      </li>
                      <li>
                        Select role <strong>Viewer</strong> &rarr; click <strong>Add</strong>.
                      </li>
                    </ol>
                  </div>
                </div>
              )}

              <div className="mt-4 flex items-center gap-3">
                <button
                  onClick={() => fetchAnalytics(period, true)}
                  disabled={refreshing}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-[#33E6D8] hover:bg-[#02D5E7] text-black font-semibold text-xs rounded-lg transition-colors cursor-pointer"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? "animate-spin" : ""}`} />
                  <span>Check Again</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Loading Skeleton ── */}
      {loading && !data && (
        <div className="py-20 flex flex-col items-center justify-center text-center">
          <Loader2 className="w-8 h-8 text-[#33E6D8] animate-spin mb-3" />
          <p className="text-sm font-mono text-white/60">
            Querying Google Analytics 4 data...
          </p>
        </div>
      )}

      {/* ── Analytics Content Dashboard ── */}
      {data && (
        <>
          {/* 1. KPI Metrics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3.5 sm:gap-4">
            {/* Active Users */}
            <KPICard
              label="Active Users"
              value={formatNumber(data.kpiSummary.activeUsers.value)}
              change={data.kpiSummary.activeUsers.change}
              subtext="Total unique visitors"
            />

            {/* Total Pageviews */}
            <KPICard
              label="Total Pageviews"
              value={formatNumber(data.kpiSummary.pageviews.value)}
              change={data.kpiSummary.pageviews.change}
              subtext="Screen & page views"
            />

            {/* Sessions */}
            <KPICard
              label="Total Sessions"
              value={formatNumber(data.kpiSummary.sessions.value)}
              change={data.kpiSummary.sessions.change}
              subtext="Individual visits"
            />

            {/* New Users */}
            <KPICard
              label="New Users"
              value={formatNumber(data.kpiSummary.newUsers.value)}
              change={data.kpiSummary.newUsers.change}
              subtext="First-time visitors"
            />

            {/* Avg Session Duration */}
            <KPICard
              label="Avg. Session Time"
              value={formatDuration(data.kpiSummary.avgSessionDuration.value)}
              change={data.kpiSummary.avgSessionDuration.change}
              subtext="Time on site per visit"
            />

            {/* Bounce Rate */}
            <KPICard
              label="Bounce Rate"
              value={`${data.kpiSummary.bounceRate.value}%`}
              change={data.kpiSummary.bounceRate.change}
              invertTrend
              subtext="Non-engaged sessions"
            />
          </div>

          {/* 2. Timeline Trend Visualization */}
          <div className="bg-[#090A0E] border border-white/[0.08] rounded-2xl p-5 sm:p-6 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-4 border-b border-white/[0.08]">
              <div>
                <h3 className="text-base font-bold text-white tracking-tight font-heading">
                  Traffic & Engagement Timeline
                </h3>
                <p className="text-xs text-white/50 font-mono mt-0.5">
                  Daily active users and pageview volume
                </p>
              </div>

              {/* Chart Legend */}
              <div className="flex items-center gap-4 text-xs font-mono">
                <span className="flex items-center gap-2 text-white/70">
                  <span className="w-3 h-3 rounded-sm bg-[#33E6D8]" />
                  <span>Pageviews</span>
                </span>
                <span className="flex items-center gap-2 text-white/70">
                  <span className="w-3 h-3 rounded-sm bg-purple-400" />
                  <span>Active Users</span>
                </span>
              </div>
            </div>

            {/* SVG Trend Chart */}
            <TimelineChart
              timeline={data.timeline}
              activeHoverPoint={activeHoverPoint}
              setActiveHoverPoint={setActiveHoverPoint}
            />
          </div>

          {/* 3. Acquisition Channels & Devices / Countries */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left 6 cols: Traffic Acquisition Channels */}
            <div className="lg:col-span-6 bg-[#090A0E] border border-white/[0.08] rounded-2xl p-5 sm:p-6 shadow-sm flex flex-col justify-between">
              <div>
                <h3 className="text-base font-bold text-white tracking-tight font-heading mb-1">
                  Traffic Acquisition Channels
                </h3>
                <p className="text-xs text-white/50 font-mono mb-4">
                  Where your visitors originated from
                </p>

                {data.channels.length === 0 ? (
                  <p className="text-xs text-white/40 font-mono py-8 text-center">
                    No channel acquisition data available for this timeframe.
                  </p>
                ) : (
                  <div className="space-y-3.5">
                    {data.channels.map((ch, idx) => (
                      <div key={idx} className="space-y-1.5">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-semibold text-white/90">
                            {ch.name}
                          </span>
                          <span className="font-mono text-white/60">
                            {formatNumber(ch.users)} users ({ch.percentage}%)
                          </span>
                        </div>
                        <div className="h-2 w-full bg-white/[0.04] rounded-full overflow-hidden">
                          <div
                            style={{ width: `${Math.max(ch.percentage, 3)}%` }}
                            className="h-full bg-gradient-to-r from-[#02D5E7] to-[#33E6D8] rounded-full transition-all duration-300"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Right 6 cols: Devices & Top Countries */}
            <div className="lg:col-span-6 space-y-6">
              {/* Devices Card */}
              <div className="bg-[#090A0E] border border-white/[0.08] rounded-2xl p-5 sm:p-6 shadow-sm">
                <h3 className="text-base font-bold text-white tracking-tight font-heading mb-1">
                  Device Categories
                </h3>
                <p className="text-xs text-white/50 font-mono mb-4">
                  Hardware platform breakdown
                </p>

                <div className="grid grid-cols-3 gap-3">
                  {["desktop", "mobile", "tablet"].map((cat) => {
                    const found = data.devices.find(
                      (d) => d.category.toLowerCase() === cat
                    );
                    const pct = found ? found.percentage : 0;
                    const users = found ? found.users : 0;

                    const Icon =
                      cat === "desktop"
                        ? Monitor
                        : cat === "mobile"
                        ? Smartphone
                        : Tablet;

                    return (
                      <div
                        key={cat}
                        className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-3.5 flex flex-col items-center text-center"
                      >
                        <div className="p-2 rounded-lg bg-white/[0.04] text-[#33E6D8] mb-2">
                          <Icon className="w-4 h-4" />
                        </div>
                        <span className="text-xs font-mono capitalize text-white/60">
                          {cat}
                        </span>
                        <span className="text-lg font-bold font-mono text-white mt-0.5">
                          {pct}%
                        </span>
                        <span className="text-[11px] font-mono text-white/40">
                          {formatNumber(users)} users
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Geography / Countries Card */}
              <div className="bg-[#090A0E] border border-white/[0.08] rounded-2xl p-5 sm:p-6 shadow-sm">
                <h3 className="text-base font-bold text-white tracking-tight font-heading mb-1">
                  Top Visitor Locations
                </h3>
                <p className="text-xs text-white/50 font-mono mb-3">
                  Audience countries by volume
                </p>

                <div className="space-y-2.5">
                  {data.countries.slice(0, 5).map((co, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between text-xs py-1.5 border-b border-white/[0.04] last:border-0"
                    >
                      <span className="font-medium text-white/80 truncate max-w-[180px]">
                        {co.country}
                      </span>
                      <span className="font-mono text-white/60">
                        {formatNumber(co.users)} visitors ({co.percentage}%)
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* 4. Top Visited Pages Table */}
          <div className="bg-[#090A0E] border border-white/[0.08] rounded-2xl p-5 sm:p-6 shadow-sm">
            <h3 className="text-base font-bold text-white tracking-tight font-heading mb-1">
              Top Visited Content & Pages
            </h3>
            <p className="text-xs text-white/50 font-mono mb-4">
              Most viewed public pages across the selected timeframe
            </p>

            <div className="overflow-x-auto -mx-5 sm:mx-0 px-5 sm:px-0">
              <table className="w-full text-left border-collapse min-w-[560px]">
                <thead>
                  <tr className="border-b border-white/[0.06] text-xs font-mono uppercase text-white/50 tracking-wider">
                    <th className="pb-3.5 font-semibold">Page URL & Title</th>
                    <th className="pb-3.5 font-semibold text-right">Pageviews</th>
                    <th className="pb-3.5 font-semibold text-right">Active Users</th>
                    <th className="pb-3.5 font-semibold text-right">Popularity</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.04] text-sm font-sans">
                  {data.topPages.map((pg, idx) => (
                    <tr key={idx} className="hover:bg-white/[0.02] transition-colors">
                      <td className="py-3.5 pr-4 max-w-sm">
                        <p className="font-medium text-white tracking-tight text-sm truncate">
                          {pg.path}
                        </p>
                        <p className="text-xs text-white/40 truncate mt-0.5">
                          {pg.title}
                        </p>
                      </td>
                      <td className="py-3.5 pr-4 text-right font-mono font-semibold text-white/90">
                        {formatNumber(pg.views)}
                      </td>
                      <td className="py-3.5 pr-4 text-right font-mono text-white/70 text-xs">
                        {formatNumber(pg.users)}
                      </td>
                      <td className="py-3.5 text-right w-36">
                        <div className="h-1.5 w-full bg-white/[0.06] rounded-full overflow-hidden">
                          <div
                            style={{ width: `${Math.max(pg.percentage, 4)}%` }}
                            className="h-full bg-[#33E6D8] rounded-full"
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

// ── Sub-Component: KPI Card with Delta Pill ──
function KPICard({ label, value, change, subtext, invertTrend = false }) {
  const isPositive = invertTrend ? change < 0 : change > 0;
  const isNeutral = change === 0 || isNaN(change);

  return (
    <div className="bg-[#090A0E] border border-white/[0.08] rounded-xl p-4 sm:p-5 flex flex-col justify-between shadow-sm">
      <div>
        <p className="text-xs font-mono uppercase tracking-wider text-white/50 mb-2 font-medium">
          {label}
        </p>
        <p className="text-2xl sm:text-3xl font-bold tracking-tight text-white font-mono">
          {value}
        </p>
      </div>

      <div className="mt-3.5 flex items-center justify-between gap-2">
        <span
          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-mono font-medium ${
            isNeutral
              ? "bg-white/[0.04] text-white/50 border border-white/[0.06]"
              : isPositive
              ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
              : "bg-rose-500/10 text-rose-400 border border-rose-500/20"
          }`}
        >
          {isPositive ? (
            <TrendingUp className="w-3 h-3" />
          ) : !isNeutral ? (
            <TrendingDown className="w-3 h-3" />
          ) : null}
          <span>{change > 0 ? `+${change}%` : `${change}%`}</span>
        </span>

        <span className="text-[11px] text-white/40 font-mono truncate">
          vs prev
        </span>
      </div>
    </div>
  );
}

// ── Sub-Component: Responsive SVG Timeline Chart ──
function TimelineChart({ timeline, activeHoverPoint, setActiveHoverPoint }) {
  const gradientId = useId();

  if (!timeline || timeline.length === 0) {
    return (
      <div className="h-64 flex items-center justify-center text-xs font-mono text-white/40">
        No timeline data points recorded for this timeframe.
      </div>
    );
  }

  const maxVal = Math.max(
    ...timeline.map((t) => Math.max(t.pageviews, t.users)),
    10
  );

  const height = 220;
  const width = 800; // SVG viewBox coordinates
  const paddingX = 20;
  const paddingY = 25;
  const chartWidth = width - paddingX * 2;
  const chartHeight = height - paddingY * 2;

  // Generate coordinates for SVG path
  const points = timeline.map((d, i) => {
    const x = paddingX + (i / Math.max(timeline.length - 1, 1)) * chartWidth;
    const yViews = paddingY + chartHeight - (d.pageviews / maxVal) * chartHeight;
    const yUsers = paddingY + chartHeight - (d.users / maxVal) * chartHeight;
    return { ...d, x, yViews, yUsers };
  });

  const viewsPath = points.reduce(
    (acc, p, i) => `${acc} ${i === 0 ? "M" : "L"} ${p.x.toFixed(1)} ${p.yViews.toFixed(1)}`,
    ""
  );

  const usersPath = points.reduce(
    (acc, p, i) => `${acc} ${i === 0 ? "M" : "L"} ${p.x.toFixed(1)} ${p.yUsers.toFixed(1)}`,
    ""
  );

  const areaPath = `${viewsPath} L ${points[points.length - 1].x.toFixed(1)} ${(
    paddingY + chartHeight
  ).toFixed(1)} L ${points[0].x.toFixed(1)} ${(paddingY + chartHeight).toFixed(1)} Z`;

  return (
    <div className="relative w-full overflow-hidden select-none">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full h-56 sm:h-64 overflow-visible"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#33E6D8" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#33E6D8" stopOpacity="0.0" />
          </linearGradient>
        </defs>

        {/* Horizontal Grid lines */}
        {[0, 0.33, 0.66, 1].map((ratio, idx) => {
          const y = paddingY + chartHeight * ratio;
          return (
            <line
              key={idx}
              x1={paddingX}
              y1={y}
              x2={width - paddingX}
              y2={y}
              stroke="rgba(255,255,255,0.06)"
              strokeDasharray="4 4"
            />
          );
        })}

        {/* Gradient Area under pageviews */}
        <path d={areaPath} fill={`url(#${gradientId})`} />

        {/* Line for Pageviews (Cyan) */}
        <path
          d={viewsPath}
          fill="none"
          stroke="#33E6D8"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Line for Active Users (Purple) */}
        <path
          d={usersPath}
          fill="none"
          stroke="#c084fc"
          strokeWidth="2"
          strokeDasharray="4 3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Hover interaction points */}
        {points.map((p, i) => (
          <g key={i}>
            <circle
              cx={p.x}
              cy={p.yViews}
              r="4"
              className="fill-[#33E6D8] transition-transform duration-150 hover:scale-150 cursor-pointer"
              onMouseEnter={() => setActiveHoverPoint(p)}
            />
            {/* Invisible expanded touch hit target */}
            <rect
              x={p.x - chartWidth / timeline.length / 2}
              y={0}
              width={chartWidth / timeline.length}
              height={height}
              fill="transparent"
              onMouseEnter={() => setActiveHoverPoint(p)}
              className="cursor-pointer"
            />
          </g>
        ))}

        {/* Active Hover Guide line */}
        {activeHoverPoint && (
          <line
            x1={activeHoverPoint.x}
            y1={paddingY}
            x2={activeHoverPoint.x}
            y2={paddingY + chartHeight}
            stroke="rgba(51, 230, 216, 0.4)"
            strokeWidth="1.5"
            strokeDasharray="2 2"
          />
        )}
      </svg>

      {/* Interactive Tooltip Card */}
      {activeHoverPoint && (
        <div
          style={{
            left: `${(activeHoverPoint.x / width) * 100}%`,
            top: "10%",
          }}
          className="absolute -translate-x-1/2 pointer-events-none z-20 bg-[#07080A] border border-white/15 rounded-xl px-3 py-2 shadow-2xl text-xs font-mono whitespace-nowrap animate-in fade-in duration-100"
        >
          <p className="text-white/60 mb-1 text-[11px] font-semibold">{activeHoverPoint.label}</p>
          <div className="flex items-center gap-3">
            <span className="text-[#33E6D8] font-bold">
              {Number(activeHoverPoint.pageviews).toLocaleString()} views
            </span>
            <span className="text-purple-400 font-medium">
              {Number(activeHoverPoint.users).toLocaleString()} users
            </span>
          </div>
        </div>
      )}

      {/* X-axis date labels */}
      <div className="flex items-center justify-between px-2 pt-2 text-[10px] font-mono text-white/40">
        <span>{timeline[0]?.label}</span>
        {timeline.length > 2 && (
          <span>{timeline[Math.floor(timeline.length / 2)]?.label}</span>
        )}
        <span>{timeline[timeline.length - 1]?.label}</span>
      </div>
    </div>
  );
}
