import React, { useMemo } from "react";
import useAbortableFetch from "use-abortable-fetch";
import { useSpring, animated } from "react-spring";

import Counter from "./Counter";
import Toggle from "./Toggle";

import { useTitleInput } from "./hooks/useTitleInput";

const App = () => {
  const [name, setName] = useTitleInput("");
  const { data, loading, error, abort } = useAbortableFetch(
    "https://my-json-server.typicode.com/leveluptuts/fakeapi/dishes"
  );

  // const props = useSpring({ opacity: 1, from: { opacity: 0 } }); // base
  const props = useSpring({ opacity: 1, from: { opacity: 0 }, delay: 1000 }); // https://www.react-spring.io/docs/hooks/api
  // console.log(props);

  const reverseWord = (word) => {
    console.log("function run");
    return word
      .split("")
      .reverse()
      .join("");
  };

  const title = "Level Up Dishes";

  const TitleReversed = useMemo(() => reverseWord(title), [title]); // если [title] не изменился, то useMemo не будет повторно запускать reverseWord функцию

  // if (loading) return <div>Loading...</div>;
  if (loading)
    return (
      <div>
        Loading... <button onClick={abort}>Cancel</button>
      </div>
    );
  if (error) return <div>Error: {error.message}</div>;
  // if (!data) return null;
  // console.log(data);

  return (
    <div className="main-wrapper">
      <animated.h1 style={props}>{TitleReversed}</animated.h1>

      <Toggle />

      <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      <h3>{name}</h3>

      <Counter />

      <div>
        {data &&
          data.map((dish, i) => (
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
