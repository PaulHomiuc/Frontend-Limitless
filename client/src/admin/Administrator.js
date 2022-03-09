import React, {useEffect, useState} from "react";
import "./Administrator.css";
import {decodeJwt} from "jose";
import {useNavigate} from "react-router-dom";

const Administrator = () => {
  const [role, setRole] = useState("");
  const history = useNavigate();
  useEffect =
    (() => {
      const token = localStorage.getItem("token");
      const user = decodeJwt(token);
      console.log(user);
      if (token) {
        console.log(user);
        if (user.role !== "admin") {
          localStorage.removeItem("token");
          history.navigate("/login");
        } else {
          populateQuote();
        }
      }
    },
    []);

  async function populateQuote() {
    const req = await fetch("http://localhost:4000/api/admin", {
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    });
    const data = await req.json();
    console.log(data);
    if (data.status === "ok") {
      setRole(data.data);
    } else {
      alert(data.error);
    }
    console.log(data);
  }

  return (
    <div className="Dashboard">
      <label>You are logged in as Administrator</label>
      <div className="element1">
        <img className="Information" src="/Information.png"></img>
        <button className="buttonMenu">Account information</button>
      </div>
      <div className="element2">
        <img className="Information" src="writePage.png"></img>
        <button className="buttonMenu">Desk request</button>
      </div>
    </div>
  );
};
export default Administrator;
