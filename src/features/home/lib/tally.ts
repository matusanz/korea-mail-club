/**
 * Tally embed helpers (docs/forms/README.md). The form itself, its fields and the Google Sheets
 * connection live in Tally; the site only embeds it and reacts to the submit event.
 */

/** Embed URL: no Tally title (the page has its own), transparent background, auto height, events on. */
export function tallyEmbedUrl(formId: string): string {
  const params = new URLSearchParams({
    hideTitle: "1",
    transparentBackground: "1",
    dynamicHeight: "1",
    formEventsForwarding: "1",
  });
  return `https://tally.so/embed/${formId}?${params}`;
}

export function tallyPublicUrl(formId: string): string {
  return `https://tally.so/r/${formId}`;
}

/**
 * True when a `message` event is Tally's "form submitted" event for this form.
 * Tally posts JSON strings like {"event":"Tally.FormSubmitted","payload":{"formId":"…",…}}.
 */
export function isTallySubmit(origin: string, data: unknown, formId: string): boolean {
  if (origin !== "https://tally.so") return false;
  let message: unknown = data;
  if (typeof data === "string") {
    if (!data.includes("Tally.FormSubmitted")) return false;
    try {
      message = JSON.parse(data);
    } catch {
      return false;
    }
  }
  if (!message || typeof message !== "object") return false;
  const { event, payload } = message as { event?: unknown; payload?: { formId?: unknown } };
  return event === "Tally.FormSubmitted" && (payload?.formId === undefined || payload.formId === formId);
}
