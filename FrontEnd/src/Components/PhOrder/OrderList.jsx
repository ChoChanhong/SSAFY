import Web3 from "web3";
import React, { useState, useEffect } from "react";
import "./OrderList.css";
import { abi, nftCA } from "../../web3Config";


export default function OrderList() {

  // const list = props.list.map((yak) => (
  //   <div
  //     style={{
  //       borderBottom: "solid 2px #5681EF",
  //       borderRadius: "20px",
  //       display: "flex",
  //       justifyContent: "space-between",
  //     }}
  //   >
  //     <div style={{ margin: "10px 0px 10px 25px" }}>
  //       <div
  //         style={{ fontWeight: "bold", fontSize: "20px", marginBottom: "10px" }}
  //       >
  //         {yak[1]}
  //       </div>
  //       <div>발행일 :　{yak.pubDate}</div>
        
  //     </div>
  //     <button id="bluebutton" style={{ margin: "40px 10px 10px 0px" }}>
  //       상세내역
  //     </button>
  //   </div>
  // ));

  // useEffect(() => {
  //   console.log(props.list, "접수리스트");
  //   console.log(props.list[0][1]);
  // }, []);



  return (
    <div>
      <div id="orderline">
        <div
          id="ordername"
          style={{ display: "flex", justifyContent: "space-around" }}
        >
          <p id="orderLog">병원</p>
          <p id="orderLog">성명</p>
          <p id="orderLog">생년월일</p>
          <p id="orderLog">처방 발급일</p>
        </div>
        {/* <div>{list}</div> */}
      </div>
    </div>
  );
}
