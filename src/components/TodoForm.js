import React, { useState, useContext } from "react";
import uuidv4 from "uuid/v4";

import TodosContext from "../context";

export default function TodoForm() {
  const [text, setText] = useState("");
  const { dispatch } = useContext(TodosContext);

  const handleSubmit = (event) => {
    event.preventDefault();
    const newTodo = { id: uuidv4(), text, complete: false };
    dispatch({ type: "ADD_TODO", payload: newTodo });

    setText("");
  };

  return (
    <>
      <form className="flex justify-center p-5" onSubmit={handleSubmit}>
        <input
          type="text"
          className="border-black border-solid border-2"
          onChange={(event) => setText(event.target.value)}
          value={text}
        />
      </form>
    </>
  );
}
