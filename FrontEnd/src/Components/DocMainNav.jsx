import React from "react";
import { Link } from "react-router-dom";
import LogoIMG from "../assets/images/001.png";
import "./DocNavbar.css";

export default function DocMainNav() {
  const logo = {
    height: "100px",
    margin: "auto",
  };

  return (
    <div id="docnav">
      <div>
        <img style={logo} src={LogoIMG} alt="로고" />
      </div>
    </div>
  );
}
