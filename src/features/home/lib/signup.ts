/**
 * Newsletter signup → MailerLite embedded-form endpoint (docs/PROJECT.md → Signup).
 *
 * The browser posts directly to MailerLite's public form URL, exactly like MailerLite's own
 * embed code. Only the public account/form IDs are used — never the API key. The subscriber
 * group and double opt-in are configured on that form inside MailerLite, so a successful
 * response means "confirmation email sent", not "subscribed".
 */

export type SignupInput = {
  email: string;
  name: string;
  country: string;
  consent: boolean;
  /** Honeypot: real people never fill it. */
  website: string;
};

export type FieldErrors = Partial<Record<"email" | "name" | "country" | "consent", string>>;

export type SignupResult =
  | { status: "pending-confirmation" }
  | { status: "invalid"; errors: FieldErrors }
  | { status: "error"; message: string };

export type MailerLiteConfig = { accountId: string; formId: string };

const EMAIL_RE = /^[^\s@]+@[^\s@.]+(\.[^\s@.]+)+$/;

export function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

export function validateSignup(input: SignupInput): FieldErrors {
  const errors: FieldErrors = {};
  const email = normalizeEmail(input.email);
  if (!email) errors.email = "Please enter your email address.";
  else if (email.length > 254 || !EMAIL_RE.test(email))
    errors.email = "That email doesn’t look quite right — could you check it?";
  if (input.name.trim().length > 80) errors.name = "Please keep your name under 80 characters.";
  if (input.country.trim().length > 80) errors.country = "Please keep the country under 80 characters.";
  if (!input.consent) errors.consent = "Please tick the box so I can send you emails.";
  return errors;
}

/** Only digits/letters in IDs, so a bad env value can never build an unexpected URL. */
export function readMailerLiteConfig(accountId: string | undefined, formId: string | undefined): MailerLiteConfig | null {
  const a = (accountId ?? "").trim();
  const f = (formId ?? "").trim();
  return /^[A-Za-z0-9]+$/.test(a) && /^[A-Za-z0-9]+$/.test(f) ? { accountId: a, formId: f } : null;
}

export function subscribeUrl(config: MailerLiteConfig): string {
  return `https://assets.mailerlite.com/jsonp/${config.accountId}/forms/${config.formId}/subscribe`;
}

export function buildPayload(input: SignupInput): FormData {
  const data = new FormData();
  data.set("fields[email]", normalizeEmail(input.email));
  if (input.name.trim()) data.set("fields[name]", input.name.trim());
  if (input.country.trim()) data.set("fields[country]", input.country.trim());
  data.set("ml-submit", "1");
  data.set("anticsrf", "true");
  return data;
}

type MailerLiteResponse = { success?: boolean; errors?: { fields?: Record<string, string[] | string> } };

export function interpretResponse(ok: boolean, body: MailerLiteResponse | null): SignupResult {
  if (ok && body?.success) return { status: "pending-confirmation" };
  const emailError = body?.errors?.fields?.email;
  if (emailError) {
    return { status: "invalid", errors: { email: "MailerLite couldn’t accept that email address. Could you check it?" } };
  }
  return { status: "error", message: "Something went wrong on the way. Please try again in a moment." };
}

export async function submitSignup(
  input: SignupInput,
  config: MailerLiteConfig | null,
  fetchImpl: typeof fetch = fetch,
): Promise<SignupResult> {
  const errors = validateSignup(input);
  if (Object.keys(errors).length) return { status: "invalid", errors };
  // Bots fill every field; pretend success so they move on, but send nothing.
  if (input.website.trim()) return { status: "pending-confirmation" };
  if (!config) {
    return { status: "error", message: "The mailing list isn’t connected yet. Please check back very soon." };
  }
  try {
    const res = await fetchImpl(subscribeUrl(config), { method: "POST", body: buildPayload(input) });
    const body = (await res.json().catch(() => null)) as MailerLiteResponse | null;
    return interpretResponse(res.ok, body);
  } catch {
    return { status: "error", message: "I couldn’t reach the mailing list. Please check your connection and try again." };
  }
}
