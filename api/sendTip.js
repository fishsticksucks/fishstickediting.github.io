export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).send('Method not allowed');
  }

  const { type, code } = req.body;

  const webhook = process.env.DISCORD_WEBHOOK;

  if (!webhook) {
    return res.status(500).send('Missing webhook');
  }

  try {
    await fetch(webhook, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        content: `💚 New Tip!\nType: ${type}\nCode: ${code}`
      })
    });

    res.status(200).send('ok');
  } catch (err) {
    res.status(500).send('error');
  }
}
