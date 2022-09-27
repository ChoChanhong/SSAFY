import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { injected } from "../lib/Connectors";
import { useWeb3React } from "@web3-react/core";
import { useNavigate } from "react-router-dom";
import { TextField, FormLabel} from "@mui/joy";

import "./LoginForm.css";

export default function LoginForm() {
  const navigate = useNavigate();
  const { account, active, error, activate, deactivate } = useWeb3React();

  const [id, setId] = useState("");
  const [password, setPass] = useState("");

  function IdChange(e) {
    setId(e.target.value);
  }
  function PasswordChange(e) {
    setPass(e.target.value);
  }

  function Send() {
    console.log(id, password);
    //api 통해서 로그인 보내고 아이디 일치시
    activate(injected);
    navigate("/doc");
  }

  return (
    <div id="loginbox">
      <div class="login">
        <h1 class="title">병원로그인</h1>
        <span style={{ fontSize: 15, marginTop: 10 }}>
          약쏙(전자처방전)을 이용하기 위해서는 회원가입이 필요합니다
        </span>
        <div style={{ marginTop: 30 }}>
          <FormLabel className="label">아이디</FormLabel>
          <TextField
            class="a"
            className="logInput"
            placeholder="아이디를 입력해주세요."
            onChange={IdChange}
          />
          <FormLabel className="label">비밀번호</FormLabel>
          <TextField
            class="a"
            type="password"
            placeholder="비밀번호를 입력해주세요."
            onChange={PasswordChange}
          />
        </div>
        <button onClick={Send} id="loginbutton">
          로그인
        </button>
        <Link to="/" class="link">
          아이디/비밀번호 찾기
        </Link>
      </div>
      <div class="info">
        <img class="logo" />
        <div class="buttonbox">
          <Link to="/doc/signup" class="linkbutton">
            회원가입
          </Link>
          <Link to="/" class="linkbutton">
            의사가이드
          </Link>
        </div>
      </div>
    </div>
  );
}
