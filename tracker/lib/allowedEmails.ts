// The tracker's Supabase data is already row-level-secured per auth.uid(), so a
// stranger signing in with their own Google account could never see Medha's
// opportunities — but this app is for her use only, so we gate sign-in itself.
const ALLOWED_EMAILS = new Set(["m3dh5.dance@gmail.com"]);

export function isAllowedEmail(email: string | null | undefined): boolean {
  return Boolean(email) && ALLOWED_EMAILS.has(email!.toLowerCase());
}
