import React from "react";
import { Link } from "react-router-dom";
import "./DocNavbar.css";
import IMG from "../assets/images/001.png";

export default function DocMainNav() {
  return (
    <div id="nav">
      <div>
        <img id="logoImg" src={IMG} alt="logo" />
      </div>
    </div>
  );
}
