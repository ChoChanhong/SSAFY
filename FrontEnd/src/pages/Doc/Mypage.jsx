import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import { useNavigate } from "react-router-dom";
import DocNavbar from "../../Components/Doc/DocNavbar";
import setAuthorizationToken from '../../utils/AuthorizationToken'
import axios from "axios";


export function Mypage() {
  const navigate = useNavigate();
  const URL = "https://j7e205.p.ssafy.io/api/hospitals/me";
  const localStorage = window.localStorage;
  const [info,setInfo] = useState('')


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
      alert('올바른 접근 방식이 아닙니다.')
      navigate('/doc/')
    })
  },[])

  function logout(){
    localStorage.setItem("login-token",'')
    alert('로그아웃 되었습니다.')
    navigate('/doc/')
  }

  return (
    <div>
      <DocNavbar />
      <div>{info ? info.userName : ''}님, 안녕하세요!</div>
      <div>
        <div>
          계정 정보
          <div>
            <div>병원명 : {info ? info.userName : ''}</div>
            <div>요양기관번호 : {info ? info.hospitalCRN : ''}</div>
            <div>면허번호 : {info ? info.hospitalLicense : ''}</div>
            <div>대표이메일 : {info ? info.userEmail : ''}</div>
            <div>주소 : {info ? info.hospitalAddr : ''}</div>
            <div>연락처 : {info ? info.hospitalTel : ''}</div>
          </div>
        </div>
        <div>
          지갑 정보
          <div>지갑 주소 : {info ? info.userWalletAddress : ''}</div>
        </div>
      </div>
      <button onClick={logout}>로그아웃</button>
    </div>
  );
}
