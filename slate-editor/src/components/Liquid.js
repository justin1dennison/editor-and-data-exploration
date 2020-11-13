import { useState, useEffect, forwardRef } from "react"
import { Liquid as Engine } from "liquidjs"
import Modal from "./Modal"

const engine = new Engine()
const Liquid = forwardRef(
  ({ env, element, children, inline, attributes, ...rest }, ref) => {
    const [template, setTemplate] = useState(children)
    const [output, setOutput] = useState()
    const [modalIsOpen, setIsOpen] = useState(false)
    function openModal() {
      setIsOpen(true)
    }

    function closeModal() {
      setIsOpen(false)
    }
    useEffect(() => {
      engine.parseAndRender(template, env).then((result) => setOutput(result))
    }, [env, template])
    return (
      <>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="Example Modal"
        >
          <textarea
            name=""
            id=""
            cols="30"
            rows="10"
            value={template}
            onChange={(e) => {
              setTemplate(e.target.value)
            }}
          ></textarea>
        </Modal>
        {inline ? (
          <span
            ref={ref}
            {...attributes}
            contentEditable={false}
            style={{ userSelect: "none" }}
            suppressContentEditableWarning
            onClick={openModal}
          >
            {output}
          </span>
        ) : (
          <div
            ref={ref}
            {...attributes}
            contentEditable={false}
            style={{ userSelect: "none" }}
            suppressContentEditableWarning
            onClick={openModal}
          >
            {output}
          </div>
        )}
      </>
    )
  }
)

export default Liquid
