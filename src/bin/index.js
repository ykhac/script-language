#! /usr/bin/env node
const fs = require("fs");
const path = require("path");

console.log("\x1b[93mProcessing....\x1b[0m\n");

try {
  const configModel = require("../lib/config")();

  const folderRootPath = process.cwd();

  // Write data to file json
  const content = {};

  // Set regex for get value
  const nameFunction = Array.isArray(configModel.nameFunction)
    ? `(${configModel.nameFunction.join("|")})`
    : configModel.nameFunction;

  const regexValue =
    `${nameFunction}\\(("|'|` + "`" + `)(.*|[^\v]*)("|'|` + "`" + `)\\)`;

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
      // All value in folderPath don't match with pathFile
      if (
        configModel.includes && !configModel.includes.every((value) => pathFile.match(value))
      ){
        return;
      }

      // Recursive
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
        const nameFunctionSelection = Array.isArray(configModel.nameFunction)
          ? configModel.nameFunction.find((name) => item.indexOf(name) >= 0)
          : configModel.nameFunction;

        let text = item.slice(
          nameFunctionSelection.length + 2,
          item.lastIndexOf(")") - 1
        );

        if (text.match(/[+]/g) || text.match(/^.*(\$\{).*(\}).*$/g)) {
          console.log(
            "\n\x1b[41mFrom file:",
            pathFile,
            "\x1b[0m\n     Text:",
            text,
            "\n     Error:",
            "We only support for param is the string."
          );
          return;
        }

        // Remove
        text = text.replace(/^[\`]+/g, "");
        text = text.replace(/[\`]+$/g, "");
        text = text.replace(/^[\"]+/g, "");
        text = text.replace(/[\"]+$/g, "");
        text = text.replace(/^[\']+/g, "");
        text = text.replace(/[\']+$/g, "");

        // Generate object text
        configModel.language.map((lang) => {
          if (!content[lang.split("-")[0]]) {
            content[lang.split("-")[0]] = {};
          }

          content[lang.split("-")[0]][text] = text;
        });
      });
    });
  }

  getAllFile(folderRootPath);

  if (!fs.existsSync(path.resolve(folderRootPath, configModel.outDir))) {
    console.log(
      "\n\x1b[97\x1b[41m Path: Folder",
      configModel.outDir,
      "is not existed !!\x1b[0m"
    );
    return;
  }

  // Write file
  for (const prop in content) {
    fs.writeFile(
      path.resolve(folderRootPath, configModel.outDir, prop + ".json"),
      JSON.stringify(content[prop], null, 4),
      "utf8",
      function (err) {
        if (err) throw err;
      }
    );
  }

  console.log("\n\x1b[32mCompleted !!\x1b[0m");
} catch (error) {
  console.log("Error: ", error);
}
