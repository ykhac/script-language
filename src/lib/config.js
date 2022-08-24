#! /usr/bin/env node
const fs = require("fs");
const path = require("path");

const folderRootPath = process.cwd();

const defaultConfig = {
  excludes: ["node_modules"],
  match: "^.*.(js|ts|jsx|tsx)$",
  nameFunction: "_t",
  outDir: "./language",
  includes: ["src"],
  language: ["vi-VI", "en-EN"],
};

module.exports = function () {
  const pathConfig = path.resolve(folderRootPath, "language.config.json");
  const argv = require("./handleArgv")();

  if (!fs.existsSync(pathConfig)) return defaultConfig;

  const config = JSON.parse(
    fs.readFileSync(
      path.resolve(folderRootPath, "./language.config.json"),
      "utf8"
    )
  );

  if (typeof config.includes === "string") {
    config.includes = [config.includes];
  }

  return { ...defaultConfig, ...config, ...argv };
};
