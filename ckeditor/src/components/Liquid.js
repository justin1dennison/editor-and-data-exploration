import { useState, useEffect } from "react"
import { Liquid as Engine } from "liquidjs"

const engine = new Engine()

export default function Liquid({ env, children }) {
  const [result, setResult] = useState()
  useEffect(() => {
    engine.parseAndRender(children, env).then((r) => setResult(r))
  }, [env, children])
  return <span>{result}</span>
}
