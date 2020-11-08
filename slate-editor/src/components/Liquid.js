import { useState, useEffect } from "react"
import { Liquid as Engine } from "liquidjs"

const engine = new Engine()
export default function Liquid({ env, children }) {
  const [output, setOutput] = useState()
  useEffect(() => {
    engine.parseAndRender(children, env).then((result) => setOutput(result))
  }, [env, children])
  return <span>{output}</span>
}
