import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
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
    ],
    exclude: ["@storybook/*"],
  },
  build: {
    rollupOptions: {
      external: ["react", "react-dom", "i18next", "react-i18next"],
    },
  },
});
