export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).send('Method not allowed');
  }

  const { type, code } = req.body;

  if (!type || !code) {
    return res.status(400).send('Missing data');
  }

  const webhook = process.env.DISCORD_WEBHOOK;

  await fetch(webhook, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      content: `💚 New Tip!\nType: ${type}\nCode: ${code}`
    })
  });

  res.status(200).json({ success: true });
}
