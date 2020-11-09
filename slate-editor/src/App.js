import { createEditor, Node } from "slate"
import { Slate, Editable, withReact } from "slate-react"
import { useState, useMemo, useEffect } from "react"
import Liquid from "./components/Liquid"

function serialize(nodes) {}
function deserialize(el) {
  console.log({ el })
}

function App() {
  const [color, setColor] = useState("")
  const [tmpl, setTmpl] = useState("")
  const editor = useMemo(() => withReact(createEditor()), [])
  const [state, setState] = useState([
    {
      type: "paragraph",
      children: [{ text: "A line of text in a paragraph." }],
    },
  ])
  useEffect(() => {
    fetch("/template.md")
      .then((r) => r.text())
      .then((t) => setTmpl(t))
      .catch(() => setTmpl("## Sample"))
  }, [])
  return (
    <div>
      <section className="fl w-100 pa2 bb mb4">
        <h2>Editor</h2>
        <Slate
          editor={editor}
          value={state}
          onChange={(value) => setState(value)}
        >
          <Editable />
        </Slate>
      </section>

      <section className="fl w-50 pa2 mb3">
        <h2>State Editor</h2>
        <div className="measure">
          <label htmlFor="name" className="f6 b db mb2">
            Color
          </label>
          <input
            type="text"
            id="color"
            className="input-reset ba b--black-20 pa2 mb2 db w-100"
            value={color}
            onChange={(e) => setColor(e.target.value)}
          />
          <small id="name-desc" className="f6 black-60 db mb2">
            Helper text for the form control.
          </small>
        </div>
      </section>
      <section className="mt2 fl w-50 pa2 bg-light-gray">
        <h2>Document</h2>
        <pre>{tmpl}</pre>
      </section>
    </div>
  )
}

export default App
