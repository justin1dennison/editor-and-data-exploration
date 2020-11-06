const express = require("express");
const app = express();
const { json, urlencoded } = require("body-parser");
const fileUpload = require("express-fileupload");
const port = parseInt(process.env.PORT, 10) || 8000;
const tika = require("./commands/tika");
const pandoc = require("./commands/pandoc");

app.use(json());
app.use(urlencoded({ extended: true }));
app.use(fileUpload({ useTempFiles: true, tempFileDir: "/tmp/" }));

/**
 * Extraction endpoint
 * Request:
 *  file: document to extract text
 *  body:
 *    format: {text|html|xml}
 *
 * */
app.post("/documents", async (req, res) => {
  const { files, body } = req;
  const transformed = await tika(files.file.tempFilePath, body.format)
  res.status(200).json({ transformed });
});

/**
 * Rendering Endpoint
 * Request:
 * */
app.post("/render", async (req, res) => {
  const { body } = req;
  const { format, content } = body
  const document = await pandoc(content, format)
  res.status(200).sendFile(document)
});

app.listen(port, () => console.log(`Now listening on port: ${port}`));
