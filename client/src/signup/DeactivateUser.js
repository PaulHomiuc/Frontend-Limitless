import React, {useState, useEffect} from "react";
import {useParams, useNavigate} from "react-router-dom";

export default function DeactivateUser() {
  const match = useParams();
  const history = useNavigate();
  const deactivateUser = (id) => {
    fetch(`http://localhost:4000/deactivate/${id}`, {
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
    const fetchUser = async () => {
      await deactivateUser(match);
      // alert("User deactivated successfully");
      window.location.assign("http://localhost:3000/users/edit");
    };
    fetchUser();
  }, []);
  return <div>DeactivateUser</div>;
}
