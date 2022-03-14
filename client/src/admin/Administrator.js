import "./Administrator.css";
import {decodeJwt} from "jose";

function logOut() {
  localStorage.clear();
  window.location.assign("http://localhost:3000/login");
}

function register() {
  window.location.assign("http://localhost:3000/users");
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

  if (token === null) {
    window.location.assign("http://localhost:3000/login");
  } else {
  }
  if (user.role === "admin")
    return (
      <body>
        <div className="Dashboard">
          <label className="lblAdmin">You are logged in as Administrator</label>
          <div className="element1">
            <img className="Information" src="/deskIcon.png" alt="user profile"></img>
            <button className="buttonOffice" onClick={officeManagement}>
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
            <button className="buttonOffice" id="button1" onClick={buildingsManagement}>
              Buildings Management
            </button>
          </div>
        </div>
        <div className="Account">
          <label id="account">{decodeJwt(token).email}</label>
          <img className="roundedImg" src="user.png" alt="UserIcon"></img>
          <button className="buttonOffice" onClick={logOut}>
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
