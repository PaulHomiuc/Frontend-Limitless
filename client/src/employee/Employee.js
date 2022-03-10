import React, {Component} from "react";
import "./Employee.css";
import Table from "./DisplayTable";

import {decodeJwt} from "jose";

function logOut() {
  localStorage.clear();
  window.location.replace("http://localhost:3000/login");
}

function Employee() {
  function FormToggle() {
    var box1 = document.getElementById("FormRequest");
    if (box1.style.display == "none") {
      box1.style.display = "block";
    } else {
      box1.style.display = "none";
    }
  }

  const token = localStorage.getItem("token");
  console.log(token);
  const user = decodeJwt(token);

  if (!token) {
    window.location.replace("http://localhost:3000/login");
  } else {
    if (user.role === "employee")
      return (
        <body>
          <div className="Dashboard">
            <label className="buttonMenu">You are logged in as Employee</label>
            <div className="element1">
              <img className="Information" src="/Information.png"></img>
              <button className="buttonMenu">Account information</button>
            </div>
            <div className="element2">
              <img className="Information" src="writePage.png"></img>
              <button className="buttonMenu" id="btnRequest" onClick={FormToggle}>
                Desk request
              </button>
            </div>
          </div>
          <div className="DeskRequest" id="FormRequest">
            <h1>File a desk Request</h1>
            <h3>Select an Office</h3>
            <Table className="Tabel" />

            <h3> Reason for request</h3>
            <textarea className="Reason"></textarea>
            <button className="btn">Submit request</button>
          </div>
          <div className="Account">
            <label>{decodeJwt(token).email}</label>
            <img className="roundedImg" src="user.png" alt="UserIcon"></img>
            <button className="btn" onClick={logOut}>
              Logout
            </button>
          </div>
        </body>
      );
    else {
      window.location.replace("http://localhost:3000/login");
    }
  }
}
export default Employee;
