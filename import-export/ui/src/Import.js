import { useState } from 'react'
import http from "axios";

function Import({ onImport }) {
  const [file, selectFile] = useState(null);
  const handleImport = (e) => {
    e.preventDefault();
    if (!file) return;
    const data = new FormData();
    data.append("file", file);
    data.append("format", "html");
    http
      .post("/documents", data)
      .then(({ data }) => onImport(data.transformed));
  };
  return (
    <form onSubmit={handleImport}>
      <h3>Import Document</h3>
      <input
        type="file"
        name="form"
        id="form"
        onChange={(e) => selectFile(e.target.files[0])}
      />
      <button type="submit">Import</button>
    </form>
  );
}


export default Import