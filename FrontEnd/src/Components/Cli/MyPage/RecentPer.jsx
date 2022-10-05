import Web3 from "web3";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCommentMedical,
  faShareNodes,
} from "@fortawesome/free-solid-svg-icons";
import React, { useState, useEffect } from "react";
import "./MyPerscription.css";
import { abi, nftCA } from "../../../web3Config";

export default function RecentPer() {

  const [currentID, setCurrentID] = useState();
  const [hosName, setHosName] = useState(""); // 병원이름
  const [pubDate, setPubDate] = useState(""); // 처방일
  const [dispensingCount, setDispensingCount] = useState("") // 처방횟수
  const [dCode, setDCode] = useState(""); // 질병코드

  const [dName, setDName] = useState([]) // 약 이름
  const [dosage, setDosage] = useState([]); // 투약량
  const [doseNum, setDoseNum] = useState([]); // 투약 횟수
  const [dosePeriod, setDosePeriod] = useState([]); // 총 투약일
  const [howtoTake, setHowToTake] = useState([]); // 복용방법

  const web3 = new Web3(window.ethereum);
  const contract = new web3.eth.Contract(abi, nftCA);

  useEffect(()=>{
    allTokenCheck();
    checkList();
  },[]);

  async function allTokenCheck(){
    const web3 = new Web3(window.ethereum);
    const contract = new web3.eth.Contract(abi, nftCA);
    const account = await web3.eth.requestAccounts();
    const myAccount = account[0];

    // 모든 토큰 id를 배열로 출력해서 길이 판별후 제일 최근 처방전 선택
    const alltoOwn = await contract.methods.alltokenOfOwner(myAccount).call();

    setCurrentID(alltoOwn.length - 1);
    console.log(currentID);
  }

  // 눌렀을때 
  async function checkList(){
    const web3 = new Web3(window.ethereum);
    const contract = new web3.eth.Contract(abi, nftCA);
    const account = await web3.eth.requestAccounts();
    const myAccount = account[0];


      // 매개변수로 넘겨준 주소를 거쳐간 모든 처방전 조회
      // 처방전 형식의 배열 리턴
    const list = await contract.methods.getAllListFromAccount(myAccount).call();

    
                                            
    
  
    setHosName(list[currentID].hosName);
    setPubDate(list[currentID].pubDate);
    setDispensingCount(list[currentID].dispensingCount);
    setDCode(list[currentID].dCode);
    setDName(list[currentID].dName);
    setDosage(list[currentID].dosage);
    setDoseNum(list[currentID].doseNum);
    setDosePeriod(list[currentID].dosePeriod);
    setHowToTake(list[currentID].howtoTake);


    console.log(list);
    
  }

  const getContract = async () => {
    const data = {
      userName: "Test1",
      hosName: "Test2",
      pharName: "Test2",
      dCode: "aaa",
      dName: ["bb", "cc"],
      dosage: [1, 2],
      doseNum: [2, 2],
      dosePeriod: [2, 2],
      dispensingCount: 1,
      prescriptionCount: 1,
      howtoTake: "asddasda",
      pubDate: 123123123,
      prepDate: 23123123,
    };

    const web3 = new Web3(window.ethereum);
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });

    console.log(accounts);

    console.log(contract._jsonInterface);

    const count = await contract.methods
      .getMintedTokens()
      .call()
      .then((id) => console.log("Token: ", id));

    const prsList = await contract.methods
      .getPreScriptionByIndex(0)
      .call()
      .then((id) => console.log("List: ", id));
  };


  async function balanceOf() {

    const web3 = new Web3(window.ethereum);
    const contract = new web3.eth.Contract(abi, nftCA);
    const account = await web3.eth.requestAccounts();
    const myAccount = account[0];

    const bof = await contract.methods
      .balanceOf(myAccount)
      .call();
    console.log(bof);

    const totalSupply = await contract.methods.totalSupply().call();
    console.log(totalSupply);

    const toobi = await contract.methods
      .tokenOfOwnerByIndex(myAccount, 0)
      .call();
    console.log(toobi);

  }

  async function alltokenOfOwner() {

    const web3 = new Web3(window.ethereum);
    const contract = new web3.eth.Contract(abi, nftCA);
    const account = await web3.eth.requestAccounts();
    const myAccount = account[0];

    const alltoOwn = await contract.methods.alltokenOfOwner(myAccount)
                                            .call();
    console.log(alltoOwn.length);
    console.log(alltoOwn);
  }

  async function getBalanceOf() {

    const web3 = new Web3(window.ethereum);
    const contract = new web3.eth.Contract(abi, nftCA);

    const getB = await contract.methods
      .getBalanceOf("0xC78Bf04D11874042A6fcfC2B8D66b297C24D5c4B")
      .call();

    console.log(getB);
  }

  async function getRegularPreScription(){
    const web3 = new Web3(window.ethereum);
    const contract = new web3.eth.Contract(abi, nftCA);
    const account = await web3.eth.requestAccounts();
    const myAccount = account[0];

    const regular = await contract.methods.getRegularPreScription(myAccount).call();

    console.log(regular);
  }

  return (
    <div>
      <div className="myBox">
        <div style={{ margin: 20 }}>
          <div>
            <span>병원명: {hosName}</span>
          </div>
          <div>
            <span>처방일: {pubDate}</span>            
          </div>
          <div>
            <span>처방 횟수: {dispensingCount}</span>            
          </div>
        </div>
        <div style={{ border: "solid" }}>처방내용</div>
        <div style={{ marginTop: 30 }}>
          <button id="bluebutton" style={{ height: "100" }}>
            조제접수
          </button>
        </div>
        <div
          class="d-flex justify-content-evenly"
          style={{ marginTop: 50, marginBottom: 30 }}
        >
          <button id="textbutton">
            <FontAwesomeIcon
              icon={faCommentMedical}
              style={{ marginRight: 10 }}
            />
            상세내역
          </button>
          <button id="textbutton">
            <FontAwesomeIcon icon={faShareNodes} style={{ marginRight: 10 }} />
            내보내기
          </button>
        </div>
      </div>
          <button onClick={checkList} > 테스트</button>
          <button onClick={allTokenCheck} > allTokenCheck </button>
          <button onClick={alltokenOfOwner} > alltokenOfOwner </button>
          <button onClick={getBalanceOf} > getBalanceOf </button>
          <button onClick={getRegularPreScription} > getRegularPreScription </button>
    </div>
  );
}
