import { useState, useEffect, useDebugValue } from "react";

const useTitleInput = (initialValue) => {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    document.title = value;
  });

  // useDebugValue(value); // результат смотреть в react devtools
  useDebugValue(value.length > 0 ? "Full" : "Empty");

  return [value, setValue];
};

export { useTitleInput };
