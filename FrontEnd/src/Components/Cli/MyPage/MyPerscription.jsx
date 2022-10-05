import { React, useState, useEffect } from "react";
import RecentPer from "./RecentPer";
import RegularPer from "./RegularPer";
import Perlog from "./Perlog";
import Logo from "../../../assets/images/002.png";
import Web3 from "web3";
import { abi, nftCA } from "../../../web3Config";
import "./MyPerscription.css";

export default function MyPerscription(props) {

  const directMove = props.directMove
  const [list,setList] = useState('') 
  const [tab, setTab] = useState("0");
  const tabs = [<RecentPer directMove={directMove} list={list}/>, <RegularPer list={list}/>, <Perlog list={list}/>];

  useEffect(()=>{
    checkList()
  },[])


  console.log(list,'MyPers')
  async function checkList(){
    const web3 = new Web3(window.ethereum);
    const contract = new web3.eth.Contract(abi, nftCA);
    const account = await web3.eth.requestAccounts();
    const myAccount = account[0];
      // 매개변수로 넘겨준 주소를 거쳐간 모든 처방전 조회
      // 처방전 형식의 배열 리턴
    const list = await contract.methods.getAllListFromAccount(myAccount).call();                                      
    console.log(list);
    setList(list)
    
  }




  //탭이동용
  function move(e) {
    console.log(e.target.id);
    setTab(e.target.id);
  }

  return (
    <div style={{ width: 390, textAlign: "center" }}>
      <div className="mt-3 d-flex justify-content-center">
        <img src={Logo} alt="로고" width={50} />
        <h2 className="fw-bold mt-3">My 처방</h2>
      </div>
      <div
        id="myPerstabbar"
        style={{ marginTop: 50, fontWeight: "bold", fontSize: 20 }}
      >
        <span
          className={tab === "0" ? "myPerstabSelected" : "myPerstab"}
          id="0"
          onClick={move}
          style={{ marginRight: 20 }}
        >
          최근 처방
        </span>
        <span
          className={tab === "1" ? "myPerstabSelected" : "myPerstab"}
          id="1"
          onClick={move}
          style={{ marginRight: 20 }}
        >
          정기 처방
        </span>
        <span
          className={tab === "2" ? "myPerstabSelected" : "smyPerstab"}
          id="2"
          onClick={move}
        >
          처방 이력
        </span>
      </div>
      <div>{tabs[tab]}</div>
    </div>
  );
}
