import {defineConfig} from "vite";
import react from "@vitejs/plugin-react";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import svgrPlugin from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/rest": "http://localhost:8099",
      "/statics": "http://localhost:8099"
    }
  },
  plugins: [svgrPlugin(), react()]
});
