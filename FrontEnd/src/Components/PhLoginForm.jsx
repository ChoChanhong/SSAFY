import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { TextField, FormLabel } from "@mui/joy";
import IMG from "../assets/images/004.jpg";

import "./PhLoginForm.css";

export default function PhLoginForm() {
  const navigate = useNavigate();
  const [id, setId] = useState("");
  const [password, setPass] = useState("");
  const localStorage = window.localStorage;
  const URL = "https://j7e205.p.ssafy.io/api/pharms/login";
  const onKeyPress = (e) => {
    if (e.key === "Enter") {
      PhSend();
    }
  };

  function IdChange(e) {
    setId(e.target.value);
  }
  function PasswordChange(e) {
    setPass(e.target.value);
  }

  function PhSend() {
    console.log(id, password);
    axios
      .post(URL, { userId: id, userPassword: password })
      .then(function (res) {
        localStorage.setItem("login-token", res.data.accessToken);
        navigate("my");
      })
      .catch(function (err) {
        if (err.response.status === 401 || err.response.status === 404) {
          alert("아이디 혹은 비밀번호가 틀렸습니다.");
        } else {
          alert(err);
        }
      });
  }

  return (
    <div id="phloginbox">
      <div className="phlogin">
        <h1 className="phloginTitle" style={{ color: "#00ADEF" }}>
          약국로그인
        </h1>
        <span style={{ fontSize: 15, marginTop: 10 }}>
          약쏙(전자처방전)을 이용하기 위해서는 회원가입이 필요합니다
        </span>
        <div style={{ marginTop: 30 }}>
          <FormLabel style={{ marginBottom: 5, fontWeight: "bold" }}>
            아이디
          </FormLabel>
          <TextField      .catch(function (err) {
        if (err.response.status === 401 || err.response.status === 404) {
          alert("아이디 혹은 비밀번호가 틀렸습니다.");
        } else {
          alert(err);
        }
      });
            className="a phlogInput"
            placeholder="아이디를 입력해주세요."
            onChange={IdChange}
          />
          <FormLabel
            style={{ marginTop: 10, marginBottom: 5, fontWeight: "bold" }}
          >
            비밀번호
          </FormLabel>
          <TextField
            className="a"
            type="password"
            placeholder="비밀번호를 입력해주세요."
            onChange={PasswordChange}
            onKeyPress={onKeyPress}
          />
        </div>
        <button onClick={PhSend} id="phloginbutton">
          로그인
        </button>
        <Link to="/" className="phlink">
          아이디/비밀번호 찾기
        </Link>
      </div>
      <div className="phinfo">
        <img className="logoImg" src={IMG} alt="logo" />
        <div className="phbuttonbox">
          <Link to="/ph/signup">
            <button className="phlinkbutton">회원가입</button>
          </Link>
          <Link to="/ph/serviceinfo">
            <button className="phlinkbutton">이용방법</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
