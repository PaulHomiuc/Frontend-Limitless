import React, {useEffect, useState} from "react";

import {useParams} from "react-router-dom";
const getUsers = () => fetch("http://localhost:4000/api/users").then((res) => res.json());

export default function UserStatus() {
  const [items, setItems] = useState([]);

  //console.log(match.id);

  useEffect(() => {
    const fetchItems = async () => {
      const users = await getUsers();
      setItems(users);
    };
    fetchItems();
  }, []);
  return (
    <div >
      <h1 className="TableTitle">User Status</h1>
      <table id="table" className="tableUsersStat">
        <thead>
          <tr>
            <th className="tableHeader">First name</th>
            <th className="tableHeader">Last name</th>
           
            <th className="tableHeader">Remote work percentage</th>
          </tr>
        </thead>
        <tbody>
          {items.map((user) => (
            <tr key={user._id}>
              <td className="tableElements">{user.firstName}</td>
              <td className="tableElements">{user.lastName}</td>
              <td className="percent">{user.remotePercent}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
