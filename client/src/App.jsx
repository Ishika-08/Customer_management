import './App.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from "./Home"
import AddData from "./GP/AddData"
import GP from "./GP/GP"
import "bootstrap/dist/css/bootstrap.min.css"

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/AddData" element={<AddData/>}></Route>
        <Route path="/GP" element={<GP/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
