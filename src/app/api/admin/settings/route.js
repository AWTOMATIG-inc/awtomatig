import { writeFile, mkdir } from "fs/promises";
import path from "path";
import crypto from "crypto";
import prisma from "@/lib/prisma";
import { getAuthenticatedUser, hashPassword, verifyPassword } from "@/lib/auth-service";

export const dynamic = "force-dynamic";

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
    console.error("GET settings error:", error);
    return Response.json({ success: false, message: "Failed to fetch settings." }, { status: 500 });
  }
}

export async function PATCH(request) {
  try {
    const user = await getAuthenticatedUser(request);
    if (!user) {
      return Response.json({ success: false, message: "Unauthorized." }, { status: 401 });
    }

    const contentType = request.headers.get("content-type") || "";

    let fullName = null;
    let email = null;
    let currentPassword = null;
    let newPassword = null;
    let removeAvatar = false;
    let avatarFile = null;
    let newAvatarUrl = undefined;

    if (contentType.includes("multipart/form-data")) {
      const formData = await request.formData();
      if (formData.has("fullName")) fullName = formData.get("fullName")?.toString().trim();
      if (formData.has("email")) email = formData.get("email")?.toString().trim().toLowerCase();
      if (formData.has("currentPassword")) currentPassword = formData.get("currentPassword")?.toString();
      if (formData.has("newPassword")) newPassword = formData.get("newPassword")?.toString();
      if (formData.has("removeAvatar")) {
        const val = formData.get("removeAvatar");
        removeAvatar = val === "true" || val === true;
      }

      const file = formData.get("avatar");
      if (file && typeof file === "object" && typeof file.arrayBuffer === "function" && file.size > 0) {
        avatarFile = file;
      }
    } else {
      const json = await request.json();
      if (json.fullName !== undefined) fullName = json.fullName?.trim();
      if (json.email !== undefined) email = json.email?.trim().toLowerCase();
      if (json.currentPassword !== undefined) currentPassword = json.currentPassword;
      if (json.newPassword !== undefined) newPassword = json.newPassword;
      if (json.removeAvatar !== undefined) removeAvatar = Boolean(json.removeAvatar);
    }

    const updateData = {};

    // 1. Full name update
    if (fullName !== null && fullName !== undefined) {
      if (!fullName) {
        return Response.json({ success: false, message: "Full Name cannot be empty." }, { status: 400 });
      }
      updateData.fullName = fullName;
    }

    // 2. Email update
    if (email !== null && email !== undefined && email !== user.email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return Response.json({ success: false, message: "Please provide a valid email address." }, { status: 400 });
      }

      const existingUser = await prisma.user.findUnique({
        where: { email },
      });

      if (existingUser && existingUser.id !== user.id) {
        return Response.json({ success: false, message: "Email is already in use by another account." }, { status: 409 });
      }

      updateData.email = email;
    }

    // 3. Password update
    if (newPassword) {
      if (newPassword.length < 6) {
        return Response.json({ success: false, message: "New password must be at least 6 characters." }, { status: 400 });
      }

      if (!currentPassword) {
        return Response.json({ success: false, message: "Current password is required to set a new password." }, { status: 400 });
      }

      // Fetch user with passwordHash
      const dbUser = await prisma.user.findUnique({
        where: { id: user.id },
      });

      if (!dbUser) {
        return Response.json({ success: false, message: "User not found." }, { status: 404 });
      }

      const isCurrentValid = await verifyPassword(currentPassword, dbUser.passwordHash);
      if (!isCurrentValid) {
        return Response.json({ success: false, message: "Current password is incorrect." }, { status: 400 });
      }

      updateData.passwordHash = await hashPassword(newPassword);
    }

    // 4. Avatar file upload
    if (avatarFile) {
      if (avatarFile.size > 5 * 1024 * 1024) {
        return Response.json({ success: false, message: "Image file exceeds 5MB limit." }, { status: 400 });
      }

      const originalName = avatarFile.name || "avatar.png";
      const ext = path.extname(originalName).toLowerCase();
      const allowedExts = [".png", ".jpg", ".jpeg", ".webp"];

      const isMimeAllowed = ["image/png", "image/jpeg", "image/webp"].includes(avatarFile.type);
      if (!allowedExts.includes(ext) || !isMimeAllowed) {
        return Response.json({ success: false, message: "Only raster images (PNG, JPG, WebP) are allowed. SVG is disabled for security." }, { status: 400 });
      }

      const avatarsDir = path.join(process.cwd(), "public", "uploads", "avatars");
      const resolvedDir = path.resolve(/*turbopackIgnore: true*/ avatarsDir);
      await mkdir(resolvedDir, { recursive: true });

      const safeExt = ext;
      const uniqueSuffix = `${Date.now()}-${crypto.randomBytes(4).toString("hex")}`;
      const diskFileName = `avatar-${uniqueSuffix}${safeExt}`;
      const diskFilePath = path.join(resolvedDir, diskFileName);

      const fileBuffer = Buffer.from(await avatarFile.arrayBuffer());
      await writeFile(diskFilePath, fileBuffer);

      newAvatarUrl = `/uploads/avatars/${diskFileName}`;
    } else if (removeAvatar) {
      newAvatarUrl = null;
    }

    // Update avatar_url directly in SQL to bypass cached Prisma client DMMF
    if (newAvatarUrl !== undefined) {
      try {
        await prisma.$executeRaw`UPDATE users SET avatar_url = ${newAvatarUrl}, updated_at = NOW() WHERE id = ${user.id}`;
      } catch (e) {
        console.error("Raw avatar update error:", e);
      }
    }

    if (Object.keys(updateData).length === 0 && newAvatarUrl === undefined) {
      return Response.json({ success: true, message: "No changes requested.", user });
    }

    // Update standard user fields if any were modified
    if (Object.keys(updateData).length > 0) {
      await prisma.user.update({
        where: { id: user.id },
        data: updateData,
      });
    }

    // Fetch updated user
    const updatedUser = await prisma.user.findUnique({
      where: { id: user.id },
      select: {
        id: true,
        email: true,
        fullName: true,
        role: true,
        createdAt: true,
      },
    });

    try {
      const raw = await prisma.$queryRaw`SELECT avatar_url FROM users WHERE id = ${user.id} LIMIT 1`;
      updatedUser.avatarUrl = raw?.[0]?.avatar_url || null;
    } catch {
      updatedUser.avatarUrl = null;
    }

    return Response.json({
      success: true,
      message: "Profile and settings updated successfully.",
      user: updatedUser,
    });
  } catch (error) {
    console.error("PATCH settings error:", error);
    return Response.json({ success: false, message: "Failed to update settings." }, { status: 500 });
  }
}
