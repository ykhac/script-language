#!/usr/bin/env node

require("esbuild")
  .build({
    entryPoints: ["./src/bin/index.js"],
    bundle: true,
    outdir: "bin",
    platform: "node",
    watch: {
      onRebuild(error) {
        if (error) console.error('watch build failed:', error)
        else console.log('watch build succeeded')
      },
    },
  }).then(() => {
    console.log('Watching...')
  })