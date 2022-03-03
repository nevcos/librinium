import {defineConfig} from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react()
  ],
  optimizeDeps: {
    exclude: [
      "react",
      "react-dom",
      "styled-components",
      "@nevcos/react-plantuml-ide-list",
      "@nevcos/react-plantuml-ide-editor",
      "@nevcos/react-plantuml-ide-preview"
    ]
  }
});
