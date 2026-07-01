import { NextRequest, NextResponse } from "next/server";

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

export async function POST(req: NextRequest) {
  const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
  
  // If webhook is not configured, exit silently
  if (!webhookUrl) {
    return NextResponse.json({ message: "Webhook not configured" }, { status: 200 });
  }

  try {
    // Extract geo-location headers provided by Vercel
    const city = req.headers.get("x-vercel-ip-city") || "Unknown City";
    const countryCode = req.headers.get("x-vercel-ip-country") || "";
    const region = req.headers.get("x-vercel-ip-country-region") || "";
    const userAgentStr = req.headers.get("user-agent") || "Unknown Device";

    const flag = getFlagEmoji(countryCode);
    const country = countryCode ? `${countryCode} ${flag}` : "Unknown Country";
    const locationString = region ? `${city}, ${region}, ${country}` : `${city}, ${country}`;

    // Basic User Agent parser for clean display
    let os = "Unknown OS";
    let browser = "Unknown Browser";
    
    if (userAgentStr.includes("Windows")) os = "Windows 💻";
    else if (userAgentStr.includes("Macintosh")) os = "macOS 🖥️";
    else if (userAgentStr.includes("iPhone")) os = "iPhone 📱";
    else if (userAgentStr.includes("Android")) os = "Android 📱";
    else if (userAgentStr.includes("Linux")) os = "Linux 🐧";

    if (userAgentStr.includes("Firefox")) browser = "Firefox 🦊";
    else if (userAgentStr.includes("Chrome")) browser = "Chrome 🌐";
    else if (userAgentStr.includes("Safari") && !userAgentStr.includes("Chrome")) browser = "Safari 🧭";
    else if (userAgentStr.includes("Edge")) browser = "Edge 🌀";

    // Discord Rich Embed payload
    const payload = {
      embeds: [
        {
          title: "🚀 New Portfolio Visitor!",
          color: 5814783, // Cyan/Purple color theme (#5865F2 - Discord blurple)
          fields: [
            {
              name: "📍 Location",
              value: locationString,
              inline: true,
            },
            {
              name: "💻 Device & Browser",
              value: `${os} / ${browser}`,
              inline: true,
            },
          ],
          timestamp: new Date().toISOString(),
          footer: {
            text: "Premium Portfolio Tracker",
          },
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
