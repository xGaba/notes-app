import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({ email: "", password: "" });

  function handleLogin(event) {
    const { name, value } = event.target;
    setLoginData((prevValues) => {
      return { ...prevValues, [name]: value };
    });
  }

  function handleLoginSubmit(event) {
    event.preventDefault();
    fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to log");
        } else {
          navigate("/notes");
        }
      })
      .then((data) => {
        console.log("Log succesful", data);
      })
      .catch((error) => {
        console.log("Error logging", error);
      });
  }
  return (
    <div>
      <form className="login-form" onSubmit={handleLoginSubmit}>
        <h1>Login</h1>
        <p>Insert your email:</p>
        <input
          placeholder="email"
          name="email"
          type="email"
          onChange={handleLogin}
          value={loginData.email}
          required
        ></input>
        <p>Insert your password:</p>
        <input
          placeholder="password"
          name="password"
          type="password"
          onChange={handleLogin}
          value={loginData.password}
          required
        ></input>
        <button type="submit">Go</button>{" "}
      </form>
    </div>
  );
}

export default LoginPage;
