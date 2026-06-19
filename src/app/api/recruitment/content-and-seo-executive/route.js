import clientPromise from "@/lib/mongodb";

export async function POST(request) {
  try {
    const data = await request.json();

    if (
      !data.basicInfo?.fullName ||
      !data.basicInfo?.email ||
      !data.basicInfo?.phone
    ) {
      return Response.json(
        { success: false, message: "Required fields are missing." },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db();
    const collection = db.collection("content_seo_applications");

    const email = data.basicInfo.email.trim().toLowerCase();
    const existing = await collection.findOne({ "basicInfo.email": email });
    if (existing) {
      return Response.json(
        { success: false, message: "An application with this email already exists." },
        { status: 409 }
      );
    }

    const application = {
      ...data,
      basicInfo: { ...data.basicInfo, email },
      position: "content_seo_executive",
      status: "active",
      submitted_at: new Date().toISOString(),
      created_at: new Date(),
    };

    await collection.insertOne(application);

    return Response.json({ success: true, message: "Application submitted successfully." });
  } catch (error) {
    console.error("Content & SEO application submission error:", error);
    return Response.json(
      { success: false, message: "Internal server error. Please try again." },
      { status: 500 }
    );
  }
}
