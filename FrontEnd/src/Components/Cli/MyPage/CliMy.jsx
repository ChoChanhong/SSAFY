import { React, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import setAuthorizationToken from '../../../utils/AuthorizationToken'
import axios from "axios";        

import "./CliMy.css";

export default function CliMy() {

  const navigate = useNavigate();
  const localStorage = window.localStorage
  const URL = "https://j7e205.p.ssafy.io/api/patients/me";
  const [tab, setTab] = useState("0");
  const [info, setInfo] = useState();
  const tabs = [];

  useEffect(()=>{
    const token = localStorage.getItem("login-token")
    setAuthorizationToken(token)
    axios
      .get(URL)
      .then(function(res){
        console.log(res.data)
        setInfo(res.data)
      })
      .catch(function(err){
        alert('로그인 만료')
        navigate('../login')
      })
  },[])

  function logout(){
    localStorage.setItem("login-token",'')
    navigate('../')
  }



  return (
    <div style={{ width: 390, textAlign: "center" }}>
      <div class="mt-3 d-flex justify-content-center">
        <img src="img/002.png" alt="로고" width={50} />
        <h2 class="fw-bold">마이페이지</h2>
      </div>
      <div style={{ fontWeight: "bold", marginTop: 60 }}>
        <span style={{color:"#5FD068", fontWeight:"bold", fontSize:"30px"}}>{info ? info.userName : ''}님</span>, 안녕하세요!
      </div>
      <div
        id="cliMytabbar"
        style={{ marginTop: 50, fontWeight: "bold", fontSize: 20 }}
      >
        <span
          className={tab === "0" ? "cliMytabSelected" : "cliMystab"}
          id="0"
        >
        회원정보
        </span>

      </div>
      <div>{tabs[tab]}</div>
      <div>이름 : {info ? info.userName : ''}</div>
      <div>이메일 : {info ? info.userEmail : ''}</div>
      <div>지갑번호 : {info ? info.userWalletAddress : ''}</div>
      <button onClick = {logout} >로그아웃</button>
    </div>
  );
}
