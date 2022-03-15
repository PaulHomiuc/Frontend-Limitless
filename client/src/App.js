import React from "react";
import {BrowserRouter, Route, Routes, Navigate} from "react-router-dom";
import "./App.css";
import Preferences from "./preferences/Preferences.js";
import Login from "./Login/Login.js";
import Employee from "./employee/Employee";
import Register from "./signup/Register";
import UserEdit from "./signup/UserEdit";
import {UpdateUser} from "./signup/UpdateUser";
import Administrator from "./admin/Administrator";
import OfficeAdmin from "./OfficeAdmin/OfficeAdmin";
import OfficeManagement from "./OfficeManagement/OfficeManagement";
import OfficeEdit from "./OfficeManagement/OfficeEdit";
import DeactivateUser from "./signup/DeactivateUser";
import NOTFOUND from "./NOTFOUND.js";
import BuildingAdd from "./buildings/BuildingAdd";
import {UpdateOffice} from "./OfficeManagement/UpdateOffice";
import DeleteOffice from "./OfficeManagement/DeleteOffice";
const App = () => {
  return (
    <div className="bg">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate replace to="/login" />} />

          <Route exact path="/employee" element={<Employee />} />
          <Route exact path="/admin" element={<Administrator />} />
          <Route exact path="/officeadmin" element={<OfficeAdmin />} />

          <Route exact path="/preferences" element={<Preferences />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/users" element={<Register />} />
          <Route exact path="/users/edit" element={<UserEdit />} />
          <Route path="/users/:id" element={<UpdateUser />} />
          <Route path="/users/deactivate/:id" element={<DeactivateUser />} />
          <Route exact path="/officemanage" element={<OfficeManagement />} />
          <Route exact path="/officemanage/edit" element={<OfficeEdit />} />
          <Route exact path="/officemanage/:id" element={<UpdateOffice />} />
          <Route exact path="/officemanage/delete/:id" element={<DeleteOffice />} />
          <Route exact path="/buildings" element={<BuildingAdd />} />
          <Route path="*" element={<NOTFOUND />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};
export default App;
