#! /usr/bin/env node
const fs = require("fs");
const path = require("path");

const folderRootPath = process.cwd();

const defaultConfig = {
  excludes: ["node_modules"],
  match: "^.*.(js|ts|jsx|tsx)$",
  nameFunction: "_t",
  pathJson: "./language.json",
  includes: ["src"],
  language: ["vi-VI", "en-EN"],
};

module.exports = function () {
  const pathConfig = path.resolve(folderRootPath, "language.config.json");

  if (!fs.existsSync(pathConfig)) return defaultConfig;

  const data = JSON.parse(
    fs.readFileSync(
      path.resolve(folderRootPath, "./language.config.json"),
      "utf8"
    )
  );

  if (typeof data.includes === "string") {
    data.includes = [data.includes];
  }

  return { ...defaultConfig, ...data };
};
