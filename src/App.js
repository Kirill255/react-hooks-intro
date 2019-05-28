import React, { useState, useEffect, useContext, useReducer } from "react";
import axios from "axios";

import TodoList from "./components/TodoList";
import TodoForm from "./components/TodoForm";

import TodosContext from "./context";
import TodosReducer from "./reducer";

const useAPI = (endpoint) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const response = await axios.get(endpoint);
      setData(response.data);
    };
    getData();
  }, [endpoint]);

  return data;
};

const App = () => {
  const initialState = useContext(TodosContext);
  const [state, dispatch] = useReducer(TodosReducer, initialState);
  const savedTodos = useAPI("https://hooks-api-mnikfepzx.now.sh/todos");

  useEffect(() => {
    dispatch({ type: "GET_TODOS", payload: savedTodos });
  }, [savedTodos]);

  return (
    <TodosContext.Provider value={{ state, dispatch }}>
      <TodoForm />
      <TodoList />
    </TodosContext.Provider>
  );
};

export default App;
