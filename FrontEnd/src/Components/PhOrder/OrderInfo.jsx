import React from "react";
import "./OrderInfo.css";
import Web3 from "web3";
import { cfmabi, cfmCA } from "../../web3Config";
export default function OrderInfo() {

  const Mint = async (e) => {
    e.preventDefault();
    console.log(1111);
    const data = {No : 0, userName: "Test", hosName: "Test", pharName: "Test", dName: ["bb"],dosage: [1],doseNum: [2],dosePeriod: [2], prescriptionCount: 5,dispensingCount: 0, prepData : 0, howtoTake: "asddasda"};
    console.log(data);
    const web3 = new Web3(window.ethereum);
    const contract = new web3.eth.Contract(cfmabi, cfmCA);
    console.log(contract);
    const account = await web3.eth.requestAccounts();
    const myAccount = account[0];
    console.log(myAccount);
    const a = await contract.methods.totalSupply().call();
    console.log(a);
    await contract.methods
      .mint(data)
      .send({ from: myAccount });
    console.log(" 처방전 발급 11111111");
    const totalSupply = await contract.methods.totalSupply().call();
    console.log("총 발행 수 " + totalSupply);
    await contract.methods
          .transferconfirmation(myAccount, )
    console.log("전송 완료");
    console.log(data);
    
    // console.log(prsList);
  };
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
