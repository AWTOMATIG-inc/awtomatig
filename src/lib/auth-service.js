import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import prisma from "@/lib/prisma";

const JWT_SECRET = process.env.JWT_SECRET || "aw-admin-jwt-secret-change-this-in-production-2026";
if (process.env.NODE_ENV === "production" && (!process.env.JWT_SECRET || process.env.JWT_SECRET === "aw-admin-jwt-secret-change-this-in-production-2026")) {
  console.warn("SECURITY WARNING: JWT_SECRET is using default fallback in production. Please define a unique JWT_SECRET in .env.");
}
const COOKIE_NAME = process.env.COOKIE_NAME || "aw_session";
const TOKEN_EXPIRY = "7d";

/**
 * Hash a plain text password
 */
export async function hashPassword(password) {
  return bcrypt.hash(password, 10);
}

/**
 * Verify a plain text password against a hash
 */
export async function verifyPassword(password, hash) {
  return bcrypt.compare(password, hash);
}

/**
 * Sign a JWT token for a user session
 */
export function signSessionToken(payload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: TOKEN_EXPIRY });
}

/**
 * Verify a JWT session token
 */
export function verifySessionToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch {
    return null;
  }
}

/**
 * Set session cookie in Next.js Server Components / Route Handlers
 */
export async function setSessionCookie(token) {
  const cookieStore = await cookies();
  cookieStore.set({
    name: COOKIE_NAME,
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });
}

/**
 * Clear session cookie on logout
 */
export async function clearSessionCookie() {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}

/**
 * Get the currently authenticated user from cookies or Authorization header
 */
export async function getAuthenticatedUser(request = null) {
  let token = null;

  // 1. Try reading from httpOnly cookie via next/headers
  try {
    const cookieStore = await cookies();
    token = cookieStore.get(COOKIE_NAME)?.value;
  } catch {
    // cookies() might fail if called outside request context
  }

  // 2. Fallback to request.cookies (NextRequest)
  if (!token && request?.cookies) {
    try {
      token = typeof request.cookies.get === "function"
        ? request.cookies.get(COOKIE_NAME)?.value
        : request.cookies[COOKIE_NAME];
    } catch {
      //
    }
  }

  // 3. Fallback to parsing raw Cookie header
  if (!token && request?.headers) {
    try {
      const cookieHeader = request.headers.get("cookie") || "";
      const match = cookieHeader.match(new RegExp(`(?:^|;\\s*)${COOKIE_NAME}=([^;]*)`));
      if (match) {
        token = decodeURIComponent(match[1]);
      }
    } catch {
      //
    }
  }

  // 4. Fallback to Authorization: Bearer <token>
  if (!token && request?.headers) {
    try {
      const authHeader = request.headers.get("authorization");
      if (authHeader?.startsWith("Bearer ")) {
        token = authHeader.slice(7).trim();
      }
    } catch {
      //
    }
  }

  if (!token) return null;

  const payload = verifySessionToken(token);
  if (!payload?.userId) return null;

  try {
    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
      select: {
        id: true,
        email: true,
        fullName: true,
        role: true,
        createdAt: true,
      },
    });

    if (!user) return null;

    // Safely query avatar_url directly from PostgreSQL table to avoid cached Prisma client DMMF issues
    try {
      const raw = await prisma.$queryRaw`SELECT avatar_url FROM users WHERE id = ${user.id} LIMIT 1`;
      user.avatarUrl = raw?.[0]?.avatar_url || null;
    } catch {
      user.avatarUrl = null;
    }

    return user;
  } catch (err) {
    console.error("getAuthenticatedUser DB query error:", err);
    return null;
  }
}
