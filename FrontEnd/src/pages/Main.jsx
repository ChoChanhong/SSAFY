import React from "react";
import { useMediaQuery } from "react-responsive";
import { Link } from "react-router-dom";
import BackGround from "../Components/BackGround";
import MainCarousel from "../Components/MainCarousel";
import "./Main.css";
import Button from "react-bootstrap/Button";

export default function Main() {
  const isPc = useMediaQuery({
    query: "(min-width:768px)",
  });

  return (
    <div id="webapp-containor">
      <div>{isPc ? <BackGround /> : null}</div>
      <div id="main">
        <div>
          <img style={{ height: 150 }} src="img/001.png" alt="로고" />
        </div>
        <MainCarousel />
        <div class="mt-5">
          <Link to="/login">
            <Button
              variant="success"
              size="lg"
              disabled={false}
              link
              to="/login"
            >
              시작하기
            </Button>
          </Link>
          <br />
          <Link to="/signup">회원가입</Link>
          <div class="mt-3">
            <Link to="/doc/login">의사</Link>　||　
            <Link to="/ph/login">약사</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
