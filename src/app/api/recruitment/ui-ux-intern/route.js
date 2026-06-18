import clientPromise from "@/lib/mongodb";

export async function POST(request) {
  try {
    const data = await request.json();

    if (!data.full_name || !data.email || !data.phone || !data.portfolio_url) {
      return Response.json(
        { success: false, message: "Required fields are missing." },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db();
    const collection = db.collection("uiux_applications");

    const existing = await collection.findOne({ email: data.email.trim().toLowerCase() });
    if (existing) {
      return Response.json(
        { success: false, message: "An application with this email already exists." },
        { status: 409 }
      );
    }

    const application = {
      ...data,
      email: data.email.trim().toLowerCase(),
      position: "uiux_intern",
      status: "active",
      submitted_at: new Date().toISOString(),
      created_at: new Date(),
    };

    await collection.insertOne(application);

    return Response.json({ success: true, message: "Application submitted successfully." });
  } catch (error) {
    console.error("UI/UX intern application submission error:", error);
    return Response.json(
      { success: false, message: "Internal server error. Please try again." },
      { status: 500 }
    );
  }
}
