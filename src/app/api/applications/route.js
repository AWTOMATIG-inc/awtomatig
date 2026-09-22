import { writeFile, mkdir } from "fs/promises";
import path from "path";
import crypto from "crypto";
import prisma from "@/lib/prisma";
import { evaluateCandidate } from "@/lib/scoring-engine";

export async function POST(request) {
  try {
    const contentType = request.headers.get("content-type") || "";

    let jobSlug = "";
    let fullName = "";
    let email = "";
    let phone = "";
    let location = "";
    let githubUrl = "";
    let portfolioUrl = "";
    let linkedinUrl = "";
    let deployedUrl = "";
    let customAnswers = {};
    let education = [];
    let resumeFile = null;

    const safeString = (val) => (typeof val === "string" ? val.trim() : "");
    const safeUrl = (val) => {
      const s = safeString(val);
      if (!s) return "";
      try {
        const parsed = new URL(s);
        if (parsed.protocol === "http:" || parsed.protocol === "https:") {
          return s;
        }
      } catch {
        // invalid URL
      }
      return "";
    };

    if (contentType.includes("multipart/form-data")) {
      const formData = await request.formData();
      jobSlug = safeString(formData.get("jobSlug"));
      fullName = safeString(formData.get("fullName"));
      email = safeString(formData.get("email")).toLowerCase();
      phone = safeString(formData.get("phone"));
      location = safeString(formData.get("location"));
      githubUrl = safeUrl(formData.get("githubUrl"));
      portfolioUrl = safeUrl(formData.get("portfolioUrl"));
      linkedinUrl = safeUrl(formData.get("linkedinUrl"));
      deployedUrl = safeUrl(formData.get("deployedUrl"));

      const rawAnswers = formData.get("customAnswers");
      if (rawAnswers) {
        try {
          customAnswers = typeof rawAnswers === "string" ? JSON.parse(rawAnswers) : rawAnswers;
        } catch {
          customAnswers = {};
        }
      }

      const rawEducation = formData.get("education");
      education = [];
      if (rawEducation) {
        try {
          education = typeof rawEducation === "string" ? JSON.parse(rawEducation) : rawEducation;
        } catch {
          education = [];
        }
      }

      const file = formData.get("resume");
      if (file && typeof file === "object" && typeof file.arrayBuffer === "function") {
        resumeFile = file;
      }
    } else {
      const json = await request.json();
      jobSlug = safeString(json.jobSlug);
      fullName = safeString(json.fullName);
      email = safeString(json.email).toLowerCase();
      phone = safeString(json.phone);
      location = safeString(json.location);
      githubUrl = safeUrl(json.githubUrl);
      portfolioUrl = safeUrl(json.portfolioUrl);
      linkedinUrl = safeUrl(json.linkedinUrl);
      deployedUrl = safeUrl(json.deployedUrl);
      customAnswers = json.customAnswers && typeof json.customAnswers === "object" ? json.customAnswers : {};
      education = Array.isArray(json.education) ? json.education : [];
    }

    // Basic Validation
    if (!jobSlug || !fullName || !email || !phone) {
      return Response.json(
        { success: false, message: "Job, Full Name, Email, and Phone are required." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return Response.json(
        { success: false, message: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    // 11-Digit Phone Validation
    let cleanPhone = phone.replace(/[^\d+]/g, "").trim();
    let digitsOnly = cleanPhone.replace(/\D/g, "");
    if (digitsOnly.startsWith("880") && digitsOnly.length === 13) {
      digitsOnly = digitsOnly.slice(2);
    }
    if (digitsOnly.length !== 11) {
      return Response.json(
        { success: false, message: "Phone number must be exactly 11 digits (e.g. 01712345678)." },
        { status: 400 }
      );
    }
    phone = digitsOnly;

    // Find the targeted job
    const job = await prisma.job.findUnique({
      where: { slug: jobSlug },
    });

    if (!job || job.status !== "PUBLISHED") {
      return Response.json(
        { success: false, message: "The selected job posting is not currently accepting applications." },
        { status: 400 }
      );
    }

    // Validate Required Screening Questions
    let screeningQuestions = [];
    if (job.customQuestions) {
      if (Array.isArray(job.customQuestions)) {
        screeningQuestions = job.customQuestions;
      } else if (Array.isArray(job.customQuestions.screeningQuestions)) {
        screeningQuestions = job.customQuestions.screeningQuestions;
      }
    }

    for (const q of screeningQuestions) {
      if (q.required) {
        const val = customAnswers[q.id];
        const isMissing = val === undefined || val === null || val === "" || (Array.isArray(val) && val.length === 0);
        if (isMissing) {
          return Response.json(
            { success: false, message: `Please answer the mandatory screening question: "${q.label}".` },
            { status: 400 }
          );
        }
      }
    }

    // Attach educational records to customAnswers
    if (Array.isArray(education) && education.length > 0) {
      customAnswers._education = education;
    }

    // Prevent duplicate submission for the same job
    const existing = await prisma.application.findFirst({
      where: {
        jobId: job.id,
        email: email,
      },
    });

    if (existing) {
      return Response.json(
        { success: false, message: "You have already submitted an application for this position." },
        { status: 409 }
      );
    }

    // Handle Local Resume File Upload
    let resumeFileName = null;
    let resumePath = null;
    let resumeSize = null;

    if (resumeFile && resumeFile.size > 0) {
      // 5MB max limit
      if (resumeFile.size > 5 * 1024 * 1024) {
        return Response.json(
          { success: false, message: "Resume file exceeds 5MB limit." },
          { status: 400 }
        );
      }

      // Check PDF MIME or extension
      const originalName = resumeFile.name || "resume.pdf";
      const isPdf =
        resumeFile.type === "application/pdf" ||
        originalName.toLowerCase().endsWith(".pdf");

      if (!isPdf) {
        return Response.json(
          { success: false, message: "Only PDF files are accepted for resumes." },
          { status: 400 }
        );
      }

      const uploadBaseDir = process.env.UPLOAD_DIR || path.join(process.cwd(), "storage", "uploads", "resumes");
      const resolvedDir = path.resolve(/*turbopackIgnore: true*/ uploadBaseDir);
      await mkdir(resolvedDir, { recursive: true });

      const uniqueSuffix = `${Date.now()}-${crypto.randomBytes(6).toString("hex")}`;
      const sanitizedName = originalName.replace(/[^a-zA-Z0-9.-]/g, "_");
      const diskFileName = `${uniqueSuffix}-${sanitizedName}`;
      const diskFilePath = path.join(resolvedDir, diskFileName);

      const buffer = Buffer.from(await resumeFile.arrayBuffer());
      await writeFile(diskFilePath, buffer);

      resumeFileName = originalName;
      resumePath = diskFileName; // relative key stored in DB
      resumeSize = resumeFile.size;
    }

    // Server-Side Deterministic Evaluation & Priority Calculation
    const evaluation = evaluateCandidate(job.slug, customAnswers, {
      githubUrl,
      portfolioUrl,
      linkedinUrl,
      deployedUrl,
    });

    // Save Application to PostgreSQL
    const application = await prisma.application.create({
      data: {
        jobId: job.id,
        fullName,
        email,
        phone,
        location: location || null,
        githubUrl: githubUrl || null,
        portfolioUrl: portfolioUrl || null,
        linkedinUrl: linkedinUrl || null,
        deployedUrl: deployedUrl || null,
        resumeFileName,
        resumePath,
        resumeSize,
        customAnswers,
        stage: "APPLIED",
        priority: evaluation.priority,
        score: evaluation.score,
        events: {
          create: {
            eventType: "APPLIED",
            details: {
              score: evaluation.score,
              priority: evaluation.priority,
              hardReject: evaluation.hardReject,
              rejectReasons: evaluation.rejectReasons,
            },
          },
        },
      },
    });

    return Response.json({
      success: true,
      message: "Application submitted successfully.",
      applicationId: application.id,
    });
  } catch (error) {
    console.error("Application submission error:", error);
    return Response.json(
      { success: false, message: "Internal server error. Please try again later." },
      { status: 500 }
    );
  }
}
