import React, { useState } from "react";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    const userData = {
      username,
      password
    };

    setUser(userData);
    setUsername("");
    setPassword("");
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Login form</h1>

      <form
        style={{
          display: "grid",
          alignItems: "center",
          justifyItems: "center"
        }}
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <button type="submit">Submit</button>

        {user && JSON.stringify(user, null, 2)}
      </form>
    </div>
  );
}

/*
С es6 мы не можем сразу экспортировать по дэфолту
только вот так:
const Login = () => {}; // объявили
export default Login; // экспортировали

С es5 можем
так запись получается кароче:
export default function Login() {}; // объявили и сразу экспортировали по дэфолту

// ну или вариант как и с es6
function Login() {}; // объявили
export default Login; // экспортировали
*/
