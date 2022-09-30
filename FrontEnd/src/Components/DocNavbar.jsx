import React from "react";
import { Link } from "react-router-dom";
import "./DocNavbar.css";
import Logo from "../assets/images/002.png";

export default function DocNavbar() {
  const logo = {
    height: "90px",
    width: "90px",
    display: "flex",
    marginTop: "auto",
    marginLeft: "20px",
  };

  return (
    <div id="nav">
      <div style={{ display: "flex" }}>
        <img src={Logo} alt="로고" style={logo} />
        <div id="menu">
          <Link to="/doc/generate" id="text">
            처방전 생성
          </Link>
          <Link to="/doc/log" id="text">
            처방전 조회
          </Link>
          <Link to="/doc/my" id="text">
            마이페이지
          </Link>
        </div>
      </div>
    </div>
  );
}
