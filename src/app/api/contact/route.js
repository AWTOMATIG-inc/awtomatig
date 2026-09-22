import nodemailer from "nodemailer";
import prisma from "@/lib/prisma";
import crypto from "crypto";

export async function POST(request) {
  try {
    const { fullname, email, subject, message } = await request.json();

    if (!fullname || !email || !subject || !message) {
      return Response.json({ success: false, error: "All fields are required." }, { status: 400 });
    }

    const trimmedName = String(fullname).trim();
    const trimmedEmail = String(email).trim().toLowerCase();
    const trimmedSubject = String(subject).trim();
    const trimmedMessage = String(message).trim();

    // 1. Permanently record inquiry in PostgreSQL
    try {
      await prisma.contactLead.create({
        data: {
          fullName: trimmedName,
          email: trimmedEmail,
          subject: trimmedSubject,
          message: trimmedMessage,
          status: "NEW",
        },
      });
    } catch (dbErr) {
      console.error("Database save contact lead error:", dbErr);
    }

    // 2. Dispatch email via Nodemailer if SMTP configured
    if (process.env.SMTP_USER && process.env.SMTP_PASS) {
      try {
        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
          },
        });

        await transporter.sendMail({
          from: `"${trimmedName}" <${process.env.SMTP_USER}>`,
          to: process.env.CONTACT_TO || process.env.SMTP_USER,
          subject: `[Contact] ${trimmedSubject}`,
          html: `
            <p><strong>Name:</strong> ${trimmedName}</p>
            <p><strong>Email:</strong> ${trimmedEmail}</p>
            <p><strong>Subject:</strong> ${trimmedSubject}</p>
            <p><strong>Message:</strong></p>
            <p>${trimmedMessage.replace(/\n/g, "<br/>")}</p>
          `,
        });
      } catch (mailErr) {
        console.error("SMTP delivery failed (inquiry saved to DB):", mailErr);
      }
    }

    return Response.json({ success: true, message: "Thank you for reaching out! We will contact you soon." });
  } catch (error) {
    console.error("Contact API error:", error);
    return Response.json({ success: false, error: "Internal server error." }, { status: 500 });
  }
}
