import prisma from "@/lib/prisma";
import { getAuthenticatedUser } from "@/lib/auth-service";

export const dynamic = "force-dynamic";

export async function GET(request, { params }) {
  const user = await getAuthenticatedUser(request);
  if (!user) {
    return Response.json({ success: false, message: "Unauthorized." }, { status: 401 });
  }

  try {
    const { id } = await params;
    const job = await prisma.job.findUnique({
      where: { id },
      include: {
        _count: {
          select: { applications: true },
        },
      },
    });

    if (!job) {
      return Response.json({ success: false, message: "Job not found." }, { status: 404 });
    }

    return Response.json({ success: true, job });
  } catch (error) {
    console.error("Get job error:", error);
    return Response.json({ success: false, message: "Failed to fetch job." }, { status: 500 });
  }
}

export async function PATCH(request, { params }) {
  const user = await getAuthenticatedUser(request);
  if (!user) {
    return Response.json({ success: false, message: "Unauthorized." }, { status: 401 });
  }

  try {
    const { id } = await params;
    const body = await request.json();

    const existing = await prisma.job.findUnique({
      where: { id },
    });

    if (!existing) {
      return Response.json({ success: false, message: "Job not found." }, { status: 404 });
    }

    const allowedKeys = [
      "title",
      "slug",
      "department",
      "location",
      "workMode",
      "salary",
      "type",
      "status",
      "summary",
      "descriptionMarkdown",
      "requirements",
      "benefits",
      "customQuestions",
      "scoringRules",
    ];

    const updateData = {};
    for (const key of allowedKeys) {
      if (body[key] !== undefined) {
        updateData[key] = body[key];
      }
    }

    // Clean up arrays if provided
    if (updateData.requirements && Array.isArray(updateData.requirements)) {
      updateData.requirements = updateData.requirements.map((r) => String(r).trim()).filter(Boolean);
    }
    if (updateData.benefits && Array.isArray(updateData.benefits)) {
      updateData.benefits = updateData.benefits.map((b) => String(b).trim()).filter(Boolean);
    }

    // Slug check if changed
    if (updateData.slug && updateData.slug !== existing.slug) {
      const slugExists = await prisma.job.findUnique({
        where: { slug: updateData.slug },
      });
      if (slugExists) {
        return Response.json(
          { success: false, message: "A job opening with this slug already exists." },
          { status: 409 }
        );
      }
    }

    const updated = await prisma.job.update({
      where: { id },
      data: updateData,
    });

    return Response.json({
      success: true,
      message: "Job updated successfully.",
      job: updated,
    });
  } catch (error) {
    console.error("Update job error:", error);
    return Response.json({ success: false, message: "Failed to update job." }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  const user = await getAuthenticatedUser(request);
  if (!user) {
    return Response.json({ success: false, message: "Unauthorized." }, { status: 401 });
  }

  try {
    const { id } = await params;
    const { searchParams } = new URL(request.url);
    const permanent = searchParams.get("permanent") === "true";

    if (permanent) {
      await prisma.job.delete({
        where: { id },
      });
      return Response.json({
        success: true,
        message: "Job opening permanently deleted.",
      });
    }

    const updated = await prisma.job.update({
      where: { id },
      data: { status: "ARCHIVED" },
    });

    return Response.json({
      success: true,
      message: "Job archived successfully.",
      job: updated,
    });
  } catch (error) {
    console.error("Archive job error:", error);
    return Response.json({ success: false, message: "Failed to archive job." }, { status: 500 });
  }
}
