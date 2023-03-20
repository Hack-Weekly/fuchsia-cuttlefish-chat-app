import React, { useState } from "react";
import Profile from "./Profile";

const NavBar = () => {
  return (
    <nav className="nav-bar">
      <img src="/logo192.png" width={50} alt="Logo" style={{ margin: 10 }} />
      <h1>Cuttlefish Club</h1>
      <Profile />
    </nav>
  );
};

export default NavBar;
