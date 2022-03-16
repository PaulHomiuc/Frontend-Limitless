import "./OfficeAdmin.css";
import {decodeJwt} from "jose";
import React, {useEffect, useState} from "react";
import {useParams, Link} from "react-router-dom";

function logOut() {
  localStorage.clear();
  window.location.assign("/login");
}

function register() {
  window.location.assign("/users");
}
const getOffices = () => fetch("http://localhost:4000/api/offices").then((res) => res.json());
/*const getOffices = () => {
  fetch("http://localhost:4000/getofficeadmin", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
    }),
  }).then((res) => res.json());
};*/
function OfficeAdmin() {
  const token = localStorage.getItem("token");
  const [items, setItems] = useState([]);
  console.log(token);
  const user = decodeJwt(token);
  const email = user.email;

  useEffect(() => {
    if (user.role === "officeadmin") {
      const fetchItems = async () => {
        console.log(user.email);
        const email = user.email;
        const offices = await getOffices();
        setItems(offices);
      };
      fetchItems();
    } else {
      alert("This path requires admin permission please log in");
      window.location.assign("http://localhost:3000/login");
    }
  }, []);

  if (token === null) {
    window.location.assign("/login");
  } else {
  }
  if (user.role === "officeadmin")
    return (
      <body>
        <div className="DeskOffice">
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
              {items
                .filter(function (off) {
                  return off.officeadmin === user.email;
                })
                .map((off) => (
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
        <div className="DashboardOffice">
          <label className="dashboardTitle">You are logged in as Office Administrator</label>
          <div className="element1Office">
            <img className="InformationOffice" src="/deskIcon.png" alt="user profile"></img>
            <button className="buttonOffice">Office Management</button>
          </div>
          <div className="element2Office">
            <img className="InformationOffice" src="writePage.png" alt="user profile"></img>
            <button className="buttonOffice" id="button1" onClick={register}>
              Add user
            </button>
          </div>
          <div className="element3Office">
            <img className="InformationOffice" src="/status-office.png" alt="user profile"></img>
            <button className="buttonOffice">Office Status</button>
          </div>
        </div>

        <div className="AccountOffice">
          <label id="account">{decodeJwt(token).email}</label>
          <img className="roundedImgOffice" src="user.png" alt="UserIcon"></img>
          <button className="btnLogout" onClick={logOut}>
            Logout
          </button>
        </div>
      </body>
    );
  else {
    window.location.assign("/login");
  }
}
export default OfficeAdmin;
