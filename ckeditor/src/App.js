import { useState, useRef } from "react"
import { CKEditor } from "@ckeditor/ckeditor5-react"

// NOTE: Use the editor from source (not a build)!
import ClassicEditor from "@ckeditor/ckeditor5-editor-classic/src/classiceditor"
import Essentials from "@ckeditor/ckeditor5-essentials/src/essentials"
import Bold from "@ckeditor/ckeditor5-basic-styles/src/bold"
import Italic from "@ckeditor/ckeditor5-basic-styles/src/italic"
import Paragraph from "@ckeditor/ckeditor5-paragraph/src/paragraph"

import Liquid from "./components/Liquid"

const editorConfiguration = {
  plugins: [Essentials, Bold, Italic, Paragraph],
  toolbar: ["bold", "italic"],
}

export default function App() {
  const [color, setColor] = useState("")
  const editor = useRef()
  const onReady = (instance) => {
    editor.current = instance
  }
  const onChange = (event) => {
    const data = editor.current.getData()
  }
  return (
    <div className="App">
      <h2>Using CKEditor 5 from source in React</h2>
      <CKEditor
        editor={ClassicEditor}
        config={editorConfiguration}
        data="<p>Hello from CKEditor 5!</p>"
        onReady={onReady}
        onChange={onChange}
      />
      <input
        type="text"
        value={color}
        onChange={(e) => setColor(e.target.value)}
      />
      <Liquid env={{ color }}>{"{{ color }}"}</Liquid>
    </div>
  )
}
