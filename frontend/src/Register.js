import React, { useState } from "react";

function Register() {

  const [name, setName] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const handleRegister = async () => {

    try {

      const res = await fetch(
        "http://localhost:5000/register",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify({
            name,
            email,
            password
          })
        }
      );

      const data = await res.json();

      alert(data.message);

      window.location.href = "/login";

    } catch (err) {

      console.log(err);

      alert("Server Error");

    }
  };

  return (

    <div className="landing">

      <div className="card">

        <h1>Register</h1>

        <input
          placeholder="Name"
          onChange={(e) =>
            setName(e.target.value)
          }
        />

        <input
          placeholder="Email"
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        <button onClick={handleRegister}>
          Register
        </button>

        <p>
          Already have an account?
          <a href="/login"> Login</a>
        </p>

      </div>

    </div>

  );
}

export default Register;