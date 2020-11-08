import { useState } from 'react'
import http from 'axios'
import { saveAs } from "file-saver";

function Export({ content }) {
  const [format, setFormat] = useState("pdf");
  const handleExport = (e) => {
    e.preventDefault();
    http
      .post("/render", { format, content }, { responseType: "blob" })
      .then(({ data: file }) => saveAs(file));
  };
  return (
    <form onSubmit={handleExport}>
      <h3>Export Document</h3>
      <select
        name="format"
        id="format"
        defaultValue={format}
        onChange={(e) => setFormat(e.target.value)}
      >
        <option value="pdf">pdf</option>
        <option value="html">HTML</option>
        <option value="docx">docx</option>
      </select>
      <button type="submit">Export</button>
    </form>
  );
}

export default Export