import React, { useState } from "react";

import DishForm from "./DishForm";

const Toggle = () => {
  const [isToggled, setToggle] = useState(false);

  return (
    <div>
      {isToggled ? (
        <DishForm setToggle={setToggle} />
      ) : (
        <button onClick={() => setToggle(!isToggled)}>Open</button>
      )}
    </div>
  );
};

export default Toggle;
