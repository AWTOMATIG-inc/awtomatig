import { readFile } from "fs/promises";
import path from "path";
import prisma from "@/lib/prisma";
import { getAuthenticatedUser } from "@/lib/auth-service";

export const dynamic = "force-dynamic";

export async function GET(request, { params }) {
  const user = await getAuthenticatedUser(request);
  if (!user) {
    return new Response("Unauthorized", { status: 401 });
  }

  try {
    const { id } = await params;

    const application = await prisma.application.findUnique({
      where: { id },
      select: {
        resumePath: true,
        resumeFileName: true,
      },
    });

    if (!application || !application.resumePath) {
      return new Response("Resume file not found.", { status: 404 });
    }

    // Sanitize resumePath to avoid any directory traversal
    const safeResumePath = path.basename(application.resumePath);

    const primaryDir = process.env.UPLOAD_DIR || path.join(process.cwd(), "storage", "uploads", "resumes");
    const fallbackDir = path.join(process.cwd(), "public", "uploads", "resumes");

    let targetFilePath = path.resolve(primaryDir, safeResumePath);
    let fileBuffer = null;

    try {
      fileBuffer = await readFile(/*turbopackIgnore: true*/ targetFilePath);
    } catch {
      // Fallback to legacy public uploads if exists
      const fallbackFilePath = path.resolve(fallbackDir, safeResumePath);
      fileBuffer = await readFile(/*turbopackIgnore: true*/ fallbackFilePath);
      targetFilePath = fallbackFilePath;
    }

    return new Response(fileBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `inline; filename="${encodeURIComponent(application.resumeFileName || "resume.pdf")}"`,
        "Cache-Control": "private, max-age=3600",
      },
    });
  } catch (error) {
    console.error("Stream resume error:", error);
    return new Response("Failed to load resume file.", { status: 500 });
  }
}
