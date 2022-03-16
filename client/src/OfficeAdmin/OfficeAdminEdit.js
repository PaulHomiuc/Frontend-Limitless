import React, {useEffect, useState} from "react";
import {useParams, Link} from "react-router-dom";
import {decodeJwt} from "jose";

const getOffices = (email) => {
  fetch("http://localhost:4000/api/officeadmin", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
    }),
  });
};
export default function OfficeAdminEdit() {
  const [items, setItems] = useState([]);
  const token = localStorage.getItem("token");
  const loggedIn = decodeJwt(token);
  useEffect(() => {
    if (loggedIn.role === "officeadmin") {
      const fetchItems = async () => {
        const offices = await getOffices(loggedIn.email).json();
        setItems(offices);
      };
      fetchItems();
    } else {
      alert("This path requires admin permission please log in");
      window.location.assign("http://localhost:3000/login");
    }
  }, []);
  return (
    <div>
      <div>
        <h3>Office List</h3>
        <table>
          <thead>
            <tr>
              <th>Office name</th>
              <th>Building</th>
              <th>Floor</th>
              <th>Office Administrator</th>
              <th>Total no. of desks</th>
              <th>Usable no. of desks</th>
              <th colSpan={2}>Action</th>
            </tr>
          </thead>
          <tbody>
            {items.map((off) => (
              <tr key={off._id}>
                <td>{off.officeName}</td>
                <td>{off.building}</td>
                <td>{off.floorNumber}</td>
                <td>{off.officeadmin}</td>
                <td>{off.totalDesks}</td>
                <td>{off.usableDesks}</td>

                <td>
                  <Link to={`/officemanage/${off._id}`}>Edit</Link>
                </td>
                <td>
                  <Link to={`/officemanage/delete/${off._id}`}>Delete</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
