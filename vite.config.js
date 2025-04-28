import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import ViteRewriteAll from "vite-plugin-rewrite-all";
import { viteStaticCopy } from "vite-plugin-static-copy";

export default defineConfig({
  base: "/",
  plugins: [
    react(),
    ViteRewriteAll(),
    viteStaticCopy({
      targets: [
        {
          src: "public/_redirects",
          dest: ".",
        },
      ],
    }),
  ],
});
