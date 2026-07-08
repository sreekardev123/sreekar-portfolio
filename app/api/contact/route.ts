import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Contact from "@/models/Contact";
import nodemailer from "nodemailer";

// ── Transporter ───────────────────────────────────────────────────────────────
function createTransporter() {
  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
}

// ── Cybercore Email Template ──────────────────────────────────────────────────
function buildEmailHTML(name: string, email: string, message: string): string {
  const safe = (s: string) =>
    s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\n/g, "<br/>");

  const timestamp = new Date().toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    year: "numeric", month: "short", day: "numeric",
    hour: "2-digit", minute: "2-digit", hour12: true,
  });

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1"/>
<title>New Portfolio Message</title>
</head>
<body style="margin:0;padding:0;background:#080810;font-family:'Segoe UI',Arial,sans-serif;">

<table width="100%" cellpadding="0" cellspacing="0" style="background:#080810;padding:32px 16px;">
<tr><td align="center">
<table width="520" cellpadding="0" cellspacing="0" style="max-width:520px;width:100%;">

  <!-- ── Top beam streaks (decorative) ── -->
  <tr><td style="padding-bottom:20px;">
    <table width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td style="width:1px;background:linear-gradient(to bottom,#00f5ff,transparent);height:48px;"></td>
        <td style="width:8px;"></td>
        <td style="width:1px;background:linear-gradient(to bottom,rgba(0,245,255,0.4),transparent);height:36px;"></td>
        <td style="width:16px;"></td>
        <td style="width:1px;background:linear-gradient(to bottom,rgba(124,58,237,0.6),transparent);height:52px;"></td>
        <td style="width:24px;"></td>
        <td style="width:1px;background:linear-gradient(to bottom,rgba(0,245,255,0.25),transparent);height:32px;"></td>
        <td></td>
        <td style="width:1px;background:linear-gradient(to bottom,rgba(236,72,153,0.5),transparent);height:44px;"></td>
        <td style="width:12px;"></td>
        <td style="width:1px;background:linear-gradient(to bottom,rgba(124,58,237,0.3),transparent);height:28px;"></td>
        <td style="width:20px;"></td>
        <td style="width:1px;background:linear-gradient(to bottom,#00f5ff,transparent);height:40px;"></td>
      </tr>
    </table>
  </td></tr>

  <!-- ── Main Card ── -->
  <tr><td style="background:#0c0c1a;border:1px solid rgba(0,245,255,0.15);border-radius:16px;overflow:hidden;">

    <!-- Glowing top line -->
    <div style="height:2px;background:linear-gradient(90deg,transparent,#00f5ff 30%,#7c3aed 70%,transparent);"></div>

    <!-- Grid floor overlay (top section) -->
    <table width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td style="padding:28px 32px 24px;background:linear-gradient(180deg,rgba(0,245,255,0.04) 0%,transparent 100%);border-bottom:1px solid rgba(255,255,255,0.06);">

          <!-- Brand row -->
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td>
                <table cellpadding="0" cellspacing="0">
                  <tr>
                    <td style="width:34px;height:34px;background:linear-gradient(135deg,#00f5ff,#7c3aed);border-radius:9px;text-align:center;line-height:34px;font-weight:800;font-size:14px;color:#000;">K</td>
                    <td style="padding-left:10px;font-size:14px;font-weight:700;color:#ffffff;letter-spacing:0.3px;">Karanam <span style="color:#00f5ff;">Sreekar</span></td>
                  </tr>
                </table>
              </td>
              <td align="right">
                <span style="font-size:10px;color:#00f5ff;border:1px solid rgba(0,245,255,0.3);border-radius:20px;padding:3px 10px;letter-spacing:1px;text-transform:uppercase;">Incoming</span>
              </td>
            </tr>
          </table>

          <!-- Title -->
          <p style="margin:18px 0 4px;font-size:20px;font-weight:700;color:#ffffff;letter-spacing:-0.3px;">📬 New Message Received</p>
          <p style="margin:0;font-size:13px;color:rgba(255,255,255,0.4);">Someone contacted you via your portfolio.</p>
        </td>
      </tr>
    </table>

    <!-- Sender info -->
    <table width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td style="padding:22px 32px 0;">

          <!-- Name -->
          <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:10px;">
            <tr>
              <td style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.07);border-radius:10px;padding:12px 16px;">
                <p style="margin:0 0 3px;font-size:10px;color:rgba(0,245,255,0.7);text-transform:uppercase;letter-spacing:1px;">👤 &nbsp;Name</p>
                <p style="margin:0;font-size:15px;font-weight:600;color:#ffffff;">${safe(name)}</p>
              </td>
            </tr>
          </table>

          <!-- Email -->
          <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:10px;">
            <tr>
              <td style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.07);border-radius:10px;padding:12px 16px;">
                <p style="margin:0 0 3px;font-size:10px;color:rgba(124,58,237,0.9);text-transform:uppercase;letter-spacing:1px;">📧 &nbsp;Email</p>
                <p style="margin:0;font-size:14px;font-weight:500;color:#a78bfa;">${safe(email)}</p>
              </td>
            </tr>
          </table>

          <!-- Message -->
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td style="background:rgba(0,245,255,0.03);border:1px solid rgba(0,245,255,0.12);border-left:3px solid #00f5ff;border-radius:10px;padding:14px 16px;">
                <p style="margin:0 0 6px;font-size:10px;color:rgba(0,245,255,0.7);text-transform:uppercase;letter-spacing:1px;">💬 &nbsp;Message</p>
                <p style="margin:0;font-size:14px;color:rgba(255,255,255,0.85);line-height:1.7;">${safe(message)}</p>
              </td>
            </tr>
          </table>

        </td>
      </tr>
    </table>

    <!-- Reply button -->
    <table width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td align="center" style="padding:24px 32px 28px;">
          <a href="mailto:${safe(email)}?subject=Re%3A%20Your%20message%20to%20Sreekar%20Karanam&body=Hi%20${encodeURIComponent(name)}%2C%0A%0A"
             style="display:inline-block;background:linear-gradient(135deg,#00f5ff,#7c3aed);color:#000000;font-weight:700;font-size:14px;text-decoration:none;padding:13px 36px;border-radius:50px;letter-spacing:0.3px;">
            ↩ &nbsp;Reply to ${safe(name)}
          </a>
        </td>
      </tr>
    </table>

    <!-- Bottom grid line -->
    <div style="height:1px;background:linear-gradient(90deg,transparent,rgba(124,58,237,0.4) 30%,rgba(0,245,255,0.4) 70%,transparent);"></div>

    <!-- Footer -->
    <table width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td style="padding:14px 32px;text-align:center;">
          <p style="margin:0;font-size:11px;color:rgba(255,255,255,0.2);">📅 ${timestamp} IST &nbsp;·&nbsp; Sreekar Portfolio</p>
        </td>
      </tr>
    </table>

  </td></tr>

  <!-- ── Bottom beam streaks (decorative) ── -->
  <tr><td style="padding-top:16px;">
    <table width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td style="width:1px;background:linear-gradient(to top,rgba(124,58,237,0.5),transparent);height:36px;"></td>
        <td style="width:20px;"></td>
        <td style="width:1px;background:linear-gradient(to top,rgba(0,245,255,0.3),transparent);height:24px;"></td>
        <td></td>
        <td style="width:1px;background:linear-gradient(to top,rgba(236,72,153,0.4),transparent);height:40px;"></td>
        <td style="width:14px;"></td>
        <td style="width:1px;background:linear-gradient(to top,rgba(0,245,255,0.6),transparent);height:28px;"></td>
        <td style="width:8px;"></td>
        <td style="width:1px;background:linear-gradient(to top,rgba(124,58,237,0.3),transparent);height:20px;"></td>
      </tr>
    </table>
  </td></tr>

</table>
</td></tr>
</table>
</body>
</html>`;
}

// ── Route Handler ─────────────────────────────────────────────────────────────
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    if (!name || !email || !message)
      return NextResponse.json({ error: "Name, email, and message are required" }, { status: 400 });

    if (name.length > 100)
      return NextResponse.json({ error: "Name too long" }, { status: 400 });

    if (message.length > 500)
      return NextResponse.json({ error: "Message too long (max 500 characters)" }, { status: 400 });

    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(email))
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 });

    await connectDB();
    const contact = await Contact.create({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      message: message.trim(),
    });

    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      try {
        const transporter = createTransporter();
        await transporter.sendMail({
          from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
          to: process.env.EMAIL_USER,
          replyTo: email,
          subject: `📬 New message from ${name}`,
          html: buildEmailHTML(name.trim(), email.trim(), message.trim()),
        });
      } catch (emailError) {
        console.error("Email notification failed:", emailError);
      }
    }

    return NextResponse.json(
      { success: true, message: "Message sent successfully!", id: contact._id },
      { status: 201 }
    );
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json({ error: "Failed to send message. Please try again." }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ message: "Contact API is running" }, { status: 200 });
}
