export default async function handler(req, res) {
  // ✅ ALWAYS set CORS headers first
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // ✅ Handle preflight request (THIS FIXES YOUR ERROR)
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  // ❌ Block anything that's not POST
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { type, code } = req.body;

    if (!type || !code) {
      return res.status(400).json({ error: "Missing fields" });
    }

    await fetch(process.env.DISCORD_WEBHOOK, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        content: `💰 New Tip!\nType: ${type}\nCode: ${code}`
      })
    });

    return res.status(200).json({ success: true });

  } catch (err) {
    console.error("Server error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}
