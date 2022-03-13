import "./OfficeAdmin.css";
import {decodeJwt} from "jose";

function logOut() {
  localStorage.clear();
  window.location.assign("/login");
}

function register() {
  window.location.assign("/users");
}
function officeManagement() {
  window.location.assign("/officemanage");
}

function OfficeAdmin() {
  const token = localStorage.getItem("token");
  console.log(token);
  const user = decodeJwt(token);

  if (token === null) {
    window.location.assign("/login");
  } else {
  }
  if (user.role === "officeadmin")
    return (
      <body>
        <div className="DeskOffice">
          <h1 className="DeskOffice">Desk assignment</h1>
          <table1>
            <tr>
              <th>Firstname</th>
              <th>Lastname</th>
              <th>Position</th>
            </tr>
            <tr>
              <td>Peter</td>
              <td>Griffin</td>
              <td>Office01</td>
            </tr>
            <tr>
              <td>Lois</td>
              <td>Griffin</td>
              <td>Office02</td>
            </tr>
          </table1>
        </div>
        <div className="DashboardOffice">
          <label>You are logged in as Office Administrator</label>
          <div className="element1Office">
            <img className="InformationOffice" src="/deskIcon.png" alt="user profile"></img>
            <button className="buttonMenuOffice" onClick={officeManagement}>
              Office Management
            </button>
          </div>
          <div className="element2Office">
            <img className="InformationOffice" src="writePage.png" alt="user profile"></img>
            <button className="buttonMenuOffice" id="button1" onClick={register}>
              Add user
            </button>
          </div>
          <div className="element3Office">
            <img className="InformationOffice" src="/status-office.png" alt="user profile"></img>
            <button className="buttonMenuOffice" onClick={officeManagement}>
              Office Status
            </button>
          </div>
        </div>

        <div className="AccountOffice">
          <label id="account">{decodeJwt(token).email}</label>
          <img className="roundedImgOffice" src="user.png" alt="UserIcon"></img>
          <button className="btnOffice" onClick={logOut}>
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
