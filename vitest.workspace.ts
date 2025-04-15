/// <reference types="@vitest/browser/providers/playwright" />

import { defineWorkspace } from "vitest/config";
import { storybookTest } from "@storybook/experimental-addon-test/vitest-plugin";
import path from "node:path";
import { fileURLToPath } from "node:url";

const dirname =
  typeof __dirname !== "undefined"
    ? __dirname
    : path.dirname(fileURLToPath(import.meta.url));

export default defineWorkspace([
  // Storybook tests configuration
  {
    extends: "./vite.config.ts",
    plugins: [
      storybookTest({
        // The location of your Storybook config, main.js|ts
        configDir: path.join(dirname, ".storybook"),
        // This should match your package.json script to run Storybook
        // The --ci flag will skip prompts and not open a browser
        storybookScript: "npm run storybook --ci",
      }),
    ],
    test: {
      name: "storybook",
      browser: {
        enabled: true,
        provider: "playwright",
        instances: [
          {
            browser: "chromium",
            context: {
              locale: "de-DE",
            },
          },
        ],
        headless: true,
      },
      setupFiles: ["./.storybook/vitest.setup.ts"],
      testTimeout: 30000,
      deps: {
        // Vite's dependency optimizer configuration for browser tests.
        optimizer: {
          web: {
            enabled: true,
            include: [
              "react",
              "react-dom",
              "react/jsx-runtime",
              "react/jsx-dev-runtime",
              "@radix-ui/react-accordion",
              "@radix-ui/react-checkbox",
              "@radix-ui/react-slot",
              "@radix-ui/react-collapsible",
              "@radix-ui/react-collection",
              "@radix-ui/react-compose-refs",
              "@radix-ui/react-context",
              "@radix-ui/react-direction",
              "@radix-ui/react-dialog",
              "@radix-ui/react-id",
              "@radix-ui/react-primitive",
              "@radix-ui/react-use-controllable-state",
            ],
          },
        },
      },
      // prebundle common js modules
      server: {
        deps: {
          inline: ["react", "react-dom", /@radix-ui\/.*/],
        },
      },
      // @ts-expect-error - TypeScript doesn't recognize the coverage property
      coverage: {
        provider: "v8",
        reporter: ["text", "html", "json"],
        reportsDirectory: "__test__/coverage/storybook",
        include: ["src/**/*.{ts,tsx}"],
        exclude: ["**/*.stories.{ts,tsx}", "**/*.d.ts", "src/main.tsx"],
      },
    },
  },
  // Unit tests configuration
  {
    extends: "./vite.config.ts",
    test: {
      name: "unit",
      environment: "node",
      include: ["**/*.test.{ts,tsx}"],
      exclude: ["**/node_modules/**", "**/dist/**", "**/*.stories.{ts,tsx}"],
      // @ts-expect-error - TypeScript doesn't recognize the coverage property
      coverage: {
        provider: "v8",
        reporter: ["text", "html", "json"],
        reportsDirectory: "__test__/coverage/unit",
        include: ["src/**/*.{ts,tsx}"],
        exclude: ["**/*.stories.{ts,tsx}", "**/*.d.ts", "src/main.tsx"],
      },
    },
  },
]);
