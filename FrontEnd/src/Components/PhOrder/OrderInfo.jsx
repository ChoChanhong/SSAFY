import React from "react";
import "./OrderInfo.css";
import Web3 from "web3";
import { cfmabi, cfmCA , nftCA, abi } from "../../web3Config";
export default function OrderInfo() {

  const Mint = async (e) => {
    e.preventDefault();
    console.log(1111);
    const conf = { 
      No :0, userName: "Test", hosName: "Test", pharName: "Test", dName: ["bb"],dosage:[1],doseNum:[2],dosePeriod:[2], prescriptionCount:5,dispensingCount:0, prepData :0, howtoTake: "asddasda"};
    console.log(conf);
    const test = {
      id : 2,
      userName : "test",
      hosName : "test",
      pharName : "test2",
      dosage : [1],
      doseNum : [2],
      dosePeriod : [3],
      prescriptionCount : 3,
      dispensingCount : 0,
      prepDate : 2022,
      howtoTake : "aa"
    };
    const web3 = new Web3(window.ethereum);
    const contract = new web3.eth.Contract(cfmabi, cfmCA);
    console.log(cfmCA);
    console.log(contract);
    console.log(test)
    const account = await web3.eth.requestAccounts();
    const myAccount = account[0];
    console.log(myAccount);
    const a = await contract.methods.totalSupply().call();
    console.log(a);
    await contract.methods
      .mint(test)
      .send({ from: myAccount });
    console.log(" 처방전 발급 11111111");
    const totalSupply = await contract.methods.totalSupply().call();
    console.log("총 발행 수 " + totalSupply);
    await contract.methods
          .transferconfirmation(myAccount, )
    console.log("전송 완료");
    console.log(conf);
    
    async function submit(){
      const web3 = new Web3(window.ethereum);
      const contract = new web3.eth.Contract(cfmabi, cfmCA);
      console.log(cfmCA);
      console.log(contract);
  
      const account = await web3.eth.requestAccounts();
      const myAccount = account[0];

      const cnt = contract.methods.getcountOfprs("처방전 id").call() + 1;

      const confirmation = {
        id : "처방전 Id",
        userName : "처방전에 있는 userName",
        hosName : " 처방전에 있는 hosName",
        pharName : "로그인되어있는 pharName",
        dosage :  "처방전에 있는거",
        doseNum : "처방전에 있는거",
        dosePeriod : "처방전에 있는거",
        prescriptionCount : "처방전에 있는거",
        dispensingCount : "contract로 가져올거임 (처방전 tokenId 필요)",
        prepDate : "날짜지정",
        howtoTake : "이 부분만 입력받을듯 ?"
      }

    console.log(myAccount);
    
    // 확인서 발급
    await contract.methods
      .mint(confirmation)
      .send({ from: myAccount });
    let index = await contract.methods.totalSupply().call() - 1;
    // 확인서 전달
    await contract.methods
          .transferconfirmation(myAccount, "환자의 주소", index)
          .send({ from : myAccount })
    // 처방전 전달
    }
    // console.log(prsList);
  }
  return (
    <div>
      <div id="orderinfoline">
        <div id="orderinfoname">
          <p style={{ marginTop: 10, marginLeft: 10 }}>조제정보</p>
        </div>
        <div id="orderinfoBox">
          <label id="orderinfoLabel">조제기관명</label>
          <input id="orderinfoInput" readOnly />
        </div>
        <div id="orderinfoBox">
          <label id="orderinfoLabel">조제약사</label>
          <input id="orderinfoInput" readOnly />
        </div>
        <div id="orderinfoBox">
          <label id="orderinfoLabel">조제량</label>
          <input id="orderinfoInput" readOnly />
        </div>
        <div id="ordeinforBox">
          <label id="orderinfoLabel">조제횟수</label>
          <input id="orderinfoInput" readOnly />
        </div>
        <div id="orderinfoBox">
          <label id="orderinfoLabel">조제일</label>
          <input id="orderinfoInput" readOnly />
        </div>
        <div>
          <label id="orderinfoLabel">처방 변경/수정/대체내용</label>
          <textarea name="" id="orderinfoText" cols="35" rows="8"></textarea>
        </div>
        <div className="mt-3 text-center">
          <button id="orderinfoButton" onClick = {Mint}>조제 등록</button>
        </div>
      </div>
    </div>
  );
}
