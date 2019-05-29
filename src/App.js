import React, { useState, useEffect, useMemo } from "react";

import Counter from "./Counter";

import { useTitleInput } from "./hooks/useTitleInput";

const App = () => {
  const [name, setName] = useTitleInput("");
  const [dishes, setDishes] = useState([]);

  const fetchDishes = async () => {
    const res = await fetch("https://my-json-server.typicode.com/leveluptuts/fakeapi/dishes");
    const data = await res.json();
    setDishes(data);
  };

  useEffect(() => {
    fetchDishes();
  }, []);

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

      <div>
        {dishes.map((dish, i) => (
          <article key={i} className="dish-card dish-card--withImage">
            <h3>{dish.name}</h3>
            <p>{dish.desc}</p>
            <div className="ingredients">
              {dish.ingredients.map((ingredient, ind) => (
                <span key={ind}>{ingredient}</span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default App;
