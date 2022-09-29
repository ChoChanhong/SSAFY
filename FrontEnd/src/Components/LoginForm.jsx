import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { TextField, FormLabel } from "@mui/joy";
import { Link } from 'react-router-dom';

import "./LoginForm.css";

export default function LoginForm() {

    const navigate = useNavigate();
    const [id, setId] = useState("");
    const [password, setPass] = useState("");
    const localStorage = window.localStorage
    const URL = 'https://j7e205.p.ssafy.io/api/hospitals/login'

    function IdChange(e) {
    setId(e.target.value);
  }
    function PasswordChange(e) {
    setPass(e.target.value);
  }
    

    function setAuthorizationToken(token){
        if(token){
            axios.defaults.headers.common[
                "Authorization"
              ] = `Bearer ${token}`;
        }else{
            delete axios.defaults.headers.common["Authorization"];
        }
    }

    function Send(){
        console.log(id,password)
        axios.post(URL,{ "userId" : id , "userPassword" : password })
        .then(
            function(res){
                localStorage.setItem('login-token', res.data.accessToken)
                setAuthorizationToken(localStorage.getItem('login-token'))
            }
        )

    }
    return (
        <div id="loginbox">
          <div class="login">
            <h1 className="loginTitle">병원로그인</h1>
            <span style={{ fontSize: 15, marginTop: 10 }}>
              약쏙(전자처방전)을 이용하기 위해서는 회원가입이 필요합니다
            </span>
            <div style={{ marginTop: 30 }}>
              <FormLabel style={{ marginBottom: 5, fontWeight: "bold" }}>
                아이디
              </FormLabel>
              <TextField
                class="a"
                className="logInput"
                placeholder="아이디를 입력해주세요."
                onChange={IdChange}
              />
              <FormLabel
                style={{ marginTop: 10, marginBottom: 5, fontWeight: "bold" }}
              >
                비밀번호
              </FormLabel>
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
            <img className="logoImg" src="img/001.png" alt="logo" />
            <div class="buttonbox">
              <Link to="/doc/signup">
                <button className="linkbutton">회원가입</button>
              </Link>
              <Link to="/">
                <button className="linkbutton">이용방법</button>
              </Link>
            </div>
          </div>
        </div>
      );
    }
