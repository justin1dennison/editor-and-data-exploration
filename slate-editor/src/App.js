import {useState} from 'react'
import Liquid from './components/Liquid'

const templates = {
    if:  `{% if color == 'blue'%} Blue is awesome {%endif%}`,
    value: `{{ color  }}`
}
const toTry = ['if', 'value']

function App() {
  const [color, setColor] = useState('')
    return [
        <input type='text' value={color} onChange={e => setColor(e.target.value)} />,
        toTry.map((label, i) => <Liquid key={i} env={{ color }}>{templates[label]}</Liquid>)
    ]
}

export default App
