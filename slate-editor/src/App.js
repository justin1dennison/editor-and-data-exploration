import { createEditor, Node, Editor, Text } from "slate"
import { Slate, withReact } from "slate-react"
import { useMemo, useEffect } from "react"
import { withHistory } from "slate-history"

import { useStore } from "./store"
import Liquid from "./components/Liquid"

import {
  ParagraphPlugin,
  BoldPlugin,
  EditablePlugins,
  ItalicPlugin,
  UnderlinePlugin,
  pipe,
  getRenderElement,
} from "@udecode/slate-plugins"
const plugins = [
  ParagraphPlugin(),
  BoldPlugin(),
  ItalicPlugin(),
  UnderlinePlugin(),
]
const withPlugins = [withReact, withHistory]

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
  const editor = useMemo(() => pipe(createEditor(), ...withPlugins), [])
  useEffect(() => (window.editor = editor), [])
  return (
    <div>
      <section className="fl w-100 pa2 bb mb4">
        <h2>Editor</h2>
        <Slate
          editor={editor}
          value={content}
          onChange={(value) => setContent(value)}
        >
          {/* <Editable /> */}
          <EditablePlugins
            plugins={plugins}
            renderElement={[
              ({ children, attributes, element }) => {
                if (element.type === "paragraph")
                  return (
                    <p {...attributes} style={{ color: "red" }}>
                      {children}
                    </p>
                  )
              },
              (props) => {
                const { element } = props
                const { text: template } = Node.get(element, [0])
                if (element.type === "liquid")
                  return (
                    <Liquid
                      {...props}
                    env={{ color, author, title }}
                      
                    >
                      {template}
                    </Liquid>
                  )
              },
            ]}
          />
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
    </div>
  )
}

export default App
