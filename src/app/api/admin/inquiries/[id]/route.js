import prisma from "@/lib/prisma";
import { getAuthenticatedUser } from "@/lib/auth-service";

export const dynamic = "force-dynamic";

export async function PATCH(request, { params }) {
  const user = await getAuthenticatedUser(request);
  if (!user) {
    return Response.json({ success: false, message: "Unauthorized." }, { status: 401 });
  }

  try {
    const { id } = await params;
    const body = await request.json();

    const allowedStatuses = ["NEW", "READ", "CONTACTED", "ARCHIVED"];
    const status = String(body.status || "").toUpperCase();

    if (!allowedStatuses.includes(status)) {
      return Response.json({ success: false, message: "Invalid status." }, { status: 400 });
    }

    await prisma.contactLead.update({
      where: { id },
      data: { status },
    });

    return Response.json({ success: true, message: `Inquiry status updated to ${status}.` });
  } catch (error) {
    console.error("Update inquiry error:", error);
    return Response.json({ success: false, message: "Failed to update inquiry." }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  const user = await getAuthenticatedUser(request);
  if (!user) {
    return Response.json({ success: false, message: "Unauthorized." }, { status: 401 });
  }

  try {
    const { id } = await params;

    await prisma.contactLead.delete({
      where: { id },
    });

    return Response.json({ success: true, message: "Inquiry deleted successfully." });
  } catch (error) {
    console.error("Delete inquiry error:", error);
    return Response.json({ success: false, message: "Failed to delete inquiry." }, { status: 500 });
  }
}
