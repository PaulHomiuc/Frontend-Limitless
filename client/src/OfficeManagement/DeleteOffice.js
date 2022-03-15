import React, {useState, useEffect} from "react";
import {useParams, useNavigate} from "react-router-dom";

export default function DeleteOffice() {
  const match = useParams();
  const history = useNavigate();
  const deleteOffice = (id) => {
    fetch(`http://localhost:4000/deleteoffice/${id}`, {
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
      await deleteOffice(match);
      // alert("User deactivated successfully");
      window.location.assign("http://localhost:3000/officemanage/");
    };
    fetchUser();
  }, []);
  return <div>DeactivateUser</div>;
}
