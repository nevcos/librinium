import { defineConfig } from "vite";
import macrosPlugin from "vite-plugin-babel-macros";
import rewriteAll from "vite-plugin-rewrite-all";
import react from "@vitejs/plugin-react";
import {resolve} from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    // Macros are required to debug styled-components properly
    // @see https://github.com/styled-components/babel-plugin-styled-components/issues/350
    // @see https://githubhot.com/repo/styled-components/babel-plugin-styled-components/issues/350?page=2
    macrosPlugin(),
    // Supports SPA rewrite even when it includes an extension like /gists/test.md
    // @see https://github.com/vitejs/vite/pull/2634#issuecomment-910197296
    rewriteAll(),
    // React support
    react()
  ]
});
