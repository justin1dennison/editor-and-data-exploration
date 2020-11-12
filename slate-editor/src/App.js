import { createEditor, Node, Text } from "slate"
import { Slate, Editable, withReact, useEditor } from "slate-react"
import { useMemo, useCallback } from "react"
import { withHistory } from "slate-history"
import dedent from "ts-dedent"

import Liquid from "./components/Liquid"
import Markdown from './components/AccordMarkdown'
import { useStore } from "./store"

function App() {
  const {
    color,
    setColor,
    author,
    setAuthor,
    title,
    setTitle,
    content,
    setContent,
  } = useStore()
  const editor = useMemo(() => withHistory(withReact(createEditor())), [])
  function renderer(props) {
    const { element, children, attributes } = props
    switch (element.type) {
      case "liquid":
        const { text } = Node.get(element, [0])
        return (
          <Liquid {...props} env={{ color, title, author }}>
            {text}
          </Liquid>
        )
      default:
        return <p {...attributes}>{children}</p>
    }
  }

  const renderElement = useCallback(renderer, [color, author, title])
  return (
    <div>
      <section className="fl w-100 pa2 bb mb4">
        <h2>Editor</h2>
        <Slate
          editor={editor}
          value={content}
          onChange={(value) => setContent(value)}
        >
          <Editable renderElement={renderElement} />
        </Slate>
      </section>

      <section className="fl w-50 pa2 mb3">
        <h2>State Editor</h2>
        <div className="measure">
          <label htmlFor="color" className="f6 b db mb2">
            Color
          </label>
          <input
            type="text"
            id="color"
            className="input-reset ba b--black-20 pa2 mb2 db w-100"
            value={color}
            onChange={(e) => setColor(e.target.value)}
          />
        </div>
        <div className="measure">
          <label htmlFor="title" className="f6 b db mb2">
            Title
          </label>
          <input
            type="text"
            id="title"
            className="input-reset ba b--black-20 pa2 mb2 db w-100"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="measure">
          <label htmlFor="author" className="f6 b db mb2">
            Author
          </label>
          <input
            type="text"
            id="author"
            className="input-reset ba b--black-20 pa2 mb2 db w-100"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>
      </section>
      <section className="mt2 fl w-50 pa2 bg-light-gray">
        <h2>Document</h2>
        <pre>{""}</pre>
      </section>
      <Markdown />
    </div>
  )
}

export default App

function deserialize(nodes) {
  let result = ""

  for (let node of nodes) {
    const texts = [...Node.texts(node)].map((t) => t[0].text)
    if (node.type === "liquid") {
      result += dedent(node.template)
    } else {
      result += texts.join("")
    }
    result += "\n\n"
  }
  return result
}
