import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import eslintPlugin from "vite-plugin-eslint";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    eslintPlugin({
      failOnWarning: false,
      failOnError: false,
    }),
  ],
});
