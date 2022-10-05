import axios from "axios";
import setAuthorizationToken from '../../../utils/AuthorizationToken'
import { React, useEffect, useState } from "react";
import "./Cliinfo.css";

export default function CliInfo(props) {
  const [Snum, setSnum] = useState(""); //환자이름
  const [name, setName] = useState(''); //환자주소
  const [email, setEmail] = useState(''); //환자주소
  const [wallet, setWallet] = useState(''); //환자주소
  
  const URL = "https://j7e205.p.ssafy.io/api/search";
  const token = localStorage.getItem("login-token")
  
  function numberCheck(e) {
    const a = e.target.value.replace(/^(\d{6})(\d{7})$/, `$1-$2`);
    setSnum(a);
    if (Snum.length === 14) {
      console.log(Snum);
    }
  }

  function search(){
    console.log(name,Snum)
    setAuthorizationToken(token)
    axios
    .post(URL,{ patientName : name, patientRRN : Snum })
    .then(function(res){
      console.log(res.data)
      setEmail(res.data.userEmail)
      setWallet(res.data.userWalletAddress)
      props.changeUserSeq(res.data.userSeq)
      props.changeName(name)
      props.changeWallet(res.data.userWalletAddress)

    })
    .catch(function(err){
      alert('환자를 찾을 수 없습니다')
    }
  )
  }

  return (
    <div>
      <div id="line">
        <div id="name">
          <p style={{ marginTop: 10, marginLeft: 10 }}>환자정보</p>
        </div>
        <div id="genBox">
          <label id="genLabel">환자명</label>
          <input id="genInput" value = {name} onChange={(e)=>{setName(e.target.value)}}/>
        </div>
        <div id="genBox">
          <label id="genLabel">주민번호</label>
          <input style={{ width: 200 }} value={Snum} onChange={numberCheck} />
        </div>
        <div id="genBox">
          <label id="genLabel">이메일</label>
          <input style={{ width: 200 }} value={email} readOnly />
        </div>
        <div id="genBox">
          <label id="genLabel">지갑</label>
          <input
            id="genInput"
            style={{ marginLeft: 41 }}
            value={wallet}
            readOnly
          />
        </div>
        <div>
          <button onClick={search}>조회</button>
        </div>
      </div>
      <div>
        <div
          id="name"
          className="mt-3"
          style={{ display: "flex", justifyContent: "space-around" }}
        >
          <p id="genLog">발급일자</p>
          <p id="genLog">수령여부</p>
          <p id="genLog">처방전 주소</p>
        </div>
        <div id="line"> 이전 처방내역 반복문으로</div>
      </div>
    </div>
  );
}
