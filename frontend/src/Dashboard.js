import React, {
  useState,
  useEffect
} from "react";

import Features from "./Features";

function Dashboard() {

  const user =
    JSON.parse(

      localStorage.getItem(
        "user"
      )

    );

  // DARK MODE
  const [darkMode,
    setDarkMode] =
    useState(

      localStorage.getItem(
        "theme"
      ) === "dark"

    );

  useEffect(() => {

    if (darkMode) {

      document.body.classList.add(
        "dark-mode"
      );

      localStorage.setItem(
        "theme",
        "dark"
      );

    } else {

      document.body.classList.remove(
        "dark-mode"
      );

      localStorage.setItem(
        "theme",
        "light"
      );

    }

  }, [darkMode]);


  // LOGOUT
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

      {/* NAVBAR */}

      <div

        style={{

          display: "flex",

          justifyContent:
            "space-between",

          alignItems: "center",

          padding: "22px 40px",

          background:
            "rgba(255,255,255,0.05)",

          backdropFilter:
            "blur(18px)",

          borderBottom:
            "1px solid rgba(255,255,255,0.08)",

          position: "sticky",

          top: 0,

          zIndex: 1000

        }}

      >

        {/* LEFT */}

        <div>

          <h2

            style={{

              margin: 0,

              fontSize: "30px",

              background:
                "linear-gradient(to right,#fff,#a5b4fc,#67e8f9)",

              WebkitBackgroundClip:
                "text",

              WebkitTextFillColor:
                "transparent"

            }}

          >

            NotesSphere

          </h2>

          <p

            style={{

              marginTop: "8px",

              color:
                "rgba(255,255,255,0.7)"

            }}

          >

            Welcome,
            {" "}
            {user?.name}

          </p>

        </div>


        {/* RIGHT */}

        <div

          style={{

            display: "flex",

            alignItems: "center",

            gap: "15px"

          }}

        >

          {/* ROLE */}

          <div

            style={{

              padding:
                "10px 18px",

              borderRadius: "20px",

              background:
                user?.role === "admin"

                ? "linear-gradient(to right,#f59e0b,#ef4444)"

                : "linear-gradient(to right,#6366f1,#06b6d4)",

              color: "white",

              fontWeight: "600",

              fontSize: "14px"

            }}

          >

            {user?.role}

          </div>


          {/* THEME TOGGLE */}

          <button

            onClick={() =>
              setDarkMode(
                !darkMode
              )
            }

            style={{

              border: "none",

              padding:
                "12px 18px",

              borderRadius: "15px",

              background:
                "rgba(255,255,255,0.08)",

              color: "white",

              cursor: "pointer",

              fontSize: "15px"

            }}

          >

            {darkMode
              ? "☀ Light"
              : "🌙 Dark"}

          </button>


          {/* LOGOUT */}

          <button

            onClick={logout}

            style={{

              padding:
                "12px 22px",

              border: "none",

              borderRadius: "15px",

              background:
                "linear-gradient(to right,#f43f5e,#ec4899)",

              color: "white",

              fontWeight: "600",

              cursor: "pointer",

              boxShadow:
                "0 10px 25px rgba(236,72,153,0.3)"

            }}

          >

            Logout

          </button>

        </div>

      </div>


      {/* ADMIN PANEL */}

      {user?.role === "admin" && (

        <div

          style={{

            margin:
              "35px auto",

            maxWidth: "1200px",

            background:
              "linear-gradient(145deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))",

            border:
              "1px solid rgba(255,255,255,0.08)",

            backdropFilter:
              "blur(18px)",

            padding: "30px",

            borderRadius: "28px",

            color: "white",

            boxShadow:
              "0 20px 40px rgba(0,0,0,0.3)"

          }}

        >

          <h2
            style={{
              marginTop: 0
            }}
          >

            Admin Control Center

          </h2>

          <p
            style={{
              color:
                "rgba(255,255,255,0.75)"
            }}
          >

            You can monitor
            all notes and
            moderate the
            platform.

          </p>

          <a

            href="/admin"

            style={{

              display:
                "inline-block",

              marginTop: "15px",

              padding:
                "14px 24px",

              borderRadius:
                "15px",

              textDecoration:
                "none",

              background:
                "linear-gradient(to right,#8b5cf6,#06b6d4)",

              color: "white",

              fontWeight: "600"

            }}

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