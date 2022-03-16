import React, {useState, useEffect} from "react";
import {useParams, useNavigate} from "react-router-dom";

export const getUser = (id) => fetch(`http://localhost:4000/users/${id}`).then((res) => res.json());
export const getRequest = (id) =>
  fetch(`http://localhost:4000/requests/${id}`).then((res) => res.json());

export default function RequestAccept() {
  const [percent, setPercent] = useState();
  const match = useParams();
  const [id, setId] = useState("");
  const updateUser = (id) => {
    fetch(`http://localhost:4000/updatepercent/${id}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        percent,
      }),
    });
  };
  async function submit() {
    await updateUser(id);
    window.location.assign("/admin");
  }

  useEffect(() => {
    const fetchReq = async () => {
      const request = await getRequest(match.id);
      console.log(request);
      setPercent(request.percent);

      setId(request.id);
      console.log(id);
    };

    fetchReq();
    submit();
  }, []);

  return <div>RequestAccept</div>;
}
