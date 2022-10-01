import React from "react";
import "./OrderList.css";

export default function OrderList() {
  return (
    <div>
      <div id="orderline">
        <div
          id="ordername"
          style={{ display: "flex", justifyContent: "space-around" }}
        >
          <p id="orderLog">병원</p>
          <p id="orderLog">처방전주소</p>
          <p id="orderLog">성명</p>
          <p id="orderLog">생년월일</p>
        </div>
        접수리스트 띄우기
      </div>
    </div>
  );
}
