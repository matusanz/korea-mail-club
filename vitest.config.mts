import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

export default defineConfig({
  // Must match the "@/*" path alias in tsconfig.json.
  resolve: { alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) } },
  // Unit tests cover pure logic (form validation, MailerLite payload, config); no DOM is needed.
  test: { environment: "node", include: ["src/**/*.test.ts"] },
});
