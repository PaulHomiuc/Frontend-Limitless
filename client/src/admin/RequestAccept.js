import React, {useState, useEffect} from "react";
import {useParams, useNavigate} from "react-router-dom";

export const getUser = (id) => fetch(`http://localhost:4000/users/${id}`).then((res) => res.json());
export const getRequest = (id) =>
  fetch(`http://localhost:4000/requests/${id}`).then((res) => res.json());
const deleteRequest = (id) => {
    fetch(`http://localhost:4000/deleterequest/${id}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
      }),
    });
  };

export default function RequestAccept() {
  const [percent, setPercent] = useState();
  const match = useParams();
 // const [id, setId] = useState("");
 const [id,setId]=useState();
  const [requestid,setReq]=useState();
  const updateUser = (id) => {
    fetch(`http://localhost:4000/updatepercent/`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        percent,
        id,
      }),
    });
  };
  async function submit() {
    for(var i=0;i<=2;i++)
    await updateUser(id);
   await deleteRequest(match);
   window.location.assign("/admin");
  }

  useEffect(() => {
    const fetchReq = async () => {
      const request = await getRequest(match.id);
      console.log(request);
      setPercent(request.percent);
      setReq(match.id);
      setId(request.userId);
      console.log(id);
    };

    fetchReq();
    
  }, []);
    //return <div>request</div>;
   return <div className="Confirm"><button onClick={submit} className="buttonOffice">Confirm</button></div>;
}
