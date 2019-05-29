import React, { useMemo } from "react";

import Counter from "./Counter";

import { useTitleInput } from "./hooks/useTitleInput";

const App = () => {
  const [name, setName] = useTitleInput("");

  const reverseWord = (word) => {
    console.log("function run");
    return word
      .split("")
      .reverse()
      .join("");
  };

  const title = "Level Up Dishes";

  const TitleReversed = useMemo(() => reverseWord(title), [title]); // если [title] не изменился, то useMemo не будет повторно запускать reverseWord функцию

  return (
    <div className="main-wrapper">
      <h1>{TitleReversed}</h1>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      <h3>{name}</h3>

      <Counter />
    </div>
  );
};

export default App;
