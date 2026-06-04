import nodemailer from "nodemailer";

export async function POST(request) {
  const { fullname, email, subject, message } = await request.json();

  if (!fullname || !email || !subject || !message) {
    return Response.json({ error: "All fields are required." }, { status: 400 });
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  await transporter.sendMail({
    from: `"${fullname}" <${process.env.SMTP_USER}>`,
    to: process.env.CONTACT_TO,
    subject: `[Contact] ${subject}`,
    html: `
      <p><strong>Name:</strong> ${fullname}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Subject:</strong> ${subject}</p>
      <p><strong>Message:</strong></p>
      <p>${message.replace(/\n/g, "<br/>")}</p>
    `,
  });

  return Response.json({ success: true });
}
