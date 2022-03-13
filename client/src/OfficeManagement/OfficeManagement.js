import React, {Component} from "react";
import "./OfficeManagement.css";
import {useState} from "react";
import {Navigate, useRoutes} from "react-router-dom";
import {useNavigate} from "react-router-dom";
import {decodeJwt} from "jose";

export default function Register() {
  const [floornumber, setEmail] = useState("");
  const [totaldesks, setPassword] = useState("");
  const [officename, setFname] = useState("");
  const [bname, setLname] = useState("");
  const [usable, setRole] = useState("");
  const [offadm, setGender] = useState("");

  const token = localStorage.getItem("token");
  const user = decodeJwt(token);
  const navigate = useNavigate();
  function redirect() {
    window.location.assign("http://localhost:3000/officemanage/edit");
  }
  function FormToggle() {
    var box1 = document.getElementById("Form1");
    if (box1.classList.contains("hidden")) {
      box1.classList.remove("hidden");
      setTimeout(function () {
        box1.classList.remove("visuallyhidden");
      }, 20);
    } else {
      box1.classList.add("visuallyhidden");
      box1.addEventListener(
        "transitionend",
        function (e) {
          box1.classList.add("hidden");
        },
        {
          capture: false,
          once: true,
          passive: false,
        }
      );
    }
  }
  async function registerOffice(event) {
    event.preventDefault();
    const response = await fetch("http://localhost:4000/api/officemanage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        officename,
        bname,
        floornumber,
        totaldesks,
        usable,
        offadm,
      }),
    });
    const data = await response.json();
    console.log(data);
    if (data.status === "ok") navigate("/admin");
  }
  function handleNumbertotal() {
    if (document.getElementById("totaldesks").value <= 0) {
      document.getElementById("totaldesks").value = 0;
    }
  }
  function handleNumberusable() {
    if (document.getElementById("usable").value <= 0) {
      document.getElementById("usable").value = 0;
    }
  }
  const handleOnChange = (e) => {
    setEmail(e.target.value);
  };
  if (user.role === "admin") {
    return (
      <body className="Office-wrapper">
        <div className="navbar">
          <button className="buttonOffice" onClick={FormToggle}>
            Add Office
          </button>
          <button className="buttonOffice" onClick={redirect}>
            Update Office
          </button>
          <button className="buttonOffice">Delete Office</button>
        </div>
        <div className="box1" id="Form1">
          <h1 className="headereg">Add a new Office</h1>
          <form className="formular">
            <label>
              <p>
                Office Name<b>*</b>
              </p>

              <input
                value={officename}
                id="offname"
                type="text"
                placeholder="Office Name"
                required
                onChange={(e) => setFname(e.target.value)}
              />
            </label>
            <label>
              <p>
                Building<b>*</b>
              </p>
              <input
                value={bname}
                id="bname"
                type="text"
                placeholder="Building"
                required
                onChange={(e) => setLname(e.target.value)}
              />
            </label>
            <label>
              <p>
                Floor Number
                <b>*</b>
              </p>
              <input
                id="floornumber"
                className="input"
                type="number"
                placeholder="floor number"
                value={floornumber}
                required
                onChange={handleOnChange}
              />
            </label>
            <label>
              <p>
                Total Desks<b>*</b>
              </p>
              <input
                id="totaldesks"
                type="number"
                placeholder="Total Desks"
                required
                onInput={handleNumbertotal}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
            <label>
              <p>
                Usable Desks<b>*</b>
              </p>
              <input
                type="number"
                name="usable"
                id="usable"
                required
                outlined
                placeholder="Usable Desks"
                value={usable}
                onInput={handleNumberusable}
                onChange={(e) => setRole(e.target.value)}
              />
            </label>
            <label>
              <p>Office Administrator (email)</p>
              <input
                type="email"
                name="offadm"
                id="offadm"
                value={offadm}
                placeholder="Office Admin"
                onChange={(e) => setGender(e.target.value)}
              />
            </label>

            <div>
              <button type="submit" className="buttonOffice" onClick={registerOffice}>
                Submit
              </button>
            </div>
          </form>
        </div>
      </body>
    );
  } else {
    alert("This path requires Administrator privileges, please log in.");
    window.location.replace("http://localhost:3000/login");
  }
}
