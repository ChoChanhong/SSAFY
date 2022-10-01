import React from "react";
import "./OrderList.css";

export default function OrderList() {
  return (
    <div>
      <div>
        <h3>접수 리스트</h3>
      </div>
      <div id="orderline">
        <div
          id="ordername"
          class="mt-3"
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
