import { NextRequest, NextResponse } from "next/server";

// ── Helpers ───────────────────────────────────────────────────────────────────

function getFlagEmoji(countryCode?: string): string {
  if (!countryCode) return "🌐";
  try {
    const codePoints = countryCode
      .toUpperCase()
      .split("")
      .map((char) => 127397 + char.charCodeAt(0));
    return String.fromCodePoint(...codePoints);
  } catch {
    return "🌐";
  }
}

function parseUserAgent(ua: string) {
  // ── OS Detection ────────────────────────────────────────────────────────────
  let os = "Unknown OS";
  if (ua.includes("Windows NT 10.0")) os = "Windows 10/11";
  else if (ua.includes("Windows NT 6.3")) os = "Windows 8.1";
  else if (ua.includes("Windows NT 6.1")) os = "Windows 7";
  else if (ua.includes("Windows")) os = "Windows";
  else if (ua.includes("iPhone OS 17")) os = "iOS 17";
  else if (ua.includes("iPhone OS 16")) os = "iOS 16";
  else if (ua.includes("iPhone")) os = "iOS";
  else if (ua.includes("iPad")) os = "iPadOS";
  else if (ua.includes("Mac OS X")) os = "macOS";
  else if (ua.includes("Android 14")) os = "Android 14";
  else if (ua.includes("Android 13")) os = "Android 13";
  else if (ua.includes("Android 12")) os = "Android 12";
  else if (ua.includes("Android")) os = "Android";
  else if (ua.includes("Linux")) os = "Linux";
  else if (ua.includes("CrOS")) os = "ChromeOS";

  // ── Browser Detection ───────────────────────────────────────────────────────
  let browser = "Unknown Browser";
  if (ua.includes("Edg/")) browser = "Microsoft Edge";
  else if (ua.includes("OPR/") || ua.includes("Opera")) browser = "Opera";
  else if (ua.includes("YaBrowser")) browser = "Yandex Browser";
  else if (ua.includes("SamsungBrowser")) browser = "Samsung Browser";
  else if (ua.includes("Firefox")) browser = "Firefox";
  else if (ua.includes("Chrome") && !ua.includes("Chromium")) browser = "Google Chrome";
  else if (ua.includes("Chromium")) browser = "Chromium";
  else if (ua.includes("Safari") && !ua.includes("Chrome")) browser = "Safari";

  // ── Device Type ─────────────────────────────────────────────────────────────
  const isMobile = /Mobi|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua);
  const deviceType = isMobile ? "📱 Mobile" : "💻 Desktop";

  // ── Device Name (best effort) ────────────────────────────────────────────────
  let deviceName = "Unknown Device";
  if (ua.includes("iPhone")) deviceName = "Apple iPhone";
  else if (ua.includes("iPad")) deviceName = "Apple iPad";
  else if (ua.match(/Samsung|SM-[A-Z]/i)) {
    const match = ua.match(/SM-[A-Z0-9]+/i);
    deviceName = match ? `Samsung (${match[0]})` : "Samsung Galaxy";
  } else if (ua.includes("Pixel")) {
    const match = ua.match(/Pixel [^;)]+/i);
    deviceName = match ? `Google ${match[0].trim()}` : "Google Pixel";
  } else if (ua.includes("OnePlus")) deviceName = "OnePlus";
  else if (ua.includes("Xiaomi") || ua.includes("MI ")) deviceName = "Xiaomi";
  else if (ua.includes("Redmi")) deviceName = "Redmi";
  else if (ua.includes("OPPO")) deviceName = "OPPO";
  else if (ua.includes("Macintosh")) deviceName = "Mac";
  else if (ua.includes("Windows")) deviceName = "Windows PC";
  else if (ua.includes("Linux")) deviceName = "Linux PC";

  return { os, browser, isMobile, deviceType, deviceName };
}

function formatDateTime(date: Date): string {
  // Format in IST (India Standard Time) for the owner
  return date.toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  }) + " IST";
}

// ── Route Handler ─────────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  const webhookUrl = process.env.DISCORD_WEBHOOK_URL;

  if (!webhookUrl) {
    return NextResponse.json({ message: "Webhook not configured" }, { status: 200 });
  }

  try {
    // ── Geo headers from Vercel ─────────────────────────────────────────────
    const city        = decodeURIComponent(req.headers.get("x-vercel-ip-city") || "Unknown City");
    const countryCode = req.headers.get("x-vercel-ip-country") || "";
    const region      = req.headers.get("x-vercel-ip-country-region") || "";
    const latitude    = req.headers.get("x-vercel-ip-latitude") || "";
    const longitude   = req.headers.get("x-vercel-ip-longitude") || "";
    const userAgentStr = req.headers.get("user-agent") || "Unknown Device";

    // ── Parse body for page URL ─────────────────────────────────────────────
    let page = "Unknown Page";
    try {
      const body = await req.json();
      if (body?.page) page = body.page;
    } catch { /* no body */ }

    // ── Build location string ───────────────────────────────────────────────
    const flag = getFlagEmoji(countryCode);
    const countryName = countryCode || "Unknown Country";
    const location = [city, region, countryName].filter(Boolean).join(", ");

    // ── Map link if we have lat/lng ─────────────────────────────────────────
    const mapLink = latitude && longitude
      ? `[📌 Open in Maps](https://www.google.com/maps?q=${latitude},${longitude})`
      : null;

    // ── Parse user agent ────────────────────────────────────────────────────
    const { os, browser, deviceType, deviceName } = parseUserAgent(userAgentStr);

    // ── Date & Time ─────────────────────────────────────────────────────────
    const now = new Date();
    const dateTimeStr = formatDateTime(now);

    // ── Discord Rich Embed ──────────────────────────────────────────────────
    const payload = {
      username: "Portfolio Tracker",
      avatar_url: "https://cdn-icons-png.flaticon.com/512/2620/2620807.png",
      embeds: [
        {
          title: "🚀  New Portfolio Visitor!",
          description: `Someone just landed on your portfolio. Here are the full details:`,
          color: 0x00f5ff, // Cyan
          fields: [
            {
              name: "📍  Location",
              value: `${flag} **${location}**${mapLink ? `\n${mapLink}` : ""}`,
              inline: true,
            },
            {
              name: "💻  Device Name",
              value: `**${deviceName}**`,
              inline: true,
            },
            {
              name: "\u200B", // Spacer
              value: "\u200B",
              inline: true,
            },
            {
              name: "🖥️  Operating System",
              value: `**${os}**`,
              inline: true,
            },
            {
              name: "🌐  Browser",
              value: `**${browser}**`,
              inline: true,
            },
            {
              name: "📱  Device Type",
              value: `**${deviceType}**`,
              inline: true,
            },
            {
              name: "🔗  Page Visited",
              value: `\`${page}\``,
              inline: false,
            },
            {
              name: "📅  Date & Time",
              value: `**${dateTimeStr}**`,
              inline: false,
            },
          ],
          footer: {
            text: "Sreekar Portfolio Tracker • Powered by Vercel + Discord",
          },
          timestamp: now.toISOString(),
        },
      ],
    };

    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`Discord API returned status ${response.status}`);
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Error sending Discord notification:", error);
    return NextResponse.json({ error: "Failed to send notification" }, { status: 500 });
  }
}
