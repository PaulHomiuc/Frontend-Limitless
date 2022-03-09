import React, {Component} from "react";
import "./Employee.css";
import Table from "./DisplayTable";
import { useState } from "react";
export default function Employee() {
    function FormToggle(){
     var box1 = document.getElementById("FormRequest");
        if(box1.style.display=="none")
        {
          box1.style.display="block";
        }
        else
        {
          box1.style.display="none";
        }
    }
    return (
        <body>
           <div className="Account">
          <label >Your email here</label>
          <img className="roundedImg" src="user.png" alt="UserIcon" ></img>
          <button className="btn">Logout</button>
          </div>
        <div className="Dashboard">
          <label className="buttonMenu">You are logged in as Employee</label>
          <div className="element1">
           <img  className ="Information" src="/Information.png" ></img>
           <button className="buttonMenu" >Account information</button>
           </div>
           <div className="element2">
           <img className ="Information" src="writePage.png" ></img>
          <button className="buttonMenu" id="btnRequest" onClick={FormToggle} >Desk request</button>
          </div>
        </div>
        <div className="DeskRequest" id="FormRequest" >
          <h1>File a desk Request</h1>
          
          <Table className="Tabel"/>
          <h3>Select an Office</h3>
          <h3 >  Reason for request</h3>
        <textarea className="Reason"></textarea>
        <button className="btn">Submit request</button>
        </div>
          </body>
      )
}