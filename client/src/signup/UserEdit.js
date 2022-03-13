import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import "./UserEdit.css";
const getOffices = () => fetch("http://localhost:4000/api/users").then((res) => res.json());

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
  /*function deleteUser(id) {
    const response = fetch("http://localhost:4000/api/delete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(id),
    });
  }*/
  useEffect(() => {
    const fetchItems = async () => {
      const users = await getOffices();
      setItems(users);
    };
    fetchItems();
  }, []);
  useEffect(() => {
    const fetchItems = async () => {
      const users = await getOffices();
      setItems(users);
    };
    fetchItems();
  }, [document.getElementById("table")]);
  return (
    <div className="AddBuilding">
      <div>
        <h3>Users List</h3>
        <table id="table">
          <thead>
            <tr>
              <th>First name</th>
              <th>Last name</th>
              <th>E-mail</th>
              <th>Role</th>
              <th>Gender</th>
              <th>Birth Date</th>
              <th>Nationality</th>
              <th>Activated</th>
              <th colspan="2">Action</th>
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
                <td>{user.birthDate}</td>
                <td>{user.nationality}</td>
                <td>
                  <input type="checkbox" value={user.activated} checked={user.activated}></input>
                </td>

                <td>
                  <Link to={`/users/${user._id}`}>Edit</Link>
                </td>
                <td>
                  <Link to={deleteUser(user._id)}>Delete</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
