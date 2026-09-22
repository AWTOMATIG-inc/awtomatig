import { getAuthenticatedUser } from "@/lib/auth-service";

export async function GET(request) {
  try {
    const user = await getAuthenticatedUser(request);

    if (!user) {
      return Response.json({ success: false, message: "Unauthorized." }, { status: 401 });
    }

    return Response.json({
      success: true,
      user,
    });
  } catch (error) {
    console.error("Auth Me error:", error);
    return Response.json({ success: false, message: "Failed to verify session: " + error.message }, { status: 500 });
  }
}
