import React from 'react'
import { Routes, Route, Link} from 'react-router-dom'
import Home from './pages/Home'
import JsonTool from './pages/JsonTool'

function App() {
  return (
    <div>
      {/* navbar */}
      <h1>this is navabar</h1>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/json-tool" element={<JsonTool />} />
      </Routes>
    </div>
  )
}

export default App
