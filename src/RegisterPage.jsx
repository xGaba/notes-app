import React, { useState } from "react";

function RegisterPage() {
  const [registered, serRegistered] = useState({
    email: "",
    password: "",
  });

  function handleRegist(event) {
    console.log(event.target.value);
  }

  function handleRegistSubmit(event) {
    event.preventDefault();

    // fetch
  }

  return (
    <div>
      {" "}
      <form className="register-form" onSubmit={handleRegistSubmit}>
        <h1>Register</h1>
        <p>Insert your email:</p>
        <input placeholder="email" name="email" onChange={handleRegist}></input>
        <p>Insert your password:</p>
        <input
          placeholder="password"
          name="password"
          onChange={handleRegist}
        ></input>
        <button type="submit">Go</button>{" "}
        <p>
          If you already have an account, please go to <a>Login</a> page.
        </p>
      </form>
    </div>
  );
}

export default RegisterPage;
