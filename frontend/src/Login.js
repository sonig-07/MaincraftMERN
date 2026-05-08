import React, { useState } from "react";

function Login() {

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const handleLogin = async () => {

    try {

      const res = await fetch(

        "http://localhost:5000/login",

        {

          method: "POST",

          headers: {

            "Content-Type":
              "application/json"

          },

          body: JSON.stringify({

            email,
            password

          })

        }
      );

      const data = await res.json();

      if (data.token) {

        localStorage.setItem(
          "token",
          data.token
        );

        window.location.href =
          "/dashboard";

      } else {

        alert(
          data.message ||
          "Login Failed"
        );

      }

    } catch (err) {

      console.log(err);

      alert("Server Error");

    }
  };

  return (

    <div className="landing">

      <div className="card">

        <h1>Login</h1>

        <input
          placeholder="Email"
          onChange={(e)=>
            setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e)=>
            setPassword(e.target.value)}
        />

        <button onClick={handleLogin}>
          Login
        </button>

        <p>
          Don't have an account?
          <a href="/register">
            {" "}Register
          </a>
        </p>

      </div>

    </div>

  );
}

export default Login;