import { describe, expect, it } from "vitest";
import { gtmInitScript } from "./gtm";

describe("GTM init script", () => {
  it("starts GTM, then loads gtm.js for the container", () => {
    const win: { dataLayer?: unknown[] } = {};
    const appended: object[] = [];
    const document = { createElement: () => ({}), head: { appendChild: (el: object) => appended.push(el) } };
    const script = gtmInitScript("GTM-TEST123").replace(
      "window.dataLayer = window.dataLayer || [];",
      "window.dataLayer = window.dataLayer || []; var dataLayer = window.dataLayer;",
    );
    new Function("window", "document", script)(win, document);

    expect(Array.from(win.dataLayer?.[0] as ArrayLike<unknown>)).toEqual(["js", expect.any(Date)]);
    expect(appended).toEqual([{ async: true, src: "https://www.googletagmanager.com/gtm.js?id=GTM-TEST123" }]);
  });
});
