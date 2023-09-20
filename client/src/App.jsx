import './App.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from "./Home"
import AddData from "./GP/SelectTable"
import Add from "./GP/AddData"
import GP from "./GP/GP"
import Update from "./GP/Update"
import Pitch from "./Pitch/pitch"
import Topic from "./GP/Topics"
import "bootstrap/dist/css/bootstrap.min.css"

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/AddData" element={<AddData/>}></Route>
        <Route path="/AddData/:table" element={<Add/>}></Route>
        <Route path="/GP" element={<GP/>}></Route>
        <Route path="/GP/Update/:id/" element={<Update/>}></Route>
        <Route path="/Pitch" element={<Pitch/>}></Route>
        <Route path="/GP/Topics/:site" element={<Topic/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
