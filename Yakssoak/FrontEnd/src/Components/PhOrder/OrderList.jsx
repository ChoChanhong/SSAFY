import Web3 from "web3";
import React, { useState, useEffect } from "react";
import "./OrderList.css";
import { abi, nftCA } from "../../web3Config";

export default function OrderList(props) {
  const [list, setList] = useState("");
  useEffect(() => {
    if (props.list) {
      const tmp = props.list.map((yak, idx) => (
        <div
          onClick={() => {
            props.changeState(idx);
          }}
          style={{
            display: "flex",
            justifyContent: "space-around",
            marginTop: "10px",
          }}
        >
          <p>{yak[1]}</p>
          <p>{yak.userName}</p>
          <p>{yak.pubDate}</p>
        </div>
      ));
      setList(tmp);
    }
  }, [props]);

  return (
    <div>
      <div id="orderline">
        <div
          id="ordername"
          style={{ display: "flex", justifyContent: "space-around" }}
        >
          <p id="orderLog">병원</p>
          <p id="orderLog">성명</p>
          {/* <p id="orderLog">생년월일</p> */}
          <p id="orderLog">처방 발급일</p>
        </div>
        <div>{list}</div>
      </div>
    </div>
  );
}
