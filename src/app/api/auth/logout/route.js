import { clearSessionCookie } from "@/lib/auth-service";

export async function POST() {
  try {
    await clearSessionCookie();
    return Response.json({ success: true, message: "Logged out successfully." });
  } catch (error) {
    console.error("Logout error:", error);
    return Response.json({ success: false, message: "Logout failed." }, { status: 500 });
  }
}
