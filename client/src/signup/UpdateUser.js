import "./UserEdit.css";
import Register from "./Register.js";
import React, {useState, useEffect} from "react";

import {useParams, useNavigate} from "react-router-dom";

const regEx = /[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,8}(.[a-z{2,8}])?/g;
export const getUser = (id) => fetch(`http://localhost:4000/users/${id}`).then((res) => res.json());
export const UpdateUser = () => {
  const match = useParams();
  const [user, setUser] = useState("");
  const history = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [role, setRole] = useState("");
  const [gender, setGender] = useState("");
  const [date, setDate] = useState("");
  const [national, setNational] = useState("");
  const updateUser = (id) => {
    fetch(`http://localhost:4000/update/${id}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fname,
        lname,
        email,
        password,
        role,
        gender,
        date,
        national,
        id,
      }),
    });
  };
  useEffect(() => {
    const fetchTodo = async () => {
      const user = await getUser(match.id);
      setUser(user);
      setEmail(user.email);
      setFname(user.firstName);
      setLname(user.lastName);
      setPassword(user.password);
      setRole(user.role);
      setGender(user.gender);
      setDate(user.birthDate);
      setNational(user.nationality);

      const datetime = user.birthDate;

      var str = datetime.substring(0, 10);
      setDate(str);
      document.getElementById("date").value = str;
    };
    fetchTodo();
  }, []);

  async function onSubmit(d) {
    await updateUser(match);
    alert("User edited successfully");
    
    window.location.assign("http://localhost:3000/users/edit");
  }

  return user ? (
    <div className="container">
      <div className="mt-3">
       
        <div className="Register">
          <h1 className="headereg">Edit user</h1>
          <form className="formular">
            <label>
              <p>
                First Name<b>*</b>
              </p>

              <input
                defaultValue={fname}
                id="fname"
                type="text"
                placeholder="First Name"
                required
                onChange={(e) => setFname(e.target.value)}
              />
            </label>
            <label>
              <p>
                Last Name<b>*</b>
              </p>
              <input
                defaultValue={lname}
                id="lname"
                type="text"
                placeholder="Last Name"
                required
                onChange={(e) => setLname(e.target.value)}
              />
            </label>
            <label>
              <p>
                E-mail address
                <b>*</b>
              </p>
              <input
                id="email"
                className="input"
                type="email"
                placeholder="email"
                defaultValue={email}
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
            <label>
              <p>
                Password<b>*</b>
              </p>
              <input
                id="password"
                type="password"
                placeholder="password"
                required
                isPassword
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
            <label>
              <p>
                Role<b>*</b>
              </p>
              <select
                name="role"
                id="roles"
                required
                placeholder="admin"
                defaultValue={role}
                onChange={(e) => setRole(e.target.value)}
              >
                {" "}
                <option selected disabled>
                  Choose role...
                </option>
                <option value="admin">Administrator</option>
                <option value="officeadmin">Office Administrator</option>
                <option value="employee">Employee</option>
              </select>
            </label>
            <label>
              <p>
                Gender<b>*</b>
              </p>
              <select
                name="gender"
                id="genders"
                required
                placeholder="Male"
                defaultValue={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                {" "}
                <option selected disabled>
                  Choose gender...
                </option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </label>

            <label>
              <p>Date of birth</p>
              <input type="date" name="date" id="date" onChange={(e) => setDate(e.target.value)} />
            </label>
            <label>
              <p>Nationality</p>
              <input
                type="text"
                placeholder="Nationality"
                id="nationality"
                name="nationality"
                value={national}
                onChange={(e) => setNational(e.target.value)}
              />
            </label>

            <div>
              <button className="buttonOffice" type="submit" onClick={onSubmit}>
                Save
              </button>
            </div>
          </form>
        </div>

        {/* <button onClick={onSubmit()}>Save</button> */}
      </div>
    </div>
  ) : (
    <div>Loading...</div>
  );
};
