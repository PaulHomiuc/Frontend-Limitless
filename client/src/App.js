import React from "react";
import {BrowserRouter, Route, Routes, Navigate} from "react-router-dom";
import "./App.css";
import {decodeJwt} from "jose";
import Preferences from "./preferences/Preferences.js";
import Login from "./Login/Login.js";
import Employee from "./employee/Employee";
import Register from "./signup/Register";
import Administrator from "./admin/Administrator";
import {useNavigate} from "react-router-dom";

const token = localStorage.getItem("token");
const decoded = decodeJwt(token);

const App = () => {
  return (
    <div className="bg">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate replace to="/login" />} />

          <Route path="/employee" element={<Employee />} />
          <Route path="/admin" element={<Administrator />} />
          <Route path="/preferences" element={<Preferences />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};
export default App;
