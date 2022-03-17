import React, {useEffect, useState} from "react";

import {useParams} from "react-router-dom";
const getUsers = () => fetch("http://localhost:4000/api/users").then((res) => res.json());

export default function UserStatus() {
  const [items, setItems] = useState();

  //console.log(match.id);

  useEffect(() => {
    const fetchItems = async () => {
      const users = await getUsers();
      setItems(users);
    };
    fetchItems();
  }, []);
  return (
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
            <th className="tableHeader">Birth Date</th>
            <th className="tableHeader">Nationality</th>
            <th className="tableHeader">Activated</th>
            <th className="tableHeader">Remote work percentage</th>
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
