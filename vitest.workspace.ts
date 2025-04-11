/// <reference types="@vitest/browser/providers/playwright" />

import { coverageConfigDefaults, defineWorkspace } from "vitest/config";
import { storybookTest } from "@storybook/experimental-addon-test/vitest-plugin";
import path from "node:path";
import { fileURLToPath } from "node:url";

const dirname =
  typeof __dirname !== "undefined"
    ? __dirname
    : path.dirname(fileURLToPath(import.meta.url));

// Common configuration for all test projects
const commonConfig = {
  setupFiles: ["./.storybook/vitest.setup.ts"],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  /* @ts-ignore*/
  coverage: {
    provider: "v8",
    exclude: [
      ...coverageConfigDefaults.exclude,
      "postcss.config.mjs",
      "**/.storybook/**",
      "**/*.stories.*",
      "**/storybook-static/**",
    ],
    reporters: ["text", "html", "clover", "json"],
  },
};

export default defineWorkspace([
  // Storybook tests configuration
  {
    plugins: [
      storybookTest({
        // The location of your Storybook config, main.js|ts
        configDir: path.join(dirname, ".storybook"),
        // This should match your package.json script to run Storybook
        // The --ci flag will skip prompts and not open a browser
        storybookScript: "npm run storybook --ci",
      }),
    ],
    resolve: commonConfig.resolve,
    test: {
      name: "storybook",
      browser: {
        enabled: true,
        provider: "playwright",
        instances: [
          {
            browser: "chromium",
          },
        ],
        headless: true,
      },
      setupFiles: commonConfig.setupFiles,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      /* @ts-ignore*/
      coverage: {
        ...commonConfig.coverage,
        reportsDirectory: "__tests__/coverage",
        outputFile: {
          junit: "__tests__/reports/junit-report.xml",
        },
      },
    },
  },
]);
