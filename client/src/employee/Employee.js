import React, {Component, useEffect, useState} from "react";
import "./Employee.css";
import Table from "./DisplayTable";

import {decodeJwt} from "jose";
// const getOffices = () => fetch("http://localhost:4000/api/offices").then((res) => res.json());
function logOut() {
  localStorage.clear();
  window.location.assign("http://localhost:3000/login");
}

var officeName, building, floorNumber, totalDesks, usableDesks, officeAdmin;
// async function fetchData() {
//   const response = await fetch("http://localhost:4000/api/offices", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       officeName,
//       building,
//       floorNumber,
//       totalDesks,
//       usableDesks,
//       officeAdmin,
//     }),
//   });

//   const data = await response.json();
// }
function Employee() {
  const [items, setItems] = useState([]);
  const [percent, setPercent] = useState("");
  useEffect(() => {
    // const fetchItems = async () => {
    //   const offices = await getOffices();
    //   setItems(offices);
    // };
    // fetchItems();
  }, []);
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
              min="1"
              max="100"
              value={percent}
              class="slider"
              id="myRange"
              onChange={(e) => setPercent(e.target.value)}
            ></input>
            <label>{percent}%</label>
            <h3> Reason for request</h3>
            <textarea className="Reason"></textarea>
            <button className="buttonOffice">Submit request</button>
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
