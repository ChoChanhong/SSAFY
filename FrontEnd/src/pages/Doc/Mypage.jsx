import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import { useNavigate } from "react-router-dom";
import DocNavbar from "../../Components/Doc/DocNavbar";
import setAuthorizationToken from "../../utils/AuthorizationToken";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Mypage.css";
import { faUserDoctor } from "@fortawesome/free-solid-svg-icons";
import { faHospital } from "@fortawesome/free-solid-svg-icons";

export function Mypage() {
  const navigate = useNavigate();
  const URL = "https://j7e205.p.ssafy.io/api/hospitals/me";
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
        navigate("/doc/");
      });
  }, []);

  function logout() {
    localStorage.setItem("login-token", "");
    alert("로그아웃 되었습니다.");
    navigate("/doc/");
  }

  return (
    <div>
      <DocNavbar />
      <div style={{ display: "flex" }}>
        <h1 id="docmyTitle">
          <FontAwesomeIcon
            icon={faUserDoctor}
            style={{ color: "#00ADEF", marginRight: 30 }}
          />
          <div style={{ color: "#5FD068" }}>{info ? info.userName : ""}</div>님,
          안녕하세요!
        </h1>
        <button id="docLogout" onClick={logout}>
          로그아웃
        </button>
      </div>
      <div id="docmy">
        <div id="docAccInfo">
          <p id="docmyHead">
            {" "}
            <FontAwesomeIcon icon={faHospital} style={{ marginRight: 30 }} />
            계정 정보
          </p>
          <div id="docmyBox">
            <div style={{ display: "flex" }}>
              <label id="docmyInfo">● 병원명 : </label>
              <p id="docmyAns">{info ? info.userName : ""}</p>
            </div>
            <div style={{ display: "flex" }}>
              <label id="docmyInfo">● 요양기관번호 : </label>
              {info ? info.hospitalCRN : ""}
            </div>
            <div style={{ display: "flex" }}>
              <label id="docmyInfo">● 면허번호 :</label>{" "}
              {info ? info.hospitalLicense : ""}
            </div>
            <div style={{ display: "flex" }}>
              <label id="docmyInfo">● 대표이메일 : </label>
              {info ? info.userEmail : ""}
            </div>
            <div style={{ display: "flex" }}>
              <label id="docmyInfo">● 주소 : </label>
              {info ? info.hospitalAddr : ""}
            </div>
            <div style={{ display: "flex" }}>
              <label id="docmyInfo">● 연락처 : </label>
              {info ? info.hospitalTel : ""}
            </div>
            <div style={{ display: "flex" }}>
              <label id="docmyInfo">● 지갑 주소 : </label>
              {info ? info.userWalletAddress : ""}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
