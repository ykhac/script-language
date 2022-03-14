#! /usr/bin/env node
const fs = require("fs");
const path = require("path");

console.log("Processing....");

try {
  const configModel = require("./config")();

  const folderRootPath = process.cwd();

  // Write data to file json
  const content = {};

  // Set regex for get value
  const nameFunction = configModel.nameFunction;
  const regexValue = `${nameFunction}\\((.*|[^\v]*)\\)`;

  function getAllFile(_folderPath) {
    // Get all file in folder is running CLI
    const allFile = fs.readdirSync(_folderPath).map((fileName) => {
      return path.join(_folderPath, fileName);
    });

    // For loop
    allFile.forEach((pathFile) => {
      // Ignore file
      let isExclude = false;
      configModel.excludes.forEach((fileExclude) => {
        if (pathFile.indexOf(fileExclude) >= 0) isExclude = true;
      });

      if (isExclude) return;

      //Match folder path
      if (
        configModel.folderPath &&
        // All value in folderPath don't match with pathFile
        configModel.includes.every((value) => pathFile.indexOf(value) < 0)
      )
        return;

      if (pathFile.slice(pathFile.lastIndexOf("/"), -1).indexOf(".") < 0) {
        getAllFile(pathFile);
        return;
      }

      // Return in case is not correct
      if (typeof configModel.match !== "string") return;
      if (!Array.isArray(configModel.language)) return;

      const regex = new RegExp(configModel.match);

      if (!regex.test(pathFile)) return;

      // Read file
      const data = fs.readFileSync(path.resolve(pathFile), "utf8");

      // Get all text match
      const matches = data.match(new RegExp(regexValue, "g"));

      // If not match, will return
      if (!Array.isArray(matches)) return;

      matches.forEach((item) => {
        let text = item.slice(nameFunction.length + 2, item.indexOf(")") - 1);

        // Format data
        text = text.trim();
        text = text.replace(/[\n]+/g, " ");
        text = text.replace(/[\r]+/g, " ");
        text = text.replace(/^[\`]+/g, "");
        text = text.replace(/[\`]+$/g, "");
        text = text.replace(/^[\"]+/g, "");
        text = text.replace(/[\"]+$/g, "");
        text = text.replace(/^[\']+/g, "");
        text = text.replace(/[\']+$/g, "");
        text = text.replace(/\s{2,}/g, " ");

        console.log(text);
        content[text] = {};
        // Generate object text
        configModel.language.map((lang) => {
          content[text][lang.split("-")[0]] = text;
        });
      });
    });
  }

  getAllFile(folderRootPath);

  fs.writeFile(
    path.resolve(folderRootPath, configModel.pathJson),
    JSON.stringify(content, null, 4),
    "utf8",
    function (err) {
      if (err) throw err;
      console.log("complete");
    }
  );
} catch (error) {
  console.log("Error: ", error);
}
