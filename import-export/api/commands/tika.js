const execa = require("execa");
const path = require("path");
module.exports = tika;

async function tika(inputFile, format = "xml") {
  const command = "java";
  const options = [
    "-jar",
    path.join(__dirname, "tika-app-1.24.1.jar"),
    `--${format}`,
    inputFile,
  ];
  const { stdout } = await execa(command, options);

  return stdout;
}
