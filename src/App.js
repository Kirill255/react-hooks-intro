import React, { useState, useEffect } from "react";

const App = () => {
  const [name, setName] = useState("");

  useEffect(() => {
    document.title = name;
  });

  return (
    <div className="main-wrapper">
      <h1>Level Up Dishes</h1>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      <h3>{name}</h3>
    </div>
  );
};

export default App;
