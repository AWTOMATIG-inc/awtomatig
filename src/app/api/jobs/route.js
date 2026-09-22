import prisma from "@/lib/prisma";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const department = searchParams.get("department");
    const type = searchParams.get("type");
    const search = searchParams.get("search");

    const where = {
      status: "PUBLISHED",
    };

    if (department && department !== "all") {
      where.department = { equals: department, mode: "insensitive" };
    }

    if (type && type !== "all") {
      where.type = type;
    }

    if (search) {
      where.OR = [
        { title: { contains: search, mode: "insensitive" } },
        { department: { contains: search, mode: "insensitive" } },
        { summary: { contains: search, mode: "insensitive" } },
      ];
    }

    const jobs = await prisma.job.findMany({
      where,
      select: {
        id: true,
        slug: true,
        title: true,
        department: true,
        location: true,
        workMode: true,
        salary: true,
        type: true,
        summary: true,
        requirements: true,
        createdAt: true,
      },
      orderBy: { createdAt: "desc" },
    });

    // Also get distinct departments for filter chips
    const allDepartments = await prisma.job.findMany({
      where: { status: "PUBLISHED" },
      distinct: ["department"],
      select: { department: true },
    });

    return Response.json({
      success: true,
      jobs,
      departments: allDepartments.map((d) => d.department),
    });
  } catch (error) {
    console.error("Fetch public jobs error:", error);
    return Response.json(
      { success: false, message: "Failed to fetch job openings." },
      { status: 500 }
    );
  }
}
