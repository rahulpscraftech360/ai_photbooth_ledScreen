import { useState } from 'react'

import './App.css'
import FullScreenImage from './FullScreenImage'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <FullScreenImage />
    </>
  )
}

export default App
