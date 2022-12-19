import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';

import typescript from "@rollup/plugin-typescript";
import { typescriptPaths } from "rollup-plugin-typescript-paths";
import dts from 'vite-plugin-dts'
import peerDepsExternal from 'rollup-plugin-peer-deps-external';

export default defineConfig({
  plugins: [solidPlugin()],
  server: {
    port: 3000,
  },
  
  build: {
    target: 'esnext',
    minify: false,
    sourcemap: true,
    lib: {
      entry: "./src/lib/createValtioYjsStore.ts",
      fileName: "main",
      formats: ["es", "cjs"],
    },
    rollupOptions: {
      external: ["solid-js", "solid-js/store", "yjs", "solid-valtio", "valtio-yjs", "valtio"],
      plugins: [
        /* typescriptPaths({
          preserveExtensions: true,
        }),
         */
        peerDepsExternal(),
        typescript({
          sourceMap: true,
          declaration: true,
          outDir: "dist",
        }),
        // dts({
        //   insertTypesEntry: true,
        //   rollupTypes: true,
        //   noEmitOnError: true
        // })
      ],
    }
  },
});
