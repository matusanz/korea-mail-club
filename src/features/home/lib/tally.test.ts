import { describe, expect, it } from "vitest";
import { isTallySubmit, tallyEmbedUrl, tallyPublicUrl } from "./tally";

const submitted = JSON.stringify({ event: "Tally.FormSubmitted", payload: { formId: "abc123", id: "x" } });

describe("Tally embed", () => {
  it("builds the blended embed URL and the public fallback link", () => {
    expect(tallyEmbedUrl("abc123")).toBe(
      "https://tally.so/embed/abc123?hideTitle=1&transparentBackground=1&dynamicHeight=1&formEventsForwarding=1",
    );
    expect(tallyPublicUrl("abc123")).toBe("https://tally.so/r/abc123");
  });

  it("recognises only Tally's submit event for this form", () => {
    expect(isTallySubmit("https://tally.so", submitted, "abc123")).toBe(true);
    expect(isTallySubmit("https://tally.so", JSON.parse(submitted), "abc123")).toBe(true);
    expect(isTallySubmit("https://evil.example", submitted, "abc123")).toBe(false);
    expect(isTallySubmit("https://tally.so", submitted, "other1")).toBe(false);
    expect(isTallySubmit("https://tally.so", '{"event":"Tally.FormPageView"}', "abc123")).toBe(false);
    expect(isTallySubmit("https://tally.so", "Tally.FormSubmitted{broken", "abc123")).toBe(false);
  });
});
