/**
 * Tally embed helpers (docs/forms/README.md). The form itself, its fields and the Google Sheets
 * connection live in Tally; the site only embeds it and reacts to its events.
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

type TallyMessage = { event: string; payload: { formId?: unknown; page?: unknown } };

/**
 * Parses a `message` event from the Tally iframe for this form, or returns null.
 * Tally posts JSON strings like {"event":"Tally.FormSubmitted","payload":{"formId":"…",…}}.
 */
export function readTallyMessage(origin: string, data: unknown, formId: string): TallyMessage | null {
  if (origin !== "https://tally.so") return null;
  let message: unknown = data;
  if (typeof data === "string") {
    if (!data.includes("Tally.")) return null;
    try {
      message = JSON.parse(data);
    } catch {
      return null;
    }
  }
  if (!message || typeof message !== "object") return null;
  const { event, payload } = message as { event?: unknown; payload?: unknown };
  if (typeof event !== "string" || !event.startsWith("Tally.")) return null;
  const p = (payload && typeof payload === "object" ? payload : {}) as TallyMessage["payload"];
  if (p.formId !== undefined && p.formId !== formId) return null;
  return { event, payload: p };
}

export function isTallySubmit(origin: string, data: unknown, formId: string): boolean {
  return readTallyMessage(origin, data, formId)?.event === "Tally.FormSubmitted";
}

/** True when the visitor moved to another page of a multi-page form (page 2 onwards, or back). */
export function isTallyPageChange(origin: string, data: unknown, formId: string): boolean {
  const m = readTallyMessage(origin, data, formId);
  return m?.event === "Tally.FormPageView" && typeof m.payload.page === "number" && m.payload.page > 1;
}
