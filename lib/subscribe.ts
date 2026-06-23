// Single client-side entry point for newsletter signups so the three forms
// (Contact main opt-in, Contact footer, Upcoming) share one request shape.
// `hp` is the honeypot field — it must stay empty for real users.
export interface SubscribeInput {
  email: string;
  name?: string;
  hp?: string;
}

export async function subscribe(input: SubscribeInput): Promise<boolean> {
  try {
    const res = await fetch('/api/subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(input),
    });
    return res.ok;
  } catch {
    return false;
  }
}
