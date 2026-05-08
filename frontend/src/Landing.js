import React from "react";

function Landing() {

  return (

    <div className="landing">

      <div className="card">

        <h1>Task Manager</h1>

        <p>
          Organize your daily tasks
          with secure login access
        </p>

        <div className="buttons">

          <a href="/login">

            <button>
              Login
            </button>

          </a>

          <a href="/register">

            <button className="register-btn">
              Register
            </button>

          </a>

        </div>

      </div>

    </div>
  );
}

export default Landing;