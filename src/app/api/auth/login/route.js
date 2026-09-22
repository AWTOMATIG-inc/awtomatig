import prisma from "@/lib/prisma";
import { verifyPassword, signSessionToken, setSessionCookie } from "@/lib/auth-service";
import { loginSchema } from "@/lib/validators/auth";

export async function POST(request) {
  try {
    const body = await request.json();
    const result = loginSchema.safeParse(body);

    if (!result.success) {
      return Response.json(
        { success: false, message: result.error.issues[0]?.message || "Invalid input." },
        { status: 400 }
      );
    }

    const { email, password } = result.data;
    const normalizedEmail = email.trim().toLowerCase();

    const user = await prisma.user.findUnique({
      where: { email: normalizedEmail },
    });

    if (!user) {
      return Response.json(
        { success: false, message: "Invalid email or password." },
        { status: 401 }
      );
    }

    const isValidPassword = await verifyPassword(password, user.passwordHash);
    if (!isValidPassword) {
      return Response.json(
        { success: false, message: "Invalid email or password." },
        { status: 401 }
      );
    }

    // Sign session token
    const token = signSessionToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    });

    // Set secure httpOnly cookie
    await setSessionCookie(token);

    // Query avatar_url
    let avatarUrl = null;
    try {
      const raw = await prisma.$queryRaw`SELECT avatar_url FROM users WHERE id = ${user.id} LIMIT 1`;
      avatarUrl = raw?.[0]?.avatar_url || null;
    } catch {
      avatarUrl = null;
    }

    return Response.json({
      success: true,
      token,
      user: {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
        role: user.role,
        avatarUrl,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    return Response.json(
      { success: false, message: "Internal server error." },
      { status: 500 }
    );
  }
}
