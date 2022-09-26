import { TextField } from "@mui/joy";
import React from "react";
import { useMediaQuery } from "react-responsive";
import { Link } from "react-router-dom";
import BackGround from "../../Components/BackGround";
import "./Button.css";

export default function Login() {
  const isPc = useMediaQuery({
    query: "(min-width:768px)",
  });

  return (
    <div id="webapp-containor">
      <div>{isPc ? <BackGround /> : null}</div>
      <div id="login">
        <div style={{ marginTop: 100 }}>
          <Link to="/">
            <img style={{ height: 180 }} src="img/003.png" alt="로고" />
          </Link>
        </div>
        <p class="fw-bold mt-3">일반사용자 로그인</p>
        <TextField placeholder="아이디를 입력해주세요."/>
        <TextField style={{ marginTop: 10 }} placeholder="비밀번호를 입력해주세요."/>
        <div class="d-flex justify-content-center">
          <button
            id="greenbutton"
            style={{ marginTop: 50, width: 300, height: 50 }}
          >
            로그인
          </button>
        </div>
        <div class="d-flex justify-content-center">
          <Link to="/signup">
            <button
              id="bluebutton"
              style={{ marginTop: 10, width: 300, height: 50 }}
            >
              회원가입
            </button>
          </Link>
        </div>
        <br />
        <div class="text-center mt-5">
          <span style={{ marginRight: 30 }}>아이디를 잊었다면?</span>
          <Link to="">아이디 찾기</Link>
        </div>
        <div class="mt-5 text-center">
          <Link to="/doc/login">의사</Link>
          <span>　/　</span>
          <Link to="/ph/login">약사</Link>
        </div>
      </div>
    </div>
  );
}
