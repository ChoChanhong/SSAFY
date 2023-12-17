import Web3 from "web3";
import axios from "axios";
import setAuthorizationToken from "../../utils/AuthorizationToken";
import { React, useEffect, useState } from "react";
import "./PhLogFind.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { cfmabi, cfmCA , nftCA, abi } from "../../web3Config"

export default function PhLogFind(props) {

  const [Snum, setSnum] = useState(""); //환자이름
  const [name, setName] = useState(""); //환자주소
  const [email, setEmail] = useState(""); //환자이메일
  const [wallet, setWallet] = useState(""); //환자지갑
  const [userDataList, setUserDataList] = useState(null);

  const URL = "https://j7e205.p.ssafy.io/api/search";
  const token = localStorage.getItem("login-token");

  function numberCheck(e) {
    const a = e.target.value.replace(/^(\d{6})(\d{7})$/, `$1-$2`);
    setSnum(a);
    if (Snum.length === 14) {
      console.log(Snum);
    }
  }


  async function searchList() {
    const web3 = new Web3(window.ethereum);
    const contract = new web3.eth.Contract(cfmabi, cfmCA);
    const account = await web3.eth.requestAccounts();
    const myAccount = account[0];

    const list = await contract.methods
      .getpatientListFromAccount(myAccount, wallet)
      .call();
    setUserDataList(list);
    console.log(list);
  }

  useEffect(() => {
    searchList();
  }, [wallet]);

  async function search() {
    console.log(name, Snum);
    setAuthorizationToken(token);
    axios
      .post(URL, { patientName: name, patientRRN: Snum })
      .then(function (res) {
        console.log("res", res.data);
        setEmail(res.data.userEmail);
        setWallet(res.data.userWalletAddress);
        // props.changeUserSeq(res.data.userSeq);
        // props.changeName(name);
        // props.changeWallet(res.data.userWalletAddress);
      })
      .catch(function (err) {
        alert("환자를 찾을 수 없습니다");
      });
  }



  return (
    <div>
      <div id="phlogline">
        <div id="phlogname">
          <p style={{ marginTop: 10, marginLeft: 15 }}>조제내역 검색</p>
        </div>
        <div id="phlogBox">
          <label id="phlogLabel">환자명</label>
          <input id="phlogInput"  onChange={(e) => {
              setName(e.target.value);
            }} />
          <label id="phlogLabel">주민등록번호</label>
          <input id="phlogInput" value={Snum} onChange={numberCheck}/>
        </div>
        <div className="mt-3 text-center">
          <button id="phlogButton" onClick={() => {
              search();
            }}>
            {" "}
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              style={{ marginRight: 10 }}
            />
            검색
          </button>
        </div>
      </div>
      <div id="phlogline" className="mt-3" style={{height: 500}}>
        <div id="phlogname">
          <div
            id="ordername"
            style={{ display: "flex", justifyContent: "space-around" }}
          >
            <p id="orderLog">병원</p>
            <p id="orderLog">성명</p>
            <p id="orderLog">조제일</p>
          </div>
        </div>
        <div id="phlogBox">

          {userDataList ? userDataList.map((x)=>
            <div onClick={()=>{props.changeInfo(x)}}>
              <span>{x.hosName}     </span>
              <span>{x.userName}     </span>
              <span>{x.prepDate}     </span>
            </div>) : ''}
        </div>
      </div>
    </div>
  );
}
