import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import "./LogFind.css";
import setAuthorizationToken from "../../utils/AuthorizationToken";
import axios from "axios";
import { abi, nftCA } from "../../web3Config";
import Web3 from "web3";

export default function LogFind(props) {
  const [Snum, setSnum] = useState("");
  const [name, setName] = useState("");
  const [wallet, setWallet] = useState("");
  const URL = "https://j7e205.p.ssafy.io/api/search";
  const token = localStorage.getItem("login-token");

  const [userDtatList, setUserDataList] = useState(null);

  function numberCheck(e) {
    const a = e.target.value.replace(/^(\d{6})(\d{7})$/, `$1-$2`);
    setSnum(a);
    if (Snum.length === 14) {
      console.log(Snum);
    }
  }

  async function search() {
    setAuthorizationToken(token);
    axios
      .post(URL, { patientName: name, patientRRN: Snum })
      .then(function (res) {
        console.log(res.data);
        setWallet(res.data.userWalletAddress);
        // props.changeName(name);
        // props.changeWallet(res.data.userWalletAddress);
      });
    // .catch(function (err) {
    //   alert("환자를 찾을 수 없습니다.");
    // });
  }

  async function searchList() {
    const web3 = new Web3(window.ethereum);
    const contract = new web3.eth.Contract(abi, nftCA);
    const account = await web3.eth.requestAccounts();
    const myAccount = account[0];

    const list = await contract.methods
      .getPatientListFromAccount(myAccount, wallet)
      .call();
    setUserDataList(list);
    console.log(list);
  }

  useEffect(() => {
    searchList();
  }, [wallet]);

  return (
    <div>
      <div id="logline">
        <div id="logname">
          <p style={{ marginTop: 10, marginLeft: 15 }}>처방내역 검색</p>
        </div>
        <div id="logBox">
          <label id="logLabel">환자명</label>
          <input
            id="logInput"
            placeholder="환자명을 입력해주세요."
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <label id="logLabel">주민번호</label>
          <input
            id="logInput"
            placeholder="000000-0000000"
            value={Snum}
            onChange={numberCheck}
          />
        </div>
        <div className="mt-3 text-center">
          <button
            id="logButton"
            onClick={() => {
              search();
            }}
          >
            {" "}
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              style={{ marginRight: 10 }}
            />
            검색
          </button>
        </div>
      </div>
      <div id="logline" className="mt-3" style={{ height: 500 }}>
        <div id="logname">
          <div style={{ display: "flex", justifyContent: "space-around" }}>
            <p id="orderLog">환자명</p>
            <p id="orderLog">처방일</p>
            <p id="orderLog">질병분류코드</p>
          </div>
        </div>
        <div id="line">
          {userDtatList ? (
            <>
              {userDtatList.map((v, i) => {
                return (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginLeft: "65px",
                      fontSize: "25px",
                      marginTop: "25px",
                    }}
                  >
                    <p>{v.userName}</p>
                    <p>{v.pubDate}</p>
                    <p>{v.dCode}</p>
                  </div>
                );
              })}
            </>
          ) : (
            <div style={{ textAlign: "center" }}>환자 정보를 조회해주세요.</div>
          )}
        </div>
      </div>
    </div>
  );
}
