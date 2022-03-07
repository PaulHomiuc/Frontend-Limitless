import React from "react";
import {BrowserRouter, Route, Routes,Navigate} from "react-router-dom";
import "./App.css";

import Preferences from "./preferences/Preferences.js";
import Login from "./Login/Login.js";
import Employee from "./employee/Employee";
const startApp =() =>{
  window.location.replace("http://localhost:3000/login");
}
const App = () => {
  
  return (
    
    <div className="bg">

      
     
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate replace to="/login"/>}/>
          
          <Route path= "/employee" element={<Employee/>}/>
          <Route path="/preferences" element={<Preferences />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};
export default App;
