import { TextField } from "@mui/joy";
import { React, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { Link } from "react-router-dom";
import BackGround from "../../Components/BackGround";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Logo from "../../assets/images/003.png";
import "./Button.css";

export default function Login() {
  const isPc = useMediaQuery({
    query: "(min-width:768px)",
  });

  const navigate = useNavigate();
  const URL = "https://j7e205.p.ssafy.io/api/patients/login";
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const onKeyPress = (e) => {
    if (e.key === "Enter") {
      send();
    }
  };

  function send() {
    console.log(id, password);
    axios
      .post(URL, {
        userId: id,
        userPassword: password,
      })
      .then(function (res) {
        localStorage.setItem("login-token", res.data.accessToken);
        navigate("../my");
      })
      .catch(function (err) {
        if (err.response.status === 401 || err.response.status === 404) {
          alert("아이디 혹은 비밀번호가 틀렸습니다.");
        } else {
          alert(err);
        }
      });
  }

  const blueStyle = {
    textDecoration: "none",
    color: "white",
    fontWeight: "bold",
    backgroundColor: "#5681EF",
    height: 50,
    width: 250,
    borderRadius: 10,
    borderColor: "transparent",
  };

  const greenStyle = {
    textDecoration: "none",
    color: "white",
    fontWeight: "bold",
    fontSize: "20px",
    backgroundColor: "#5FD068",
    height: 50,
    width: 250,
    borderRadius: 10,
    borderColor: "transparent",
  };

  return (
    <div id="webapp-containor">
      <div>{isPc ? <BackGround /> : null}</div>
      <div id="login">
        <div style={{ marginTop: 100 }}>
          <Link to="/">
            <img style={{ height: 180 }} src={Logo} alt="로고" />
          </Link>
        </div>
        <p className="fw-bold mt-3">일반사용자 로그인</p>
        <TextField
          onChange={(e) => {
            setId(e.target.value);
          }}
          placeholder="아이디를 입력해주세요."
        />
        <TextField
          type="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          style={{ marginTop: 10 }}
          placeholder="비밀번호를 입력해주세요."
          onKeyPress={onKeyPress}
        />
        <div className="mt-5 d-flex justify-content-center">
          <button onClick={send} style={greenStyle}>
            로그인
          </button>
        </div>
        <div className="mt-2 d-flex justify-content-center">
          <Link to="/signup">
            <button style={blueStyle}>회원가입</button>
          </Link>
        </div>
        <br />
        <div className="text-center mt-5">
          <span style={{ marginRight: 30 }}>아이디를 잊었다면?</span>
          <Link to="">아이디 찾기</Link>
        </div>
      </div>
    </div>
  );
}
