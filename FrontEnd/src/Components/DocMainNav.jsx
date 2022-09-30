import React from "react";
import { Link } from "react-router-dom";
import "./DocNavbar.css";
import LogoIMG from "../assets/images/001.png";

export default function DocMainNav() {
  const logo = {
    height: "100px",
    margin: "auto",
  };

  return (
    <div id="nav">
      <div>
        <img style={logo} src={LogoIMG} alt="로고" />
      </div>
    </div>
  );
}
