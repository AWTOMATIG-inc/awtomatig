import prisma from "@/lib/prisma";
import { getAuthenticatedUser } from "@/lib/auth-service";

export const dynamic = "force-dynamic";

export async function GET(request) {
  const user = await getAuthenticatedUser(request);
  if (!user) {
    return Response.json({ success: false, message: "Unauthorized." }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const jobSlug = searchParams.get("jobSlug") || searchParams.get("position");
    const stage = searchParams.get("stage") || searchParams.get("status");
    const priority = searchParams.get("priority");
    const search = searchParams.get("search");
    const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10));
    const limit = Math.max(1, Math.min(100, parseInt(searchParams.get("limit") || "50", 10)));
    const skip = (page - 1) * limit;

    // Build filters
    const where = {};

    // Map old status names if passed
    const stageMap = {
      active: "APPLIED",
      applied: "APPLIED",
      screening: "SCREENING",
      interview: "INTERVIEW",
      offer: "OFFER",
      approved: "HIRED",
      hired: "HIRED",
      rejected: "REJECTED",
    };

    if (stage && stage !== "all") {
      const normalizedStage = stageMap[stage.toLowerCase()] || stage.toUpperCase();
      where.stage = normalizedStage;
    }

    if (priority && priority !== "all") {
      where.priority = priority.toUpperCase();
    }

    if (jobSlug && jobSlug !== "all") {
      // support both slug and old position keys
      const slugAliases = {
        fullstack_intern: "full-stack-intern",
        uiux_intern: "ui-ux-intern",
        content_seo_executive: "content-and-seo-executive",
      };
      const resolvedSlug = slugAliases[jobSlug] || jobSlug;
      where.job = { slug: resolvedSlug };
    }

    if (search) {
      where.OR = [
        { fullName: { contains: search, mode: "insensitive" } },
        { email: { contains: search, mode: "insensitive" } },
        { phone: { contains: search, mode: "insensitive" } },
        { location: { contains: search, mode: "insensitive" } },
      ];
    }

    // Query applications
    const [applications, totalCount] = await Promise.all([
      prisma.application.findMany({
        where,
        include: {
          job: {
            select: {
              id: true,
              slug: true,
              title: true,
              department: true,
            },
          },
          _count: {
            select: { notes: true },
          },
        },
        orderBy: [{ priority: "asc" }, { score: "desc" }, { createdAt: "desc" }],
        skip,
        take: limit,
      }),
      prisma.application.count({ where }),
    ]);

    // Compute faceted summary counts across all stages using efficient groupBy
    const summaryWhere = {};
    if (where.job) summaryWhere.job = where.job;

    const [allCount, highPriorityCount, stageGroups] = await Promise.all([
      prisma.application.count({ where: summaryWhere }),
      prisma.application.count({ where: { ...summaryWhere, priority: "HIGH_PRIORITY" } }),
      prisma.application.groupBy({
        by: ["stage"],
        where: summaryWhere,
        _count: { _all: true },
      }),
    ]);

    const stageCounts = {};
    stageGroups.forEach((g) => {
      stageCounts[g.stage.toLowerCase()] = g._count._all;
    });

    return Response.json({
      success: true,
      applications,
      pagination: {
        page,
        limit,
        totalCount,
        totalPages: Math.ceil(totalCount / limit) || 1,
      },
      summary: {
        all: allCount,
        applied: stageCounts.applied || 0,
        screening: stageCounts.screening || 0,
        interview: stageCounts.interview || 0,
        offer: stageCounts.offer || 0,
        hired: stageCounts.hired || 0,
        rejected: stageCounts.rejected || 0,
        highPriority: highPriorityCount,
      },
    });
  } catch (error) {
    console.error("Fetch applications error:", error);
    return Response.json(
      { success: false, message: "Failed to fetch applications." },
      { status: 500 }
    );
  }
}
