import "./OfficeEdit.css";
import React, {useState, useEffect} from "react";

import {useParams, useNavigate} from "react-router-dom";
const getBuildings = () => fetch("http://localhost:4000/api/buildinget").then((res) => res.json());
const getOffice = (id) => fetch(`http://localhost:4000/getoffice/${id}`).then((res) => res.json());
export const UpdateOffice = () => {
  const [items, setItems] = useState([]);
  const match = useParams();
  const [office, setOffice] = useState("");
  const history = useNavigate();

  const [officename, setName] = useState("");
  const [building, setBuilding] = useState("");
  const [floorNumber, setNumber] = useState("");
  const [totaldesks, setTotal] = useState("");
  const [usabledesks, setUsable] = useState("");
  const [officeadmin, setAdmin] = useState("");

  const updateOffice = (id) => {
    fetch(`http://localhost:4000/updateoffice/${id}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        officename,
        building,
        floorNumber,
        totaldesks,
        usabledesks,
        officeadmin,
        id,
      }),
    });
  };
  useEffect(() => {
    const fetchOffice = async () => {
      const office = await getOffice(match.id);
      const buildings = await getBuildings();
      setItems(buildings);
      setOffice(office);
      setName(office.officeName);
      setBuilding(office.building);
      setNumber(office.floorNumber);
      setTotal(office.totalDesks);
      setUsable(office.usableDesks);
      setAdmin(office.officeadmin);
    };
    fetchOffice();
  }, []);

  async function onSubmit(d) {
    await updateOffice(match);
    alert("Office edited successfully");

    window.location.assign("http://localhost:3000/officemanage");
  }
  function onUsable() {
    if (document.getElementById("usable").value >= document.getElementById("totaldesks").value)
      setUsable(totaldesks);
  }
  return office ? (
    <body className="Office-wrapper">
      <div className="box1" id="Form1">
        <h1 className="headereg">Edit office {officename}</h1>
        <form className="formular">
          <label>
            <p>
              Office Name<b>*</b>
            </p>

            <input
              value={officename}
              id="offname"
              type="text"
              placeholder="Office Name"
              required
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <label>
            <p>
              Building<b>*</b>
            </p>
            <select
              className="Building-Select"
              onChange={(e) => setBuilding(e.target.value)}
              value={building}
            >
              <option disabled selected>
                Chose a building
              </option>
              {items.map((bld) => (
                <option className="Building-Selected">{bld.buildingName}</option>
              ))}
            </select>
          </label>
          <label>
            <p>
              Floor Number
              <b>*</b>
            </p>
            <input
              id="floornumber"
              className="input"
              type="number"
              min="0"
              placeholder="floor number"
              value={floorNumber}
              required
              onChange={(e) => setNumber(e.target.value)}
            />
          </label>
          <label>
            <p>
              Total Desks<b>*</b>
            </p>
            <input
              id="totaldesks"
              type="number"
              placeholder="Total Desks"
              required
              min={usabledesks}
              value={totaldesks}
              onChange={(e) => setTotal(e.target.value)}
            />
          </label>
          <label>
            <p>
              Usable Desks<b>*</b>
            </p>
            <input
              type="number"
              name="usable"
              id="usable"
              required
              outlined
              placeholder="Usable Desks"
              value={usabledesks}
              min="0"
              onChange={(e) => setUsable(e.target.value)}
              onInput={onUsable}
            />
          </label>
          <label>
            <p>Office Administrator (email)</p>
            <input
              type="email"
              name="offadm"
              id="offadm"
              value={officeadmin}
              placeholder="Office Admin"
              onChange={(e) => setAdmin(e.target.value)}
            />
          </label>

          <div>
            <button type="submit" className="buttonOffice" onClick={onSubmit}>
              Submit
            </button>
          </div>
        </form>
      </div>
    </body>
  ) : (
    <div>Loading...</div>
  );
};
