import React from "react";
import { Link } from "react-router-dom";
import "./PhNavbar.css";
import Logo from "../assets/images/001.png";

export default function PhMainNav() {
  return (
    <div id="phnav" style={{}}>
      <div>
        <img style={{ height: 100 }} src={Logo} alt="로고" />
      </div>
    </div>
  );
}
