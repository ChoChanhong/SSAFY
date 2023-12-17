import React, { useState, useEffect } from "react";
import PhNavbar from "../../Components/PhNavbar";
import OrderInfo from "../../Components/PhOrder/OrderInfo";
import PhDetail from "../../Components/PhOrder/PhDetail";
import OrderList from "../../Components/PhOrder/OrderList";
import Web3 from "web3";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { abi, nftCA } from "../../web3Config";
import setAuthorizationToken from "../../utils/AuthorizationToken";


export default function Order() {

  const navigate = useNavigate();
  const URL = "https://j7e205.p.ssafy.io/api/pharms/me";
  const localStorage = window.localStorage;
  const [info, setInfo] = useState(""); // 약사정보
  const [list, setList] = useState(''); // 처방전 정보
  const [state,setState] = useState(0); //선택된 처방번

  useEffect(() => {
    const token = localStorage.getItem("login-token");
    setAuthorizationToken(token);
    axios
      .get(URL)
      .then(function (res) {
        console.log(res.data);
        setInfo(res.data);
      })
      .catch(function (err) {
        alert("올바른 접근 방식이 아닙니다.");
        navigate("/ph/");
      });
  }, []);  


  useEffect(()=>{
    OList();
  },[]);

  async function OList(){
    const web3 = new Web3(window.ethereum);
    const contract = new web3.eth.Contract(abi, nftCA);
    const account = await web3.eth.requestAccounts();
    const myAccount = account[0];
    const tokenId = await contract.methods.alltokenOfOwner(myAccount).call();
    console.log(tokenId,'token')
    const per = []
    for(let i=0; i<tokenId.length; i++ ){
      per.push( await contract.methods.getPreScriptionByIndex(tokenId[i]).call())
      } 
    setList(per);
    console.log(list,'약사처방전리스트')

  }

  function changeState(e){
    setState(e)
    console.log(e)
  }

  return (
    <div>
      <div>
        <PhNavbar />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          margin: "30px 50px 10px 50px",
        }}
      >
        <OrderList list={list} changeState={changeState}/>
        <PhDetail list={list[state]}/>
        <OrderInfo info={info} list={list} state={state}/>
      </div>
    </div>
  );
}
