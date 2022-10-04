import { borderLeft } from "@mui/system";
import { React, useState } from "react";
import { Link } from "react-router-dom";
import "./PhSignup.css";

export default function Signup3() {
  return (
    <div className="signBox" style={{ textAlign: "center", marginTop: 150 }}>
      <p className="successTitle">가입이 완료 되었습니다</p>
      <p className="subTitle">약쏙을 시작해 보세요</p>
      <div style={{ marginTop: 80 }}>
        <Link to="/doc/login">
          <button className="loginbutton">로그인</button>
        </Link>
      </div>
      <div style={{ marginTop: 40 }}>
        <Link to="/ph/serviceinfo">
          <button className="guidebutton">약사 가이드</button>
        </Link>
      </div>
    </div>
  );
}
