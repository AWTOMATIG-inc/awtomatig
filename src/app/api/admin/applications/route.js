import { authenticateRequest } from "@/lib/auth";
import clientPromise from "@/lib/mongodb";

const COLLECTION_MAP = {
  fullstack_intern: "applications",
  uiux_intern: "uiux_applications",
  content_seo_executive: "content_seo_applications",
};

export async function GET(request) {
  const user = authenticateRequest(request);
  if (!user) {
    return Response.json({ success: false, message: "Unauthorized." }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status") || "active";
    const position = searchParams.get("position") || "fullstack_intern";

    const collectionName = COLLECTION_MAP[position] || "applications";

    const client = await clientPromise;
    const db = client.db();
    const collection = db.collection(collectionName);

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
