import prisma from "@/lib/prisma";
import { getAuthenticatedUser } from "@/lib/auth-service";

export async function GET(request, { params }) {
  const user = await getAuthenticatedUser(request);
  if (!user) {
    return Response.json({ success: false, message: "Unauthorized." }, { status: 401 });
  }

  try {
    const { id } = await params;

    const application = await prisma.application.findUnique({
      where: { id },
      include: {
        job: true,
        notes: {
          include: {
            author: {
              select: { id: true, fullName: true, email: true, role: true },
            },
          },
          orderBy: { createdAt: "desc" },
        },
        events: {
          include: {
            actor: {
              select: { id: true, fullName: true, email: true },
            },
          },
          orderBy: { createdAt: "desc" },
        },
      },
    });

    if (!application) {
      return Response.json({ success: false, message: "Application not found." }, { status: 404 });
    }

    return Response.json({ success: true, application });
  } catch (error) {
    console.error("Get application error:", error);
    return Response.json(
      { success: false, message: "Failed to load application details." },
      { status: 500 }
    );
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

    const existing = await prisma.application.findUnique({
      where: { id },
    });

    if (!existing) {
      return Response.json({ success: false, message: "Application not found." }, { status: 404 });
    }

    const updateData = {};
    const eventDetails = {};

    // Stage update
    const allowedStages = ["APPLIED", "SCREENING", "INTERVIEW", "OFFER", "HIRED", "REJECTED"];
    if (body.stage) {
      const stageUpper = body.stage.toUpperCase();
      if (!allowedStages.includes(stageUpper)) {
        return Response.json({ success: false, message: "Invalid stage." }, { status: 400 });
      }
      updateData.stage = stageUpper;
      eventDetails.previousStage = existing.stage;
      eventDetails.newStage = stageUpper;
    }

    // Support legacy "status" property mapping from older frontends
    if (body.status && !body.stage) {
      const legacyMap = {
        active: "APPLIED",
        approved: "HIRED",
        rejected: "REJECTED",
      };
      const mapped = legacyMap[body.status.toLowerCase()] || body.status.toUpperCase();
      if (allowedStages.includes(mapped)) {
        updateData.stage = mapped;
        eventDetails.previousStage = existing.stage;
        eventDetails.newStage = mapped;
      }
    }

    // Priority update
    if (body.priority) {
      const priorityUpper = body.priority.toUpperCase();
      if (["HIGH_PRIORITY", "MEDIUM_PRIORITY", "LOW_PRIORITY"].includes(priorityUpper)) {
        updateData.priority = priorityUpper;
        eventDetails.newPriority = priorityUpper;
      }
    }

    // Rating (1-5)
    if (typeof body.rating === "number" && body.rating >= 1 && body.rating <= 5) {
      updateData.rating = body.rating;
      eventDetails.newRating = body.rating;
    }

    // Archived
    if (typeof body.archived === "boolean") {
      updateData.archived = body.archived;
    }

    const updated = await prisma.application.update({
      where: { id },
      data: updateData,
    });

    // Record Event
    if (Object.keys(eventDetails).length > 0) {
      await prisma.candidateEvent.create({
        data: {
          applicationId: id,
          userId: user.id,
          eventType: body.stage || body.status ? "STAGE_UPDATED" : "PROFILE_UPDATED",
          details: eventDetails,
        },
      });
    }

    return Response.json({
      success: true,
      message: "Application updated successfully.",
      application: updated,
    });
  } catch (error) {
    console.error("Update application error:", error);
    return Response.json(
      { success: false, message: "Failed to update application." },
      { status: 500 }
    );
  }
}
