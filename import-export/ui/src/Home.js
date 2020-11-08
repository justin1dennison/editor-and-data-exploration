import { useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Import from "./Import";
import Export from "./Export";

function Home(props) {
  const [content, setContent] = useState("");
  const ready = (editor) => {};
  const change = async (event, editor) => {
    const data = editor.getData();
    setContent(data);
  };
  const blur = (event, editor) => {};
  const focus = (event, editor) => {};
  return (
    <>
      <CKEditor
        editor={ClassicEditor}
        data={content}
        config={{
          toolbar: [
            "selectAll",
            "undo",
            "redo",
            "bold",
            "italic",
            "blockQuote",
            "ckfinder",
            "imageTextAlternative",
            "imageUpload",
            "heading",
            "imageStyle:full",
            "imageStyle:side",
            "indent",
            "outdent",
            "link",
            "numberedList",
            "bulletedList",
            "mediaEmbed",
            "insertTable",
            "tableColumn",
            "tableRow",
            "mergeTableCells",
          ],
        }}
        onReady={ready}
        onChange={change}
        onBlur={blur}
        onFocus={focus}
      />
      <Import onImport={setContent} />
      <Export content={content} />
      <pre>{content}</pre>
    </>
  );
}

export default Home;
