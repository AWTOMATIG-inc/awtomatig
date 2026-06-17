import { authenticateRequest } from "@/lib/auth";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function PATCH(request, { params }) {
  const user = authenticateRequest(request);
  if (!user) {
    return Response.json({ success: false, message: "Unauthorized." }, { status: 401 });
  }

  try {
    const { id } = await params;
    const body = await request.json();

    if (!ObjectId.isValid(id)) {
      return Response.json({ success: false, message: "Invalid ID." }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db();
    const collection = db.collection("applications");

    const update = {};
    if (body.status) update.status = body.status;
    update.updated_at = new Date();

    const result = await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: update }
    );

    if (result.matchedCount === 0) {
      return Response.json({ success: false, message: "Application not found." }, { status: 404 });
    }

    return Response.json({ success: true, message: "Application updated." });
  } catch (error) {
    console.error("Update application error:", error);
    return Response.json(
      { success: false, message: "Failed to update application." },
      { status: 500 }
    );
  }
}
