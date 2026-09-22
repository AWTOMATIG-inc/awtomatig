import prisma from "@/lib/prisma";
import { getAuthenticatedUser } from "@/lib/auth-service";
import { jobSchema } from "@/lib/validators/job";

export async function GET(request) {
  const user = await getAuthenticatedUser(request);
  if (!user) {
    return Response.json({ success: false, message: "Unauthorized." }, { status: 401 });
  }

  try {
    const jobs = await prisma.job.findMany({
      include: {
        _count: {
          select: { applications: true },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return Response.json({ success: true, jobs });
  } catch (error) {
    console.error("Admin fetch jobs error:", error);
    return Response.json({ success: false, message: "Failed to fetch jobs." }, { status: 500 });
  }
}

export async function POST(request) {
  const user = await getAuthenticatedUser(request);
  if (!user) {
    return Response.json({ success: false, message: "Unauthorized." }, { status: 401 });
  }

  try {
    const body = await request.json();

    // Support newline-separated strings for requirements & benefits
    if (typeof body.requirements === "string") {
      body.requirements = body.requirements.split("\n").map((r) => r.trim()).filter(Boolean);
    }
    if (typeof body.benefits === "string") {
      body.benefits = body.benefits.split("\n").map((b) => b.trim()).filter(Boolean);
    }

    const result = jobSchema.safeParse(body);

    if (!result.success) {
      return Response.json(
        { success: false, message: result.error.issues[0]?.message || "Invalid input." },
        { status: 400 }
      );
    }

    const data = result.data;

    // Check slug uniqueness
    const existing = await prisma.job.findUnique({
      where: { slug: data.slug },
    });

    if (existing) {
      return Response.json(
        { success: false, message: "A job opening with this slug already exists." },
        { status: 409 }
      );
    }

    const job = await prisma.job.create({
      data,
    });

    return Response.json({
      success: true,
      message: "Job opening created successfully.",
      job,
    });
  } catch (error) {
    console.error("Admin create job error:", error);
    return Response.json(
      { success: false, message: "Failed to create job opening." },
      { status: 500 }
    );
  }
}
