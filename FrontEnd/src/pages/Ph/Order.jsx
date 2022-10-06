import React, { useState, useEffect } from "react";
import PhNavbar from "../../Components/PhNavbar";
import OrderInfo from "../../Components/PhOrder/OrderInfo";
import PhDetail from "../../Components/PhOrder/PhDetail";
import OrderList from "../../Components/PhOrder/OrderList";
import Web3 from "web3";
import { abi, nftCA } from "../../web3Config";


export default function Order() {

  // const [list, setList] = useState('');

  // useEffect(()=>{
  //   OList();
  // },[]);

  // console.log(list,'order');

  // async function OList(){
  //   const web3 = new Web3(window.ethereum);
  //   const contract = new web3.eth.Contract(abi, nftCA);
  //   const account = await web3.eth.requestAccounts();
  //   const myAccount = account[0];

  //   const list = await contract.methods.getAllListFromAccount(myAccount).call();
  //   console.log(list);
  //   setList(list);

  // }

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
        <OrderList/>
        <PhDetail />
        <OrderInfo />
      </div>
    </div>
  );
}
