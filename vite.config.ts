import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    dts({
      insertTypesEntry: true,
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      // Force resolve React to specific paths
      react: path.resolve(__dirname, "./node_modules/react"),
      "react-dom": path.resolve(__dirname, "./node_modules/react-dom"),
    },
  },
  optimizeDeps: {
    include: [
      "react",
      "react-dom",
      "react-dom/client",
      "react/jsx-dev-runtime",
      "@radix-ui/react-accordion",
      "@radix-ui/react-alert-dialog",
      "@radix-ui/react-checkbox",
      "@radix-ui/react-slot",
      "@radix-ui/primitive",
      "@radix-ui/react-collapsible",
      "@radix-ui/react-collection",
      "@radix-ui/react-compose-refs",
      "@radix-ui/react-context",
      "@radix-ui/react-direction",
      "@radix-ui/react-dialog",
      "@radix-ui/react-id",
      "@radix-ui/react-primitive",
      "@radix-ui/react-use-controllable-state",
      "@radix-ui/react-toggle",
      "@radix-ui/react-toggle-group",
      "@radix-ui/react-label",
      "@radix-ui/react-switch",
      "@radix-ui/react-select",
      "@radix-ui/react-separator",
      "@radix-ui/react-avatar",
      "@radix-ui/react-dropdown-menu",
      "@radix-ui/react-tooltip",
      "@radix-ui/react-aspect-ratio",
      "lucide-react",
      "date-fns",
      "react-day-picker"
    ],
    exclude: [
      "@storybook/*",
      "storybook/*",
      "storybook/internal/*",
      "@mdx-js/react",
      "@storybook/addon-*",
      "@storybook/blocks",
      "@storybook/theming",
      "@storybook/test"
    ],
    esbuildOptions: {
      target: 'esnext',
      supported: {
        'top-level-await': true
      }
    }
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      name: "A11yShadcnUI",
      formats: ["es", "umd"],
      fileName: (format) => `index.${format === "es" ? "mjs" : "js"}`,
    },
    rollupOptions: {
      external: ["react", "react-dom", "i18next", "react-i18next"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          i18next: "i18next",
          "react-i18next": "reactI18next",
        },
      },
    },
    sourcemap: true,
    emptyOutDir: true,
  },
});
