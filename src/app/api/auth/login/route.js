import { signToken } from "@/lib/auth";

export async function POST(request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return Response.json(
        { success: false, message: "Email and password are required." },
        { status: 400 }
      );
    }

    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (email !== adminEmail || password !== adminPassword) {
      return Response.json(
        { success: false, message: "Invalid credentials." },
        { status: 401 }
      );
    }

    const token = signToken({ email, role: "admin" });

    return Response.json({ success: true, token });
  } catch (error) {
    console.error("Login error:", error);
    return Response.json(
      { success: false, message: "Internal server error." },
      { status: 500 }
    );
  }
}
