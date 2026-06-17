import { authenticateRequest } from "@/lib/auth";
import clientPromise from "@/lib/mongodb";

export async function GET(request) {
  const user = authenticateRequest(request);
  if (!user) {
    return Response.json({ success: false, message: "Unauthorized." }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status") || "active";

    const client = await clientPromise;
    const db = client.db();
    const collection = db.collection("applications");

    const filter = status === "all" ? {} : { status };
    const applications = await collection
      .find(filter)
      .sort({ created_at: -1 })
      .toArray();

    const serialized = applications.map((app) => ({
      ...app,
      _id: app._id.toString(),
    }));

    return Response.json({ success: true, applications: serialized });
  } catch (error) {
    console.error("Fetch applications error:", error);
    return Response.json(
      { success: false, message: "Failed to fetch applications." },
      { status: 500 }
    );
  }
}
