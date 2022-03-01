import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import federation from "@originjs/vite-plugin-federation";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      plugins: [
        federation({
          name: 'react-plantuml-ide',
          filename: 'react-plantuml-ide.js',
          exposes: {
            './Button': './src/ui/App.tsx',
          },
          // remotes:{
          //   foo: 'remote_foo'
          // },
          // shared: ['vue']
        })
      ],
    }
  }
})
