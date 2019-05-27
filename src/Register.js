import React, { useState } from "react";

const initialState = {
  username: "",
  email: "",
  password: ""
};

export default function Register() {
  const [form, setForm] = useState(initialState);
  const [user, setUser] = useState(null);

  const handleChange = (e) => {
    setForm((prevForm) => ({
      ...prevForm, // нужно распаковать все поля формы и потом заменить, то которое сейчас изменяется, тоесть меняем только часть стейта, а не весь, в class-component можно просто указать нужное поле и реакт автоматически изменит в стейте только это поле, с хуками нет! хотя в class-component вложенные объекты тоже нужно распаковывать
      [e.target.name]: e.target.value // т.к. в один момент времени у нас изменяется только одно поле
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setUser(form);
    setForm(initialState);
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Register form</h1>

      <form
        style={{
          display: "grid",
          alignItems: "center",
          justifyItems: "center"
        }}
        className="mb-2"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          className="border p-1 rounded"
          placeholder="Username"
          name="username"
          onChange={handleChange}
          value={form.username}
        />
        <input
          type="email"
          className="border p-1 rounded"
          placeholder="Email address"
          name="email"
          onChange={handleChange}
          value={form.email}
        />
        <input
          type="password"
          className="border p-1 rounded"
          placeholder="Password"
          name="password"
          onChange={handleChange}
          value={form.password}
        />
        <button type="submit" className="bg-orange rounded m-1 p-1">
          Submit
        </button>
      </form>

      {user && JSON.stringify(user, null, 2)}
    </div>
  );
}
