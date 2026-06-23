import type { VercelRequest, VercelResponse } from '@vercel/node';
import { isValidEmail } from '../lib/validation';

// Requests must originate from our own site. Blocks naive scripted abuse that
// POSTs the endpoint directly without a matching browser Origin/Referer.
function originAllowed(req: VercelRequest): boolean {
  const raw = (req.headers.origin || req.headers.referer || '') as string;
  if (!raw) return false;
  let host: string;
  try {
    host = new URL(raw).host;
  } catch {
    return false;
  }
  return (
    host === 'medhasrigiri.com' ||
    host === 'www.medhasrigiri.com' ||
    host.endsWith('.vercel.app') ||         // Vercel preview deployments
    host === 'localhost' || host.startsWith('localhost:') ||
    host === '127.0.0.1' || host.startsWith('127.0.0.1:')
  );
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!originAllowed(req)) {
    return res.status(403).json({ error: 'Forbidden' });
  }

  // req.body is undefined when the request has no body or a non-JSON
  // Content-Type; default to {} so destructuring can't throw.
  const { email, name, hp } = (req.body ?? {}) as { email?: string; name?: string; hp?: string };

  // Honeypot: a real user never fills this hidden field. Pretend success so a
  // bot that auto-filled it doesn't learn it was dropped.
  if (hp) {
    return res.status(200).json({ success: true });
  }

  if (!email || !isValidEmail(email)) {
    return res.status(400).json({ error: 'Invalid email' });
  }

  const API_KEY       = process.env.MAILCHIMP_API_KEY;
  const LIST_ID       = process.env.MAILCHIMP_AUDIENCE_ID;
  const SERVER_PREFIX = process.env.MAILCHIMP_SERVER_PREFIX;

  if (!API_KEY || !LIST_ID || !SERVER_PREFIX) {
    console.error('Mailchimp environment variables are not configured');
    return res.status(500).json({ error: 'Subscription temporarily unavailable' });
  }

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
