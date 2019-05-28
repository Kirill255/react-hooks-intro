import React, { useState, useEffect, useContext } from "react";
import uuidv4 from "uuid/v4";
import axios from "axios";

import TodosContext from "../context";

export default function TodoForm() {
  const [text, setText] = useState("");
  const {
    state: { currentTodo = {} },
    dispatch
  } = useContext(TodosContext);

  useEffect(() => {
    if (currentTodo.text) {
      setText(currentTodo.text);
    } else {
      setText("");
    }
  }, [currentTodo.id, currentTodo.text]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!text) return;

    if (currentTodo.text) {
      const response = await axios.patch(
        `https://hooks-api-mnikfepzx.now.sh/todos/${currentTodo.id}`,
        {
          text
        }
      );
      dispatch({ type: "UPDATE_TODO", payload: response.data });
    } else {
      const newTodo = { id: uuidv4(), text, complete: false };
      // const response = await axios.post("https://hooks-api-mnikfepzx.now.sh/todos", newTodo);
      // dispatch({ type: "ADD_TODO", payload: response.data }); // по идее можно передать и `payload: newTodo`
      await axios.post("https://hooks-api-mnikfepzx.now.sh/todos", newTodo);
      dispatch({ type: "ADD_TODO", payload: newTodo });
    }

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
