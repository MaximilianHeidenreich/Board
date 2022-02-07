import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import path from "path";

const rendererPath = path.resolve(__dirname, "src/renderer");
const outDirRenderer = path.resolve(__dirname, "app/renderer");

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte({ configFile: "./../../svelte.config.js" })],
  base: "./",
  root: rendererPath,
  build: {
    outDir: outDirRenderer,
    emptyOutDir: true,
  },
  resolve: {
    alias: [
      {
        find: "@renderer",
        replacement: rendererPath,
      },
      {
        find: "@common",
        replacement: path.resolve(__dirname, "src/common"),
      },
      {
        find: "@lib",
        replacement: path.resolve(rendererPath, "lib"),
      },
      {
        find: "@components",
        replacement: path.resolve(rendererPath, "lib/components"),
      },
      {
        find: "@pages",
        replacement: path.resolve(rendererPath, "lib/pages"),
      },
      {
        find: "@store",
        replacement: path.resolve(rendererPath, "lib/store"),
      },
      {
        find: "@interfaces",
        replacement: path.resolve(rendererPath, "lib/interfaces"),
      },
      {
        find: "@models",
        replacement: path.resolve(rendererPath, "lib/models"),
      },
      {
        find: "@assets",
        replacement: path.resolve(rendererPath, "assets"),
      },
    ],
    extensions: [".js", ".ts", "json", ".svelte"],
  },
});
