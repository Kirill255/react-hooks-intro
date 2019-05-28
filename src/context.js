import React from "react";

const initialState = {
  // todos: [
  //   { id: 1, text: "Eat breakfast", complete: false },
  //   { id: 2, text: "Do laundry", complete: false },
  //   { id: 3, text: "Finish project", complete: true }
  // ],
  todos: [], // положили данные на https://hooks-api-mnikfepzx.now.sh/todos
  currentTodo: {}
};

const TodosContext = React.createContext(initialState);

export default TodosContext;
