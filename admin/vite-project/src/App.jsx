import React from 'react'
import Navbar from './components/Navbar/Navbar'
import Sidebar from './components/sidebar/Sidebar'
import { Route, Routes } from 'react-router-dom'
import Add from './pages/Additems/Additems'
import Listitems from './pages/Listitems/Listitems'
import Orders from './pages/Orders/Orders'
import Login from './components/Login/Login'
const App = () => {

  const url="http://localhost:5000"
  return (
    <div>
      <Navbar></Navbar>
      <hr></hr>
      <div className="app-content">
         <Sidebar></Sidebar>
         <Routes>
          <Route path='/Add' element={<Add url={url}></Add>}></Route>
          <Route path='/List' element={<Listitems url={url} ></Listitems>}></Route>
          <Route path='/Orders' element={<Orders url={url}></Orders>}></Route>
         </Routes>
      </div>
     
      
    </div>
  )
}

export default App
