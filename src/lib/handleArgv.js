module.exports = function () {
  const args = process.argv.slice(2);

  const listArg = [
    {
      key: "--outDir",
      configKey: "outDir",
    },
  ];

  const argv = {};

  listArg.forEach((arg) => {
    const idx = args.indexOf(arg.key);

    if (idx < 0) return;

    const val = args[idx + 1];

    args.splice(idx, 2);

    argv[arg.configKey] = val;
  });

  // includes folder
  if (args.length){
    argv.includes = [args[0]];
  }

  return argv;
};
