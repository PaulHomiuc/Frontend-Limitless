import React, {useEffect, useState} from "react";
import "./Administrator.css";
import {decodeJwt} from "jose";
import {useNavigate} from "react-router-dom";

const LogoutFunc = () =>{
  const history = useNavigate();
  localStorage.setItem("token",null);
 
 history.navigate("/login");
}
  function ReturnEmail= () =>{
    const history = useNavigate();
    const token = localStorage.getItem("token");
    console.log(token);
    
    if (token == null) {
      history.navigate("/login");
      const user = "ceva";
    } else {
      const user = decodeJwt(token);
    }
    return user.email;
  }
const Administrator = () => {
  const [role, setRole] = useState("");
  const history = useNavigate();
  const token = localStorage.getItem("token");
  console.log(token);
  
  if (token == null) {
    history.navigate("/login");
    const user = "ceva";
  } else {
    const user = decodeJwt(token);
  }

  return (
    <body>
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
    <div className="Account">
        <label id="account">{user.email}</label>
        <img className="roundedImg" src="user.png" alt="UserIcon"></img>
        <button className="btn" onClick={LogoutFunc()} >Logout</button>
      </div>
    </body>
  );
};
export default Administrator;
