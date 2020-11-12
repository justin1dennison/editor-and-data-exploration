import { useState, useCallback, useEffect } from "react"
import { SlateTransformer } from "@accordproject/markdown-slate"
import { MarkdownEditor } from "@accordproject/ui-markdown-editor"
import "semantic-ui-css/semantic.min.css"

const slateTransformer = new SlateTransformer()
const defaultMarkdown = `This is text. You can edit it.

  <p>Color: {{color}}</p>
  
***

# Headings


`


export default () => {
  const [slateValue, setSlateValue] = useState(() => {
    const slate = slateTransformer.fromMarkdown(defaultMarkdown)
    console.log({ slate })
    return slate.document.children
  })

  const onSlateValueChange = useCallback((slateChildren) => {
    localStorage.setItem("slate-editor-value", JSON.stringify(slateChildren))
    const slateValue = { document: { children: slateChildren } }
    setSlateValue(slateValue.document.children)
  }, [])

  return (
    <MarkdownEditor
      readOnly={false}
      value={slateValue}
      onChange={onSlateValueChange}
    />
  )
}
