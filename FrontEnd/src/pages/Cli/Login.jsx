import React from "react";
import { useMediaQuery } from "react-responsive";
import { Link } from "react-router-dom";
import BackGround from "../../Components/BackGround";
import { Button } from "react-bootstrap";

export default function Login() {
  const isPc = useMediaQuery({
    query: "(min-width:768px)",
  });

  return (
    <div id="webapp-containor">
      <div>{isPc ? <BackGround /> : null}</div>
      <div id="login">
        <div>
          <Link to="/">
            <img style={{ height: 200 }} src="img/001.png" alt="로고" />
          </Link>
        </div>
        <div>일반사용자 로그인</div>
        <input placeholder="아이디를 입력해주세요." />
        <input placeholder="비밀번호를 입력해주세요." />
        <Button id="button" variant="success" size="lg" disabled={false}>
          로그인
        </Button>
        <br />
        <Link to="/signup">
          <Button id="button" variant="primary" size="lg" disabled={false}>
            회원가입
          </Button>
        </Link>
        <br />
        <div>
          <span>아이디를 잊었다면?</span>
          <Link to="">아이디 찾기</Link>
        </div>
        <div class="mt-5 text-center">
          <Link to="/doc/login">의사</Link>
          <span>//</span>
          <Link to="/ph/login">약사</Link>
        </div>
      </div>
    </div>
  );
}
