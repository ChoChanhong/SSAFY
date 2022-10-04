import { React, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import setAuthorizationToken from "../../../utils/AuthorizationToken";
import Logo from "../../../assets/images/002.png";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck, faUser } from "@fortawesome/free-solid-svg-icons";
import "./CliMy.css";

export default function CliMy() {
  const navigate = useNavigate();
  const localStorage = window.localStorage;
  const URL = "https://j7e205.p.ssafy.io/api/patients/me";
  const [info, setInfo] = useState();
  const tabs = [];

  useEffect(() => {
    const token = localStorage.getItem("login-token");
    setAuthorizationToken(token);
    axios
      .get(URL)
      .then(function (res) {
        console.log(res.data);
        setInfo(res.data);
      })
      .catch(function (err) {
        alert("로그인 만료");
        navigate("../login");
      });
  }, []);

  function logout() {
    localStorage.setItem("login-token", "");
    navigate("../");
  }

  return (
    <div style={{ width: 390, textAlign: "center" }}>
      <div class="mt-3 d-flex justify-content-center">
        <img src={Logo} alt="로고" width={50} />
        <h2 class="fw-bold mt-3">마이페이지</h2>
      </div>
      <div style={{ fontWeight: "bold", marginTop: 60 }}>
        <span
          style={{ color: "#5FD068", fontWeight: "bold", fontSize: "30px" }}
        >
          <FontAwesomeIcon icon={faUser} style={{ marginRight: 15 }} />
          {info ? info.userName : ""}님
        </span>
        , 안녕하세요!
      </div>
      <div>
        <hr />
      </div>
      <div className="cliinfoBox">
        <div style={{ display: "flex" }}>
          <p id="cliHead">
            <FontAwesomeIcon icon={faCircleCheck} />
            　이름:　{info ? info.userName : ""}
          </p>
        </div>
        <div>
          <p id="cliHead">
            <FontAwesomeIcon icon={faCircleCheck} />
            　이메일:　{info ? info.userEmail : ""}
          </p>
        </div>
        <div>
          <p id="cliHead">
            <FontAwesomeIcon icon={faCircleCheck} />
            　지갑번호:　{info ? info.userWalletAddress : ""}
          </p>
        </div>
      </div>
      <div>
        <button id="cliLogout" onClick={logout}>
          로그아웃
        </button>
      </div>
      <div>
        <button id="cliout" onClick={logout}>
          회원탈퇴
        </button>
      </div>
    </div>
  );
}
