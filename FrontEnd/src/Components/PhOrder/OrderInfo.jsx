import React from "react";
import "./OrderInfo.css";

export default function OrderInfo() {
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
          <button id="orderinfoButton">조제 등록</button>
        </div>
      </div>
    </div>
  );
}
