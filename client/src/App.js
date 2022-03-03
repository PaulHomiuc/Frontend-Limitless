import React from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import "./App.css";
import Dashboard from "./dashboard/Dashboard.js";
import Preferences from "./preferences/Preferences.js";
import Login from "./Login/Login.js";

const App = () => {
  return (
    <div className="wrapper">

      <Login/>
      <BrowserRouter>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />

          <Route path="/preferences" element={<Preferences />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};
export default App;
