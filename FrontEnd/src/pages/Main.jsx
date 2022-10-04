import React from "react";
import { useMediaQuery } from "react-responsive";
import { Link } from "react-router-dom";
import BackGround from "../Components/BackGround";
import MainCarousel from "../Components/MainCarousel";
import Logo from "../assets/images/001.png";
import "./Main.css";

export default function Main() {
  const isPc = useMediaQuery({
    query: "(min-width:768px)",
  });

  return (
    <div id="webapp-containor">
      <div>{isPc ? <BackGround /> : null}</div>
      <div id="main">
        <div class="mb-5">
          <img style={{ height: 100 }} src={Logo} alt="로고" />
        </div>
        <div style={{ marginTop: 20 }}>
          <MainCarousel />
        </div>
        <div style={{ marginTop: 50 }}>
          <Link to="/login">
            <button
              id="greenbutton"
              style={{ width: 250, height: 50, borderRadius: 50 }}
            >
              시작하기
            </button>
          </Link>
          <br />
          <div class="d-flex justify-content-center" style={{ marginTop: 50 }}>
            <Link to="/signup">회원가입</Link>
          </div>
          <div class="mt-3 text-center">
            <Link to="/doc/">의사</Link>　||　
            <Link to="/ph/">약사</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
