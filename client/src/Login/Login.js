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
  async function loginUser(event) {
    event.preventDefault();
    const response = await fetch("http://localhost:4000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    const data = await response.json();

    console.log(data);
    if (data.user) {
      localStorage.setItem("token", data.user);
      alert("Connected");

      navigate("/admin");
    } else {
      document.getElementById("email").style.backgroundColor = "pink";
      document.getElementById("password").style.backgroundColor = "pink";
    }
    console.log(data);
  }
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
    document.getElementById("email").style.backgroundColor = "#e0f3c5";
    setEmail(e.target.value);
  };
  const handleOnChangepass = (e) => {
    document.getElementById("password").style.backgroundColor = "#e0f3c5";
    setPassword(e.target.value);
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
          <input
            id="password"
            type="password"
            placeholder="password"
            required
            isPassword
            onChange={handleOnChangepass}
          />
        </label>
        <div>
          <button className="buttonCustom" type="submit" onClick={loginUser}>
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
