import { createContext, useContext, useState } from "react"
import dedent from "ts-dedent"
import {
  DEFAULTS_ALIGN,
  DEFAULTS_BLOCKQUOTE,
  DEFAULTS_BOLD,
  DEFAULTS_CODE,
  DEFAULTS_CODE_BLOCK,
  DEFAULTS_HEADING,
  DEFAULTS_HIGHLIGHT,
  DEFAULTS_IMAGE,
  DEFAULTS_ITALIC,
  DEFAULTS_KBD,
  DEFAULTS_LINK,
  DEFAULTS_LIST,
  DEFAULTS_MEDIA_EMBED,
  DEFAULTS_MENTION,
  DEFAULTS_PARAGRAPH,
  DEFAULTS_SEARCH_HIGHLIGHT,
  DEFAULTS_STRIKETHROUGH,
  DEFAULTS_SUBSUPSCRIPT,
  DEFAULTS_TABLE,
  DEFAULTS_TODO_LIST,
  DEFAULTS_UNDERLINE,
  setDefaults,
} from "@udecode/slate-plugins"
const options = {
  ...setDefaults(DEFAULTS_PARAGRAPH, {}),
  ...setDefaults(DEFAULTS_MENTION, {}),
  ...setDefaults(DEFAULTS_BLOCKQUOTE, {}),
  ...setDefaults(DEFAULTS_CODE_BLOCK, {}),
  ...setDefaults(DEFAULTS_LINK, {}),
  ...setDefaults(DEFAULTS_IMAGE, {}),
  ...setDefaults(DEFAULTS_MEDIA_EMBED, {}),
  ...setDefaults(DEFAULTS_TODO_LIST, {}),
  ...setDefaults(DEFAULTS_TABLE, {}),
  ...setDefaults(DEFAULTS_LIST, {}),
  ...setDefaults(DEFAULTS_HEADING, {}),
  ...setDefaults(DEFAULTS_ALIGN, {}),
  ...setDefaults(DEFAULTS_BOLD, {}),
  ...setDefaults(DEFAULTS_ITALIC, {}),
  ...setDefaults(DEFAULTS_UNDERLINE, {}),
  ...setDefaults(DEFAULTS_STRIKETHROUGH, {}),
  ...setDefaults(DEFAULTS_CODE, {}),
  ...setDefaults(DEFAULTS_KBD, {}),
  ...setDefaults(DEFAULTS_SUBSUPSCRIPT, {}),
  ...setDefaults(DEFAULTS_HIGHLIGHT, {}),
  ...setDefaults(DEFAULTS_SEARCH_HIGHLIGHT, {}),
}

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
