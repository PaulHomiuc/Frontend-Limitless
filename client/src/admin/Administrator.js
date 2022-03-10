import "./Administrator.css";
import {decodeJwt} from "jose";

function logOut() {
  localStorage.clear();
  window.location.replace("http://localhost:3000/login");
}
function register() {
  window.location.replace("http://localhost:3000/register");
}
function Administrator() {
  const token = localStorage.getItem("token");
  console.log(token);
  const user = decodeJwt(token);

  if (token === null) {
    window.location.replace("http://localhost:3000/login");
  } else {
  }
  if (user.role === "admin")
    return (
      <body>
        <div className="Dashboard">
          <label>You are logged in as Administrator</label>
          <div className="element1">
            <img className="Information" src="/Information.png" alt="user profile"></img>
            <button className="buttonMenu">Account information</button>
          </div>
          <div className="element2">
            <img className="Information" src="writePage.png"></img>
            <button className="buttonMenu" id="button1" onClick={register}>
              Add user
            </button>
          </div>
        </div>
        <div className="Account">
          <label id="account">{decodeJwt(token).email}</label>
          <img className="roundedImg" src="user.png" alt="UserIcon"></img>
          <button className="btn" onClick={logOut}>
            Logout
          </button>
        </div>
      </body>
    );
  else {
    window.location.replace("http://localhost:3000/login");
  }
}
export default Administrator;
