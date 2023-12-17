import { React, useEffect, useState } from "react";
import PhNavbar from "../../Components/PhNavbar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import setAuthorizationToken from "../../utils/AuthorizationToken";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMortarPestle,
  faPrescriptionBottleMedical,
} from "@fortawesome/free-solid-svg-icons";

import "./MyPage.css";

export function Mypage() {
  const navigate = useNavigate();
  const URL = "https://j7e205.p.ssafy.io/api/pharms/me";
  const localStorage = window.localStorage;
  const [info, setInfo] = useState("");

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
        alert("올바른 접근 방식이 아닙니다.");
        navigate("/ph/");
      });
  }, []);

  function logout() {
    localStorage.setItem("login-token", "");
    alert("로그아웃 되었습니다.");
    navigate("/ph/");
  }

  return (
    <div>
      <PhNavbar />
      <div style={{ display: "flex" }}>
        <h1 id="phmyTitle">
          <FontAwesomeIcon
            icon={faPrescriptionBottleMedical}
            style={{ color: "#00ADEF", marginRight: 30, height: 50 }}
          />
          <div style={{ color: "#00ADEF" }}>싸피약국</div>님, 안녕하세요!
        </h1>
        <button id="phLogout" style={{ marginLeft: 850 }} onClick={""}>
          로그아웃
        </button>
      </div>
      <div id="phmy">
        <div id="phAccInfo">
          <p id="phmyHead">
            {" "}
            <FontAwesomeIcon
              icon={faMortarPestle}
              style={{ marginRight: 30 }}
            />
            계정 정보
          </p>
          <div id="phmyBox">
            <div style={{ display: "flex" }}>
              <label id="phmyInfo">● 약국명 :　</label>
              <p id="phmyAns">{info ? info.userName : ""}</p>
            </div>
            <div style={{ display: "flex" }}>
              <label id="phmyInfo">● 면허번호 :　</label>{" "}
              {info ? info.pharmLicense : ""}
            </div>
            <div style={{ display: "flex" }}>
              <label id="phmyInfo">● 대표이메일 :　</label>
              {info ? info.userEmail : ""}
            </div>
            <div style={{ display: "flex" }}>
              <label id="phmyInfo">● 주소 :　</label>
              {info ? info.pharmAddr : ""}
            </div>
            <div style={{ display: "flex" }}>
              <label id="phmyInfo">● 연락처 :　</label>
              {info ? info.pharmTel : ""}
            </div>
            <div style={{ display: "flex" }}>
              <label id="phmyInfo">● 지갑 주소 :　</label>
              {info ? info.userWalletAddress : ""}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
