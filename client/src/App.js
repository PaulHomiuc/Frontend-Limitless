import React from "react";
import {BrowserRouter, Route, Routes, Navigate} from "react-router-dom";
import "./App.css";
import Preferences from "./preferences/Preferences.js";
import Login from "./Login/Login.js";
import Employee from "./employee/Employee";
import Register from "./signup/Register";
import Administrator from "./admin/Administrator";
import OfficeAdmin from "./OfficeAdmin/OfficeAdmin";
import OfficeManagement from "./OfficeManagement/OfficeManagement";
import NOTFOUND from "./NOTFOUND.js";

const App = () => {
  return (
    <div className="bg">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate replace to="/login" />} />

          <Route exact path="/employee" element={<Employee />} />
          <Route exact path="/admin" element={<Administrator />} />
          <Route exact path="/OfficeAdmin" element={<OfficeAdmin />} />

          <Route exact path="/preferences" element={<Preferences />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/officemanage" element={<OfficeManagement />} />

          <Route path="*" element={<NOTFOUND />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};
export default App;
