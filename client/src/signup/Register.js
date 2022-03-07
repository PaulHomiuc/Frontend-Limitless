import React, {Component} from "react";
import "./Register.css";
import {useState} from "react";
import {Navigate, useRoutes} from "react-router-dom";
import {useNavigate} from "react-router-dom";
export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();
  const redirect = () => {
    navigate("/login");
  };
  const emailValidation = () => {
    const regEx = /[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,8}(.[a-z{2,8}])?/g;
    if (regEx.test(email)) {
      setMessage("Email is Valid");
    } else if (!regEx.test(email) && email !== "") {
      setMessage("Email is Not Valid");
    } else {
      setMessage("");
    }
    if (password.length < 8) setMessage("The password should have at least 8 characters");
  };
  async function registerUser() {
    fetch("http://localhost:4000/register");
  }
  const handleOnChange = (e) => {
    setEmail(e.target.value);
  };
  return (
    <div className="Register">
      <h1>Register a new user</h1>
      <form className="formular">
        <label>
          <p>
            First Name<b>*</b>
          </p>

          <input id="fname" type="text" placeholder="First Name" required />
        </label>
        <label>
          <p>
            Last Name<b>*</b>
          </p>
          <input id="lname" type="text" placeholder="Last Name" required />
        </label>
        <label>
          <p>
            E-mail address
            <b>*</b>
          </p>
          <input
            id="email"
            className="input"
            type="email"
            placeholder="email"
            value={email}
            required
            onInput={emailValidation}
            onChange={handleOnChange}
          />
        </label>
        <label>
          <p>
            Password<b>*</b>
          </p>
          <input id="password" type="password" placeholder="password" required isPassword />
        </label>
        <label>
          <p>
            Role<b>*</b>
          </p>
          <select name="role" id="roles" required placeholder="Role">
            <option value="admin">Administrator</option>
            <option value="officeadmin">Office Administrator</option>
            <option value="employee">Employee</option>
          </select>
        </label>
        <label>
          <p>
            Gender<b>*</b>
          </p>
          <select name="gender" id="genders" required placeholder="Gender">
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </label>

        <label>
          <p>Date of birth</p>
          <input type="date" />
        </label>
        <label>
          <p>Nationality</p>
          <input type="text" placeholder="Nationality" />
        </label>

        <div>
          <button type="submit" onClick={redirect}>
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
