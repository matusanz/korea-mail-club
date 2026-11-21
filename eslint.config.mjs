import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import boundaries from "eslint-plugin-boundaries";

/**
 * Feature-based architecture (docs/PROJECT.md, "Where things live"):
 *   app (🔴) → features (🟢) → shared (🔵)   — one-way only, no feature → feature imports.
 */
const architecture = {
  files: ["src/**/*.{ts,tsx}"],
  plugins: { boundaries },
  settings: {
    "import/resolver": { typescript: { alwaysTryTypes: true } },
    "boundaries/elements": [
      { type: "app", pattern: "src/app" },
      { type: "feature", pattern: "src/features/*", capture: ["featureName"] },
      { type: "shared", pattern: "src/shared" },
    ],
  },
  rules: {
    "boundaries/no-unknown-files": "error",
    "boundaries/dependencies": [
      "error",
      {
        default: "disallow",
        policies: [
          { from: { element: { type: "shared" } }, allow: { to: { element: { type: "shared" } } } },
          {
            from: { element: { type: "feature" } },
            allow: [
              { to: { element: { type: "shared" } } },
              { to: { element: { type: "feature", captured: { featureName: "{{ from.element.captured.featureName }}" } } } },
            ],
          },
          { from: { element: { type: "app" } }, allow: { to: { element: { types: ["app", "feature", "shared"] } } } },
        ],
      },
    ],
  },
};

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  architecture,
  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts"]),
]);

export default eslintConfig;
