import "./UserEdit.css";
import Register from "./Register.js";
import React, {useState, useEffect} from "react";

import {useParams, useNavigate} from "react-router-dom";

export const updateUser = (user, id) => {
  console.log(user);
  fetch(`http://localhost:4000/update/${id}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
};
const regEx = /[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,8}(.[a-z{2,8}])?/g;
export const getUser = (id) => fetch(`http://localhost:4000/users/${id}`).then((res) => res.json());
export const UpdateUser = () => {
  const match = useParams();
  const [user, setUser] = useState("");
  const history = useNavigate();
  useEffect(() => {
    const fetchTodo = async () => {
      const user = await getUser(match.id);
      setUser(user);
      const date = user.birthDate;
      var str = date.substring(0, 10);

      document.getElementById("date").value = str;
    };
    fetchTodo();
  }, []);

  async function onSubmit(data) {
    await updateUser(data, match);

    history.push("/");
  }

  return user ? (
    <div className="container">
      <div className="mt-3">
        <h3>Edit Todo Item</h3>
        <div className="Register">
          <h1 className="headereg">Edit user</h1>
          <form className="formular">
            <label>
              <p>
                First Name<b>*</b>
              </p>

              <input
                defaultValue={user.firstName}
                id="fname"
                type="text"
                placeholder="First Name"
                required
                onChange={(e) => (user.firstName = e.target.value)}
              />
            </label>
            <label>
              <p>
                Last Name<b>*</b>
              </p>
              <input
                defaultValue={user.lastName}
                id="lname"
                type="text"
                placeholder="Last Name"
                required
                onChange={(e) => (user.lastName = e.target.value)}
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
                defaultValue={user.email}
                required
                onChange={(e) => (user.email = e.target.value)}
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
                defaultValue={user.password}
                onChange={(e) => (user.password = e.target.value)}
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
                placeholder="admin"
                defaultValue={user.role}
                onChange={(e) => (user.role = e.target.value)}
              >
                {" "}
                <option selected disabled>
                  Choose role...
                </option>
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
                placeholder="Male"
                defaultValue={user.gender}
                onChange={(e) => (user.gender = e.target.value)}
              >
                {" "}
                <option selected disabled>
                  Choose gender...
                </option>
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
                onChange={(e) => (user.birthDate = e.target.value)}
              />
            </label>
            <label>
              <p>Nationality</p>
              <input
                type="text"
                placeholder="Nationality"
                id="nationality"
                name="nationality"
                defaultValue={user.nationality}
                onChange={(e) => (user.nationality = e.target.value)}
              />
            </label>

            <div>
              <button className="buttonOffice" type="submit" onClick={onSubmit()}>
                Save
              </button>
            </div>
          </form>
        </div>

        {/* <button onClick={onSubmit()}>Save</button> */}
      </div>
    </div>
  ) : (
    <div>Loading...</div>
  );
};
