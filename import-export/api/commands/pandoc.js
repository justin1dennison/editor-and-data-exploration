const execa = require("execa");
const tempy = require("tempy");

module.exports = pandoc;

async function pandoc(input, to = "html") {
  const extension = `.${to}`;
  const source = await tempy.write(input, { extension: "html" });
  const target = tempy.file({ extension });
  const command = "pandoc";
  const options = ["-o", target, source];
  await execa(command, options);
  return target;
}
