import React, {useState, useEffect} from "react";
import {useParams, useNavigate} from "react-router-dom";

export default function DeleteRequest() {
  const match = useParams();
  const history = useNavigate();
  const [reason, setReason] = useState();
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

  useEffect(() => {
    const fetchReq = async () => {
      await deleteRequest(match);

      window.location.assign("http://localhost:3000/admin/");
    };
    fetchReq();
  }, []);
  return (
    <div>
      <textarea
        id="freetext"
        className="Reason"
        value={reason}
        onChange={(e) => setReason(e.target.value)}
      ></textarea>
    </div>
  );
}
