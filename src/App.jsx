import { useState } from 'react'
import './App.css'
import {Routes, Route} from "react-router-dom"
import PageHome from './pages/home/PageHome'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
        <Routes>
            <Route path='/' element={<PageHome />} />
        </Routes>
    </>
  )
}

export default App
