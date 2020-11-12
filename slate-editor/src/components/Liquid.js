import { useState, useEffect, forwardRef } from "react"
import { Liquid as Engine } from "liquidjs"
import { useReadOnly } from "slate-react"

const engine = new Engine()
const Liquid = forwardRef(
  ({ env, element, children, inline, attributes, ...rest }, ref) => {
    const [output, setOutput] = useState()
    const readOnly = useReadOnly()
    useEffect(() => {
      engine.parseAndRender(children, env).then((result) => setOutput(result))
    }, [env, children])
    return inline ? (
      <span
        ref={ref}
        {...attributes}
        contentEditable={!readOnly}
        suppressContentEditableWarning
      >
        {output}
      </span>
    ) : (
      <div
        ref={ref}
        {...attributes}
        contentEditable={!readOnly}
        suppressContentEditableWarning
      >
        {output}
      </div>
    )
  }
)

export default Liquid
