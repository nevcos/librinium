import {defineConfig, ViteDevServer} from "vite";
import react from "@vitejs/plugin-react";
import rewriteAll from "vite-plugin-rewrite-all";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // Supports SPA rewrite even when it includes an extension like /gists/test.md
    rewriteAll()
  ]
});
