import React, {Component, useEffect} from "react";
import "./OfficeManagement.css";
import {useState} from "react";
import {Navigate} from "react-router-dom";
import {useNavigate} from "react-router-dom";
import {decodeJwt} from "jose";
import Offices from "./OfficeEdit";
const getBuildings = () => fetch("http://localhost:4000/api/buildinget").then((res) => res.json());

export default function Register() {
  const [items, setItems] = useState([]);
  useEffect(() => {
    const fetchItems = async () => {
      const buildings = await getBuildings();
      TableSet();
      setItems(buildings);
    };
    fetchItems();
  }, []);
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

  function logOut() {
    localStorage.clear();
    window.location.assign("http://localhost:3000/login");
  }
  function FormSet() {
    var box1 = document.getElementById("Form1");
    var box2 = document.getElementById("table");

    box2.style.display = "none";
    box1.style.display = "block";
  }
  function TableSet() {
    var box1 = document.getElementById("Form1");
    var box2 = document.getElementById("table");

    box1.style.display = "none";
    box2.style.display = "block";
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
    if (data.status === "ok") navigate("/officemanage");
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
          <button className="buttonOffice" onClick={FormSet}>
            Add Office
          </button>
          <button className="buttonOffice" onClick={TableSet}>
            Update Office
          </button>
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
              <select className="Building-Select" onChange={(e) => setLname(e.target.value)}>
                <option disabled selected>
                  Chose a building
                </option>
                {items.map((bld) => (
                  <option className="Building-Selected">{bld.buildingName}</option>
                ))}
              </select>
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
                min="0"
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
        <div className="TableOffices" id="table">
          <Offices />
        </div>
        <div className="AccountOffices">
          <label>{decodeJwt(token).email}</label>
          <img className="roundedImg" src="user.png" alt="UserIcon"></img>
          <button className="btnLogout" onClick={logOut}>
            Logout
          </button>
        </div>
      </body>
    );
  } else {
    alert("This path requires Administrator privileges, please log in.");
    window.location.replace("http://localhost:3000/login");
  }
}
