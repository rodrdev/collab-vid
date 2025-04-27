import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import ViteRewriteAll from "vite-plugin-rewrite-all";
// https://vite.dev/config/
export default defineConfig({
  base: "/",
  plugins: [react(), ViteRewriteAll()],
});
