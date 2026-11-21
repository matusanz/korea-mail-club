import { describe, expect, it } from "vitest";
import { safeEmail, safeTallyId, safeUrl } from "./site";

describe("config sanitizers", () => {
  it("accepts only http(s) URLs", () => {
    expect(safeUrl("https://instagram.com/x")).toBe("https://instagram.com/x");
    expect(safeUrl("javascript:alert(1)")).toBe("");
    expect(safeUrl("")).toBe("");
    expect(safeUrl(undefined)).toBe("");
  });
  it("accepts only plausible emails", () => {
    expect(safeEmail(" hello@example.com ")).toBe("hello@example.com");
    expect(safeEmail("not-an-email")).toBe("");
  });
  it("accepts only plain Tally form IDs", () => {
    expect(safeTallyId("4aKrAB")).toBe("4aKrAB");
    expect(safeTallyId("4aKrAB?x=1")).toBe("");
    expect(safeTallyId("")).toBe("");
  });
});
