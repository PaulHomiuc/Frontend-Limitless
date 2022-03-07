import React, {Component} from "react";
import "./Register.css";
import {useState} from "react";
import {Navigate, useRoutes} from "react-router-dom";
import {useNavigate} from "react-router-dom";
export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [role, setRole] = useState("");
  const [gender, setGender] = useState("");
  const [date, setDate] = useState("");
  const [national, setNational] = useState("");

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
  async function registerUser(event) {
    event.preventDefault();
    const response = await fetch("http://localhost:4000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fname,
        lname,
        email,
        password,
        role,
        gender,
        date,
        national,
      }),
    });
    const data = await response.json();
    console.log(data);
  }
  const handleOnChange = (e) => {
    setEmail(e.target.value);
  };
  return (
    <div className="Register">
      <h1 className="headereg">Register a new user</h1>
      <form className="formular">
        <label>
          <p>
            First Name<b>*</b>
          </p>

          <input
            value={fname}
            id="fname"
            type="text"
            placeholder="First Name"
            required
            onChange={(e) => setFname(e.target.value)}
          />
        </label>
        <label>
          <p>
            Last Name<b>*</b>
          </p>
          <input
            value={lname}
            id="lname"
            type="text"
            placeholder="Last Name"
            required
            onChange={(e) => setLname(e.target.value)}
          />
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
          <input
            id="password"
            type="password"
            placeholder="password"
            required
            isPassword
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <label>
          <p>
            Role<b>*</b>
          </p>
          <select
            name="role"
            id="roles"
            required
            placeholder="Role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="admin">Administrator</option>
            <option value="officeadmin">Office Administrator</option>
            <option value="employee">Employee</option>
          </select>
        </label>
        <label>
          <p>
            Gender<b>*</b>
          </p>
          <select
            name="gender"
            id="genders"
            required
            placeholder="Gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </label>

        <label>
          <p>Date of birth</p>
          <input
            type="date"
            name="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </label>
        <label>
          <p>Nationality</p>
          <input
            type="text"
            placeholder="Nationality"
            id="nationality"
            name="nationality"
            value={national}
            onChange={(e) => setNational(e.target.value)}
          />
        </label>

        <div>
          <button type="submit" onClick={registerUser}>
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
