import React from "react";

import Features from "./Features";

function Dashboard() {

  const user =
    JSON.parse(

      localStorage.getItem(
        "user"
      )

    );

  const logout = () => {

    localStorage.removeItem(
      "token"
    );

    localStorage.removeItem(
      "user"
    );

    window.location.href =
      "/login";
  };

  return (

    <div>

      {/* TOP BAR */}

      <div
        style={{

          padding: "20px",

          display: "flex",

          justifyContent:
            "space-between",

          alignItems: "center",

          background: "#243b55",

          color: "white"

        }}
      >

        <div>

          <h2>

            Welcome,
            {" "}
            {user?.name}

          </h2>

          <p>

            Role:
            {" "}
            {user?.role}

          </p>

        </div>

        <button

          onClick={logout}

          style={{

            padding: "10px 20px",

            border: "none",

            borderRadius: "8px",

            background: "#ff4d4d",

            color: "white",

            cursor: "pointer"

          }}

        >

          Logout

        </button>

      </div>


      {/* ADMIN PANEL */}

      {user?.role === "admin" && (

        <div

          style={{

            background: "#ffe9a7",

            padding: "15px",

            margin: "20px",

            borderRadius: "10px"

          }}

        >

          <h3>

            Admin Panel

          </h3>

          <p>

            You have access
            to admin routes.

          </p>

          <a

            href="/admin"
                
            target="_blank"

            rel="noreferrer"

          >

            View All Notes

          </a>

        </div>

      )}


      {/* NOTES */}

      <Features />

    </div>

  );
}

export default Dashboard;