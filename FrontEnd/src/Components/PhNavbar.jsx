import React from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/images/002.png";
import "./PhNavbar.css";

export default function PhNavbar() {
  const logo = {
    height: "90px",
    width: "90px",
    display: "flex",
    marginTop: "auto",
    marginLeft: "20px",
  };

  return (
    <div id="phnav">
      <div style={{ display: "flex" }}>
        <img src={Logo} alt="로고" style={logo} />
        <div id="phmenu">
          <Link to="/ph/order" id="phtext">
            조제접수 조회
          </Link>
          <Link to="/ph/log" id="phtext">
            조제 이력
          </Link>
          <Link to="/ph/my" id="phtext">
            마이페이지
          </Link>
        </div>
      </div>
    </div>
  );
}
