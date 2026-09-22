import prisma from "@/lib/prisma";

export async function GET(request, { params }) {
  try {
    const { slug } = await params;

    const job = await prisma.job.findUnique({
      where: { slug },
    });

    if (!job || job.status !== "PUBLISHED") {
      return Response.json({ success: false, message: "Job opening not found." }, { status: 404 });
    }

    return Response.json({
      success: true,
      job: {
        id: job.id,
        slug: job.slug,
        title: job.title,
        department: job.department,
        location: job.location,
        workMode: job.workMode,
        salary: job.salary,
        type: job.type,
        summary: job.summary,
        descriptionMarkdown: job.descriptionMarkdown,
        requirements: job.requirements,
        benefits: job.benefits,
        customQuestions: job.customQuestions,
        createdAt: job.createdAt,
      },
    });
  } catch (error) {
    console.error("Fetch job details error:", error);
    return Response.json(
      { success: false, message: "Failed to fetch job details." },
      { status: 500 }
    );
  }
}
