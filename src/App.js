import React from "react";

import Counter from "./Counter";

import { useTitleInput } from "./hooks/useTitleInput";

const App = () => {
  const [name, setName] = useTitleInput("");

  return (
    <div className="main-wrapper">
      <h1>Level Up Dishes</h1>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      <h3>{name}</h3>

      <Counter />
    </div>
  );
};

export default App;
