import React, { useState } from "react";

const App = () => {
  const [count, setCount] = useState(0);
  const [isOn, setIsOn] = useState(false);

  // const incrementCount = () => setCount(count + 1); // можно так
  const incrementCount = () => setCount((prevCount) => prevCount + 1);
  const toggleLight = () => setIsOn((prevIsOn) => !prevIsOn);

  return (
    <>
      <h1>React Hooks intro</h1>
      {/* useState */}

      <h3>Counter</h3>
      <button onClick={incrementCount}>I was clicked {count} times</button>

      <h3>Toggle Light</h3>
      <div style={{ display: "flex" }}>
        <img
          src={isOn ? "https://icon.now.sh/highlight/fd0" : "https://icon.now.sh/highlight/aaa"}
          style={{
            height: "50px",
            width: "50px"
          }}
          alt="Flashlight"
          onClick={toggleLight}
        />

        <div
          style={{
            height: "50px",
            width: "50px",
            background: isOn ? "yellow" : "grey"
          }}
          onClick={toggleLight}
        />
      </div>
    </>
  );
};

export default App;

/*
лампочка может тупить, так как делаются запросы на now.sh, лучше просто расположить иконки локально (это просто пример)
*/
