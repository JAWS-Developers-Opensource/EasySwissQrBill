import { useState } from 'react'
import './App.css'
import {Routes, Route} from "react-router-dom"
import PageHome from './pages/home/PageHome'
import QrBillScreen from './pages/home/GenerateQRBill'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
        <Routes>
            <Route path='/' element={<PageHome />} />
            <Route path='/get-qr-bill' element={<QrBillScreen />} />
        </Routes>
    </>
  )
}

export default App
