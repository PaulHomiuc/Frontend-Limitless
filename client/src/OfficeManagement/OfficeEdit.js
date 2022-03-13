import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import "./OfficeEdit.css";
const getOffices = () => fetch("http://localhost:4000/api/offices").then((res) => res.json());

export default function OfficeEdit() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      const offices = await getOffices();
      setItems(offices);
    };
    fetchItems();
  }, []);
  return (
    <div className="AddBuilding">
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
              <th>Action</th>
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
