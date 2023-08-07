
import { BrowserRouter,Routes, Route } from "react-router-dom";
import React ,{ useState } from "react";
import Login from './pages/Login'
import Register from "./pages/Register";
import  Add  from "./pages/Add";
import  Page  from "./pages/Page";
import Update from "./pages/Update";

function App() {
 
  return (
    <>
      <div className='main'>
   
       
       <Routes>
        <Route path="/" element={<Login />}  />
        <Route path="/page" element={<Page />}  />
        <Route path="/add" element={<Add />}  />
        <Route path="/register" element={<Register />} />
        <Route path="/update/:id" element={<Update />} />
       </Routes>
       
      </div>
      
    </>
  )
}

export default App;
