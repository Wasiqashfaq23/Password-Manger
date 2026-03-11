import React from "react";
import "./Navbar.css";

const Navbar = ({setCurrPage}) => {
  return (
    <nav className="navbar">
      <div className="logo">Vaultly</div>
      <div className="nav-links">
        <a onClick={()=>setCurrPage("login")}>Login</a>
        <a onClick={()=>setCurrPage("signup")}>Sign Up</a>
      </div>
    </nav>
  );
};

export default Navbar;