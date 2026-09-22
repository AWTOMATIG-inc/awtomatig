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
    const status = searchParams.get("status") || "all";
    const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10));
    const limit = Math.max(1, Math.min(100, parseInt(searchParams.get("limit") || "25", 10)));
    const offset = (page - 1) * limit;

    const where = status !== "all" ? { status } : {};

    const [leads, totalCount, statusCounts] = await Promise.all([
      prisma.contactLead.findMany({
        where,
        orderBy: { createdAt: "desc" },
        take: limit,
        skip: offset,
      }),
      prisma.contactLead.count({ where }),
      prisma.contactLead.groupBy({
        by: ["status"],
        _count: { _all: true },
      }),
    ]);

    const summary = { all: 0, new: 0, read: 0, contacted: 0 };
    statusCounts.forEach((s) => {
      const count = s._count._all;
      summary.all += count;
      if (s.status.toLowerCase() in summary) {
        summary[s.status.toLowerCase()] = count;
      }
    });

    return Response.json({
      success: true,
      inquiries: leads,
      pagination: {
        page,
        limit,
        totalCount,
        totalPages: Math.ceil(totalCount / limit) || 1,
      },
      summary,
    });
  } catch (error) {
    console.error("Admin fetch inquiries error:", error);
    return Response.json(
      { success: false, message: "Failed to fetch inquiries." },
      { status: 500 }
    );
  }
}
