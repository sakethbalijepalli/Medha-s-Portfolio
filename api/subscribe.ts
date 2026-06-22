import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, name } = req.body as { email?: string; name?: string };

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: 'Invalid email' });
  }

  const API_KEY       = process.env.MAILCHIMP_API_KEY!;
  const LIST_ID       = process.env.MAILCHIMP_AUDIENCE_ID!;
  const SERVER_PREFIX = process.env.MAILCHIMP_SERVER_PREFIX!;

  const body: Record<string, unknown> = {
    email_address: email,
    status: 'subscribed',
  };

  if (name) {
    const [firstName, ...rest] = name.trim().split(' ');
    body.merge_fields = { FNAME: firstName, LNAME: rest.join(' ') };
  }

  try {
    const mcRes = await fetch(
      `https://${SERVER_PREFIX}.api.mailchimp.com/3.0/lists/${LIST_ID}/members`,
      {
        method: 'POST',
        headers: {
          Authorization: `Basic ${Buffer.from(`anystring:${API_KEY}`).toString('base64')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      }
    );

    const data = await mcRes.json() as Record<string, unknown>;

    // "Member Exists" is not an error — just return success
    if (!mcRes.ok && data.title !== 'Member Exists') {
      console.error('Mailchimp error:', data);
      return res.status(500).json({ error: 'Subscription failed' });
    }

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('Subscribe handler error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
