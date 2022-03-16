import "./Administrator.css";
import {decodeJwt} from "jose";
import {useState, useEffect} from "react";
import {useParams, Link} from "react-router-dom";
function logOut() {
  localStorage.clear();
  window.location.assign("http://localhost:3000/login");
}
const getRequests = () => fetch("http://localhost:4000/api/getrequests").then((res) => res.json());
function register() {
  window.location.assign("http://localhost:3000/users/edit");
}
function officeManagement() {
  window.location.assign("http://localhost:3000/officemanage");
}
function buildingsManagement() {
  window.location.assign("http://localhost:3000/buildings");
}

function Administrator() {
  const token = localStorage.getItem("token");
  console.log(token);
  const user = decodeJwt(token);
  const [items, setItems] = useState([]);
  useEffect(() => {
    const fetchItems = async () => {
      const requests = await getRequests();
      setItems(requests);
    };
    fetchItems();
  }, []);
  if (token === null) {
    window.location.assign("http://localhost:3000/login");
  } else {
  }
  if (user.role === "admin")
    return (
      <body>
        <div className="Dashboard">
          <label className="dashboardTitle">You are logged in as Administrator</label>
          <div className="element1">
            <img className="Information" src="/deskIcon.png" alt="user profile"></img>
            <button className="btnOffice" onClick={officeManagement}>
              Office Management
            </button>
          </div>
          <div className="element2">
            <img className="Information" src="writePage.png" alt="WritePage icon"></img>
            <button className="buttonOffice" id="button1" onClick={register}>
              User Management
            </button>
          </div>
          <div className="element2">
            <img className="Information" src="building-icon.png" alt="building icon"></img>
            <button className="buttonOffice" id="button2" onClick={buildingsManagement}>
              Buildings Management
            </button>
          </div>
          <div className="element2">
            <img className="Information" src="work-from-home.png" alt="remote work icon"></img>
            <button className="buttonOffice" id="button3" onClick={buildingsManagement}>
              Remote work requests
            </button>
          </div>
        </div>
        <div>
          <h3>Requests Works List</h3>
          <table className="tableUsers">
            <thead className="tableHeader">
              <tr>
                <th>Sender</th>
                <th>Reason</th>
                <th>Work percentage of a month</th>
                <th colspan="2">Action </th>
              </tr>
            </thead>
            <tbody>
              {items.map((reqs) => (
                <tr key={reqs._id}>
                  <td>{reqs.sender}</td>
                  <td>{reqs.reason}</td>
                  <td>{reqs.percent}</td>

                  <td>
                    <Link to={`/requests/${reqs._id}`}>Accept</Link>
                  </td>
                  <td>
                    <Link to={`/requests/delete/${reqs._id}`}>Decline</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="Account">
          <label id="account">{decodeJwt(token).email}</label>
          <img className="roundedImg" src="user.png" alt="UserIcon"></img>
          <button className="btnLogout" onClick={logOut}>
            Logout
          </button>
        </div>
      </body>
    );
  else {
    window.location.assign("http://localhost:3000/login");
  }
}
export default Administrator;
