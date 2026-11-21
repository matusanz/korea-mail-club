"use client";

import Link from "next/link";
import { useId, useRef, useState } from "react";
import {
  normalizeEmail,
  readMailerLiteConfig,
  submitSignup,
  validateSignup,
  type FieldErrors,
  type SignupInput,
} from "../lib/signup";

const mailerLite = readMailerLiteConfig(
  process.env.NEXT_PUBLIC_MAILERLITE_ACCOUNT_ID,
  process.env.NEXT_PUBLIC_MAILERLITE_FORM_ID,
);

type State = "idle" | "submitting" | "sent" | "error";

const empty: SignupInput = { email: "", name: "", country: "", consent: false, website: "" };

export function SignupForm() {
  const id = useId();
  const [values, setValues] = useState<SignupInput>(empty);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [state, setState] = useState<State>("idle");
  const [message, setMessage] = useState("");
  const [sentTo, setSentTo] = useState("");
  const lastSent = useRef<string>("");
  const successRef = useRef<HTMLDivElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);

  function update<K extends keyof SignupInput>(key: K, value: SignupInput[K]) {
    setValues((v) => ({ ...v, [key]: value }));
    if (errors[key as keyof FieldErrors]) setErrors((e) => ({ ...e, [key]: undefined }));
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (state === "submitting") return;

    const found = validateSignup(values);
    if (Object.keys(found).length) {
      setErrors(found);
      setState("idle");
      if (found.email) emailRef.current?.focus();
      return;
    }
    // Same email twice in a row in this visit: don't send a second confirmation email.
    const email = normalizeEmail(values.email);
    if (email === lastSent.current) {
      setSentTo(email);
      setState("sent");
      return;
    }

    setState("submitting");
    setMessage("");
    const result = await submitSignup(values, mailerLite);
    if (result.status === "pending-confirmation") {
      lastSent.current = email;
      setSentTo(email);
      setValues(empty);
      setState("sent");
      requestAnimationFrame(() => successRef.current?.focus());
    } else if (result.status === "invalid") {
      setErrors(result.errors);
      setState("idle");
      emailRef.current?.focus();
    } else {
      setMessage(result.message);
      setState("error");
    }
  }

  if (state === "sent") {
    return (
      <div ref={successRef} tabIndex={-1} role="status" className="mx-auto max-w-md text-center outline-none">
        <p className="eyebrow mb-4">Almost there</p>
        <h3 className="text-3xl sm:text-4xl">One little step closer to Korea.</h3>
        <p className="mt-4 text-muted">
          Thanks for joining! Check your inbox{sentTo ? <> at <strong className="font-medium text-ink">{sentTo}</strong></> : null} to
          confirm your email, and we’ll stay in touch.
        </p>
        <p className="mt-3 text-sm text-muted">Can’t find it? Have a look in your spam or promotions folder.</p>
        <button type="button" onClick={() => setState("idle")} className="mt-6 text-sm text-muted underline underline-offset-4 hover:text-ink">
          Use a different email
        </button>
      </div>
    );
  }

  const describe = (field: keyof FieldErrors, extra?: string) =>
    [errors[field] ? `${id}-${field}-error` : null, extra].filter(Boolean).join(" ") || undefined;

  const inputClass = (field: keyof FieldErrors) =>
    `mt-1.5 block w-full rounded-md border bg-paper px-4 py-3 text-base text-ink placeholder:text-muted/70 transition-colors focus:border-ink focus:outline-none focus-visible:outline-none focus:ring-2 focus:ring-rose/50 ${
      errors[field] ? "border-terracotta-ink" : "border-line"
    }`;

  return (
    <form onSubmit={onSubmit} noValidate className="mx-auto w-full max-w-md text-left" aria-describedby={`${id}-note`}>
      <div className="space-y-5">
        <div>
          <label htmlFor={`${id}-email`} className="text-sm font-medium">
            Email address <span className="font-normal text-muted">(required)</span>
          </label>
          <input
            ref={emailRef}
            id={`${id}-email`}
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            autoCapitalize="none"
            spellCheck={false}
            required
            aria-required="true"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={describe("email")}
            value={values.email}
            onChange={(e) => update("email", e.target.value)}
            placeholder="you@example.com"
            className={inputClass("email")}
          />
          <FieldError id={`${id}-email-error`} message={errors.email} />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor={`${id}-name`} className="text-sm font-medium">
              First name <span className="font-normal text-muted">(optional)</span>
            </label>
            <input
              id={`${id}-name`}
              name="name"
              type="text"
              autoComplete="given-name"
              maxLength={80}
              aria-invalid={Boolean(errors.name)}
              aria-describedby={describe("name")}
              value={values.name}
              onChange={(e) => update("name", e.target.value)}
              className={inputClass("name")}
            />
            <FieldError id={`${id}-name-error`} message={errors.name} />
          </div>
          <div>
            <label htmlFor={`${id}-country`} className="text-sm font-medium">
              Country <span className="font-normal text-muted">(optional)</span>
            </label>
            <input
              id={`${id}-country`}
              name="country"
              type="text"
              autoComplete="country-name"
              maxLength={80}
              aria-invalid={Boolean(errors.country)}
              aria-describedby={describe("country")}
              value={values.country}
              onChange={(e) => update("country", e.target.value)}
              className={inputClass("country")}
            />
            <FieldError id={`${id}-country-error`} message={errors.country} />
          </div>
        </div>

        {/* Honeypot, hidden from people and assistive tech. */}
        <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
          <label htmlFor={`${id}-website`}>Website</label>
          <input
            id={`${id}-website`}
            name="website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={values.website}
            onChange={(e) => update("website", e.target.value)}
          />
        </div>

        <div>
          <div className="flex items-start gap-3">
            <input
              id={`${id}-consent`}
              name="consent"
              type="checkbox"
              checked={values.consent}
              onChange={(e) => update("consent", e.target.checked)}
              aria-invalid={Boolean(errors.consent)}
              aria-describedby={describe("consent")}
              className="mt-1 h-4 w-4 shrink-0 accent-ink"
            />
            <label htmlFor={`${id}-consent`} className="text-sm leading-relaxed text-muted">
              Yes, I’d like to receive Korea Mail Club emails — occasional notes, postcard news and new artwork. I can
              unsubscribe at any time. My details are handled by MailerLite as described in the{" "}
              <Link href="/privacy/" className="text-ink underline underline-offset-4">
                privacy notice
              </Link>
              .
            </label>
          </div>
          <FieldError id={`${id}-consent-error`} message={errors.consent} />
        </div>
      </div>

      <button type="submit" disabled={state === "submitting"} className="btn btn-primary mt-7 w-full" aria-live="polite">
        {state === "submitting" ? (
          <>
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-ivory/40 border-t-ivory" aria-hidden="true" />
            Sending…
          </>
        ) : (
          "Join the Club"
        )}
      </button>

      <div role="alert" className="min-h-0">
        {state === "error" && message ? (
          <p className="mt-4 rounded-md border border-rose/60 bg-rose-soft/40 px-4 py-3 text-sm text-ink">{message}</p>
        ) : null}
      </div>

      <p id={`${id}-note`} className="mt-5 text-center text-xs tracking-wide text-muted">
        Free to join. Occasional emails. Unsubscribe anytime.
      </p>
    </form>
  );
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-1.5 text-sm text-terracotta-ink">
      {message}
    </p>
  );
}
