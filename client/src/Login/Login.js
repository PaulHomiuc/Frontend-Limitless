import React, {Component} from "react";
import "./Login.css";
import {useState} from "react";
import {Navigate, useRoutes} from "react-router-dom";
import {useNavigate} from "react-router-dom";
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();
  const redirect = () => {
    navigate("/employee");
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

  const handleOnChange = (e) => {
    setEmail(e.target.value);
  };
  return (
    <div className="Login">
      <div className="headerlogin">
        <h1>Please Log In</h1>
      </div>
      <form className="formular">
        <label>
          <p>E-mail address</p>
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
          <p>Password</p>
          <input id="password" type="password" placeholder="password" required isPassword />
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
