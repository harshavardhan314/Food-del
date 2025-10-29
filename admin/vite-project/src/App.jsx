import React from 'react'
import Navbar from './components/Navbar/Navbar'
import Sidebar from './components/sidebar/Sidebar'
import { Route, Routes } from 'react-router-dom'
import Additems from './pages/Additems/Additems'
import Listitems from './pages/Listitems/Listitems'
import Orders from './pages/Orders/Orders'
const App = () => {
  return (
    <div>
      <Navbar></Navbar>
      <hr></hr>
      <div className="app-content">
         <Sidebar></Sidebar>
         <Routes>
          <Route path='/Add' element={<Additems></Additems>}></Route>
          <Route path='/List' element={<Listitems></Listitems>}></Route>
          <Route path='/Orders' element={<Orders></Orders>}></Route>
         </Routes>
      </div>
     
      
    </div>
  )
}

export default App
