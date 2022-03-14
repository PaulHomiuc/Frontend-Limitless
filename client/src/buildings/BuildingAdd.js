import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';
import "../OfficeManagement/OfficeManagement.css"

function handleOnChange(){
    if (document.getElementById("floornumber").value <= 0) {
        document.getElementById("floornumber").value = 1;
      }
}
export default function BuildingAdd() {
    const  [buildingName, setName] = useState("");
    const  [floornumber, setCount] = useState("");
    const  [adress, setAddress] = useState("");
    const navigate=useNavigate();
    async function registerBuilding(event) {
        event.preventDefault();
        const response = await fetch("http://localhost:4000/api/building", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
           buildingName,
           floornumber,
           adress
          }),
        });
        const data = await response.json();
        console.log(data);
        if (data.status === "ok") navigate("/admin");
      }
  return (
    
    <body className="Office-wrapper">
        <div className="box1" id="Form1">
          <h1 className="headereg">Add a new Building</h1>
          <form className="formular">
            <label>
              <p>
                Building Name<b>*</b>
              </p>

              <input
                value={buildingName}
                id="bdname"
                type="text"
                placeholder="Building Name"
                required
                onChange={(e) => setName(e.target.value)}
                
              />
            </label>
            <label>
              <p>
                Floor Count
                <b>*</b>
              </p>
              <input
                id="floornumber"
                className="input"
                type="number"
                placeholder="floor number"
                value={floornumber}
                required
                onChange={(e) => setCount(e.target.value)}
                onInput={handleOnChange}
               
              />
            </label>
            <label>
              <p>
                Address<b>*</b>
              </p>
              <input
                value={adress}
                id="adr"
                type="text"
                placeholder="Address"
                required
                onChange={(e) => setAddress(e.target.value)}
              />
            </label>
            
            

            <div>
              <button type="submit" className="buttonOffice" onClick={registerBuilding} >
                Submit
              </button>
            </div>
          
          </form>
       </div>
      </body>
  )
}
