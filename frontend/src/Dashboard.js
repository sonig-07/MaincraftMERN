import React from "react";

import Features from "./Features";

function Dashboard() {

  const logout = () => {

    localStorage.removeItem("token");

    window.location.href = "/login";
  };

  return (

    <div>

      <div style={{ padding: "20px" }}>

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
      <Features />

    </div>
  );
}

export default Dashboard;