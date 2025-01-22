import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function RegisterPage() {
  const navigate = useNavigate();
  const [registered, setRegistered] = useState({
    email: "",
    password: "",
  });

  function handleRegist(event) {
    const { name, value } = event.target;
    setRegistered((prevValue) => ({ ...prevValue, [name]: value }));
  }

  function handleRegistSubmit(event) {
    event.preventDefault();

    fetch("http://localhost:3000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(registered),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          navigate("/login")
        } else {
          console.log("Error during registration: ", data.message)
        }
      })
      .catch((error) => {
        console.log("Error at registration: ", error);
      });
  }

  return (
    <div>
      <form className="register-form" onSubmit={handleRegistSubmit}>
        <h1>Register</h1>
        <p>Insert your email:</p>
        <input
          placeholder="email"
          name="email"
          type="email"
          onChange={handleRegist}
          value={registered.email}
          required
        ></input>
        <p>Insert your password:</p>
        <input
          placeholder="password"
          name="password"
          type="password"
          onChange={handleRegist}
          value={registered.password}
          required
        ></input>
        <button type="submit">Go</button>{" "}
        <p>
          If you already have an account, please go to <a href="/login">Login</a> page.
        </p>
      </form>
    </div>
  );
}

export default RegisterPage;
