import prisma from "@/lib/prisma";
import { getAuthenticatedUser } from "@/lib/auth-service";
import { addNoteSchema } from "@/lib/validators/auth";

export async function POST(request, { params }) {
  const user = await getAuthenticatedUser(request);
  if (!user) {
    return Response.json({ success: false, message: "Unauthorized." }, { status: 401 });
  }

  try {
    const { id } = await params;
    const body = await request.json();
    const result = addNoteSchema.safeParse(body);

    if (!result.success) {
      return Response.json(
        { success: false, message: result.error.issues[0]?.message || "Invalid input." },
        { status: 400 }
      );
    }

    const application = await prisma.application.findUnique({
      where: { id },
    });

    if (!application) {
      return Response.json({ success: false, message: "Application not found." }, { status: 404 });
    }

    const note = await prisma.candidateNote.create({
      data: {
        applicationId: id,
        userId: user.id,
        content: result.data.content,
      },
      include: {
        author: {
          select: { id: true, fullName: true, email: true, role: true },
        },
      },
    });

    // Record Event
    await prisma.candidateEvent.create({
      data: {
        applicationId: id,
        userId: user.id,
        eventType: "NOTE_ADDED",
        details: { noteId: note.id },
      },
    });

    return Response.json({
      success: true,
      message: "Note added successfully.",
      note,
    });
  } catch (error) {
    console.error("Add candidate note error:", error);
    return Response.json(
      { success: false, message: "Failed to add note." },
      { status: 500 }
    );
  }
}
