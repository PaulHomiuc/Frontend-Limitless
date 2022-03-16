import React, {Component, useEffect, useState} from "react";
import "./Employee.css";
import Table from "./DisplayTable";

import {decodeJwt} from "jose";
const getOffices = () => fetch("http://localhost:4000/api/offices").then((res) => res.json());
function logOut() {
  localStorage.clear();
  window.location.assign("http://localhost:3000/login");
}

function Employee() {
  const [items, setItems] = useState([]);
  const [percent, setPercent] = useState("");

  useEffect(() => {}, []);
  function FormToggle() {
    var box = document.getElementById("FormRequest");
    if (box.classList.contains("hidden")) {
      box.classList.remove("hidden");
      setTimeout(function () {
        box.classList.remove("visuallyhidden");
      }, 20);
    } else {
      box.classList.add("visuallyhidden");
      box.addEventListener(
        "transitionend",
        function (e) {
          box.classList.add("hidden");
        },
        {
          capture: false,
          once: true,
          passive: false,
        }
      );
    }
  }

  const token = localStorage.getItem("token");
  console.log(token);
  const user = decodeJwt(token);
  const sender = user.email;
  const [reason, setReason] = useState();
  const id = user.id;
  function onSubmit() {
    const response = fetch("http://localhost:4000/api/request", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        sender,
        reason,
        percent,
        id,
      }),
    });
    alert("Request sent successfully.");

    window.location.assign("/employee");
  }
  if (!token) {
    window.location.assign("http://localhost:3000/login");
  } else {
    if (user.role === "employee")
      return (
        <body>
          <div className="DashboardEmployee">
            <label className="dashboardTitle">You are logged in as Employee</label>
            <div className="element1">
              <img className="Information" src="/Information.png"></img>
              <button className="buttonOffice">Account information</button>
            </div>
            <div className="element2">
              <img className="Information" src="writePage.png"></img>
              <button className="buttonOffice" id="btnRequest" onClick={FormToggle}>
                Work Remote
              </button>
            </div>
          </div>
          <div className="boxRequest" id="FormRequest">
            <h1>File a remote work request</h1>
            <h3>Remote work percentage</h3>
            <input
              type="range"
              min="0"
              max="100"
              value={percent}
              class="slider"
              id="myRange"
              onChange={(e) => setPercent(e.target.value)}
            ></input>
            <label>{percent}%</label>
            <h3> Reason for request</h3>
            <textarea
              id="freetext"
              className="Reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            ></textarea>
            <button className="buttonOffice" onClick={onSubmit}>
              Submit request
            </button>
          </div>
          <div className="Account">
            <label>{decodeJwt(token).email}</label>
            <img className="roundedImg" src="user.png" alt="UserIcon"></img>
            <button className="btnLogout" onClick={logOut}>
              Logout
            </button>
          </div>
        </body>
      );
    else {
      window.location.assign("http://localhost:3000/login");
    }
  }
}
export default Employee;
