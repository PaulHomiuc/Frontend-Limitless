import React, {Component} from "react";
import "./Employee.css";
import { useState } from "react";
export default function Employee() {

    return (
   
        <div className="Dashboard">
          <label>You are logged in as Employee</label>
          <div className="elemnt1">
           <img  className ="Information" src="/Information.png" ></img>
           <button className="buttonMenu" >Account information</button>
           </div>
           <div className="element2">
           <img className ="Information" src="writePage.png" ></img>
          <button className="buttonMenu" >Desk request</button>
          </div>
        </div>
      )
}