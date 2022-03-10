import React from "react";
import {BrowserRouter, Route, Routes, Navigate} from "react-router-dom";
import "./App.css";
import Preferences from "./preferences/Preferences.js";
import Login from "./Login/Login.js";
import Employee from "./employee/Employee";
import Register from "./signup/Register";
import Administrator from "./admin/Administrator";

const App = () => {
  return (
    <div className="bg">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate replace to="/login" />} />

          <Route exact path="/employee" element={<Employee />} />
          <Route exact path="/admin" element={<Administrator />} />

          <Route exact path="/preferences" element={<Preferences />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          {<Route path="*" element={() => "404 NOT FOUND"} />}
        </Routes>
      </BrowserRouter>
    </div>
  );
};
export default App;
