import * as esbuild from "esbuild";
import { exit } from "node:process";

esbuild
  .build({
    entryPoints: ["src/index.ts"],
    bundle: true,
    outdir: "dist",
    minify: false,
    format: "esm",
    platform: "node",
    target: "node24",
    // Fix for https://github.com/evanw/esbuild/pull/2067
    banner: {
      js: "import { createRequire } from 'module'; const require = createRequire(import.meta.url);",
    },
  })
  .catch(() => exit(1));
