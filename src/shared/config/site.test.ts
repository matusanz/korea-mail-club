import { describe, expect, it } from "vitest";
import { safeEmail, safeUrl } from "./site";

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
});
