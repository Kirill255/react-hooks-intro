import React, { useContext, useReducer } from "react";

import TodoList from "./components/TodoList";
import TodoForm from "./components/TodoForm";

import TodosContext from "./context";
import TodosReducer from "./reducer";

const App = () => {
  const initialState = useContext(TodosContext);
  const [state, dispatch] = useReducer(TodosReducer, initialState);

  return (
    <TodosContext.Provider value={{ state, dispatch }}>
      <TodoForm />
      <TodoList />
    </TodosContext.Provider>
  );
};

export default App;
