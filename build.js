#!/usr/bin/env node

require("esbuild")
  .build({
    entryPoints: ["./src/bin/index.js", "./src/bin/config.js"],
    bundle: true,
    outdir: "bin",
    platform: "node",
    minify: true
  })
  .catch(() => process.exit(1));