import Web3 from "web3";
import axios from "axios";
import setAuthorizationToken from "../../../utils/AuthorizationToken";
import { React, useEffect, useState } from "react";
import "./Cliinfo.css";
import { abi, nftCA } from "../../../web3Config";

export default function CliInfo(props) {
  const [Snum, setSnum] = useState(""); //환자이름
  const [name, setName] = useState(""); //환자주소
  const [email, setEmail] = useState(""); //환자이메일
  const [wallet, setWallet] = useState(""); //환자지갑

  const [pubDate, setPubDate] = useState(""); // 발급일자
  const [dCode, setDCode] = useState(""); // 질병분류코드

  const URL = "https://j7e205.p.ssafy.io/api/search";
  const token = localStorage.getItem("login-token");

  function numberCheck(e) {
    const a = e.target.value.replace(/^(\d{6})(\d{7})$/, `$1-$2`);
    setSnum(a);
    if (Snum.length === 14) {
      console.log(Snum);
    }
  }

  async function search() {
    console.log(name, Snum);
    setAuthorizationToken(token);
    axios
      .post(URL, { patientName: name, patientRRN: Snum })
      .then(function (res) {
        console.log(res.data);
        setEmail(res.data.userEmail);
        setWallet(res.data.userWalletAddress);
        props.changeUserSeq(res.data.userSeq);
        props.changeName(name);
        props.changeWallet(res.data.userWalletAddress);
      })
      .catch(function (err) {
        alert("환자를 찾을 수 없습니다");
      });
  }

  async function searchList() {
    const web3 = new Web3(window.ethereum);
    const contract = new web3.eth.Contract(abi, nftCA);
    const account = await web3.eth.requestAccounts();
    const myAccount = account[0];

    const list = await contract.methods
      .getPatientListFromAccount(myAccount, wallet)
      .call();
    console.log(list);
  }

  // const list = pops.list.map((yak) => (
  //   <div>
  //     <p></p>
  //     <p></p>
  //     <p></p>
  //   </div>
  // )

  return (
    <div>
      <div id="line">
        <div id="name">
          <p style={{ marginTop: 10, marginLeft: 10 }}>환자정보</p>
        </div>
        <div id="genBox">
          <label id="genLabel">환자명</label>
          <input
            id="genInput"
            placeholder="환자명을 입력해주세요."
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </div>
        <div id="genBox">
          <label id="genLabel">주민번호</label>
          <input
            style={{ width: 200 }}
            placeholder="000000-0000000"
            value={Snum}
            onChange={numberCheck}
          />
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
        <div style={{ textAlign: "center" }}>
          <button
            id="findButton"
            onClick={() => {
              search();
              searchList();
            }}
          >
            조회
          </button>
        </div>
      </div>
      <div>
        <div
          id="name"
          className="mt-3"
          style={{ display: "flex", justifyContent: "space-around" }}
        >
          <p id="genLog">성명</p>
          <p id="genLog">발급일자</p>
          <p id="genLog">질병분류코드</p>
        </div>
        <div id="line"></div>
      </div>
    </div>
  );
}
