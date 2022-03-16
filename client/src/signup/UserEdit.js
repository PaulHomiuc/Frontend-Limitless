import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import {decodeJwt} from "jose";
import "./UserEdit.css";
const getUsers = () => fetch("http://localhost:4000/api/users").then((res) => res.json());
function redirectRegister() {
  window.location.assign("http://localhost:3000/users");
}
export const deleteUser = (id) =>
  fetch(`http://localhost:4000/api/delete`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(id),
  })
    .then((res) => res.text()) // convert to plain text
    .then((text) => console.log(text));

export default function UserEdit() {
  const [items, setItems] = useState([]);
  const token = localStorage.getItem("token");
  const loggedIn = decodeJwt(token);
  useEffect(() => {
    if (loggedIn.role === "admin") {
      const fetchItems = async () => {
        const users = await getUsers();
        setItems(users);
      };
      fetchItems();
    } else {
      alert("This path requires admin permission please log in");
      window.location.assign("http://localhost:3000/login");
    }
  }, []);
  useEffect(() => {
    const fetchItems = async () => {
      const users = await getUsers();
      setItems(users);
    };
    fetchItems();
  }, [document.getElementById("table")]);
  return (
    <div className="AddBuilding">
      <div className="addUser">
        <button className="btnAddUser" onClick={redirectRegister}>
          Add a new user
        </button>
      </div>
      <div>
        <h1>Users List</h1>
        <table id="table" className="tableUsers">
          <thead>
            <tr>
              <th className="tableHeader">First name</th>
              <th className="tableHeader">Last name</th>
              <th className="tableHeader">E-mail</th>
              <th className="tableHeader">Role</th>
              <th className="tableHeader">Gender</th>
              <th  className="tableHeader">Birth Date</th>
              <th className="tableHeader">Nationality</th>
              <th className="tableHeader">Activated</th>
              <th className="tableHeader">Remote work percentage</th>
              <th colspan="2" className="tableHeader">Action</th>
            </tr>
          </thead>
          <tbody>
            {items.map((user) => (
              <tr key={user._id}>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>{user.gender}</td>
                <td className="birthdate">{user.birthDate.substring(0, 10)}</td>
                <td>{user.nationality}</td>

                <td>
                  <input type="checkbox" value={user.activated} checked={user.activated}></input>
                </td>
                <td className="percent">{user.remotePercent}%</td>
                <td >
                  <Link to={`/users${user._id}`}>Edit</Link>
                </td>
                <td >
                  <Link to={`/users/deactivate/${user._id}`}>Activate/Deactivate</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
