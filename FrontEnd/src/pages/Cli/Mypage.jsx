import { React, useState,useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import { Link } from "react-router-dom";
import BackGround from "../../Components/BackGround";
import MyPerscription from "../../Components/Cli/MyPage/MyPerscription";
import CliMy from "../../Components/Cli/MyPage/CliMy";
import Reception from "../../Components/Cli/MyPage/Reception";
import { useNavigate } from "react-router-dom";
import setAuthorizationToken from '../../utils/AuthorizationToken'
import axios from "axios";
import "./Mypage.css";

export default function Mypage() {

  const navigate = useNavigate();
  const localStorage = window.localStorage
  const [tab, setTab] = useState("0");
  const tabs = [<MyPerscription directMove={directMove}/>, <Reception />, <CliMy />];
  const isPc = useMediaQuery({
    query: "(min-width:768px)",
  });
  const URL = "https://j7e205.p.ssafy.io/api/patients/me";

  useEffect(()=>{
    const token = localStorage.getItem("login-token")
    setAuthorizationToken(token)
    axios
      .get(URL)
      .then(function(res){
        console.log(res.data)
      })
      .catch(function(err){
        alert('로그인 만료')
        navigate('../login')
      })
  },[])

  function directMove(){
    setTab('1')
  }

  function move(e) {
    console.log(e.target.id);
    setTab(e.target.id);
  }

  return (
    <div id="webapp-containor" style={{heigth: "100%"}}>
      {/* <div>{isPc ? <BackGround /> : null}</div> */}
      <div>{tabs[tab]}</div>
      <div id="navbar">
        <span id="0" onClick={move}>
          My 처방
        </span>
        <span>|</span>
        <span id="1" onClick={move}>
          조제접수
        </span>
        <span>|</span>
        <span id="2" onClick={move}>
          마이페이지
        </span>
      </div>
    </div>
  );
}
