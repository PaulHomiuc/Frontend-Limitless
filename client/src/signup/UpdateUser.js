import "./UserEdit.css";

import React, {useState, useEffect} from "react";

import {useMatch, useNavigate} from "react-router-dom";
export const updateTodo = (todo, id) =>
  fetch(`http://localhost:4000/users/${id}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(todo),
  });

export const getTodo = (id) =>
  fetch(`http://localhost:4000/update/${id}`).then((res) => res.json());
export const UpdateUser = () => {
  const match = useMatch();
  const [todo, setTodo] = useState();
  const history = useNavigate();

  useEffect(() => {
    const fetchTodo = async () => {
      const todo = await getTodo(match.params.id);
      setTodo(todo);
    };
    fetchTodo();
  }, []);

  const onSubmit = async (data) => {
    await updateTodo(data, match.params.id);
    history.push("/");
  };

  return todo ? (
    <div className="container">
      <div className="mt-3">
        <h3>Edit Todo Item</h3>
        <button onClick={onSubmit()}>Save</button>
      </div>
    </div>
  ) : (
    <div>Loading...</div>
  );
};
