import { describe, expect, it, vi } from "vitest";
import { buildPayload, readMailerLiteConfig, submitSignup, subscribeUrl, validateSignup, type SignupInput } from "./signup";

const base: SignupInput = { email: "Mina@Example.com ", name: " Mina ", country: "Canada", consent: true, website: "" };
const config = { accountId: "123456", formId: "abc789" };

describe("validateSignup", () => {
  it("accepts a normal signup", () => expect(validateSignup(base)).toEqual({}));
  it("requires a valid email and consent", () => {
    expect(validateSignup({ ...base, email: "" }).email).toBeTruthy();
    expect(validateSignup({ ...base, email: "mina@example" }).email).toBeTruthy();
    expect(validateSignup({ ...base, email: "mi na@example.com" }).email).toBeTruthy();
    expect(validateSignup({ ...base, consent: false }).consent).toBeTruthy();
  });
  it("treats name and country as optional", () => expect(validateSignup({ ...base, name: "", country: "" })).toEqual({}));
});

describe("MailerLite config and payload", () => {
  it("rejects missing or unsafe IDs", () => {
    expect(readMailerLiteConfig("", "1")).toBeNull();
    expect(readMailerLiteConfig("12/../x", "1")).toBeNull();
    expect(readMailerLiteConfig(" 123456 ", "abc789")).toEqual(config);
  });
  it("posts to the public form endpoint with normalized fields", () => {
    expect(subscribeUrl(config)).toBe("https://assets.mailerlite.com/jsonp/123456/forms/abc789/subscribe");
    const data = buildPayload(base);
    expect(data.get("fields[email]")).toBe("mina@example.com");
    expect(data.get("fields[name]")).toBe("Mina");
    expect(data.get("fields[country]")).toBe("Canada");
    expect(buildPayload({ ...base, name: "", country: "" }).has("fields[name]")).toBe(false);
  });
});

describe("submitSignup", () => {
  const ok = (body: unknown, status = 200) =>
    vi.fn().mockResolvedValue(new Response(JSON.stringify(body), { status })) as unknown as typeof fetch;

  it("reports pending confirmation (double opt-in), never 'subscribed'", async () => {
    expect(await submitSignup(base, config, ok({ success: true }))).toEqual({ status: "pending-confirmation" });
  });
  it("does not call MailerLite when invalid, for bots, or when not configured", async () => {
    const f = ok({ success: true });
    expect((await submitSignup({ ...base, consent: false }, config, f)).status).toBe("invalid");
    expect((await submitSignup({ ...base, website: "spam" }, config, f)).status).toBe("pending-confirmation");
    expect((await submitSignup(base, null, f)).status).toBe("error");
    expect(f).not.toHaveBeenCalled();
  });
  it("maps MailerLite email errors and network failures", async () => {
    const bad = ok({ success: false, errors: { fields: { email: ["invalid"] } } }, 422);
    expect((await submitSignup(base, config, bad)).status).toBe("invalid");
    const down = vi.fn().mockRejectedValue(new Error("offline")) as unknown as typeof fetch;
    expect((await submitSignup(base, config, down)).status).toBe("error");
  });
});
