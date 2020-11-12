import { createContext, useContext, useState } from "react"
import dedent from "ts-dedent"

const StoreContext = createContext()

const templates = {
  value: "{{ color }}",
  for: dedent`
      {% for i in (1..6) %}
      {{ '#' | repeat: i }} h{{i}} Heading
      {% endfor %}`,
  if: dedent`{% if color == "blue" %}
      The color blue is awesome!
    {% elsif color == "red" %}
      The color red sucks!
    {% else %}
      The color {{color}} is ok, ...I guess.
    {% endif %}`,
}

const initialContent = [
  {
    type: "paragraph",
    children: [{ text: "Sample" }],
  },
  {
    type: "liquid",
    inline: true,
    children: [{ text: templates.value }],
  },
  {
    type: "liquid",
    children: [{ text: templates.for }],
  },
  {
    type: "liquid",
    children: [{ text: templates.if }],
  },
]

export function StoreProvider({ children }) {
  const [color, setColor] = useState("blue")
  const [title, setTitle] = useState("ui!")
  const [author, setAuthor] = useState("justin")
  const [content, setContent] = useState(initialContent)
  const value = {
    color,
    setColor,
    title,
    setTitle,
    author,
    setAuthor,
    content,
    setContent,
  }
  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}

export const useStore = () => useContext(StoreContext)
