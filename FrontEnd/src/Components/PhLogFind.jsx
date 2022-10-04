import React from "react";
import "./PhLogFind.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

export default function PhLogFind() {
  return (
    <div>
      <div id="phlogline">
        <div id="phlogname">
          <p style={{ marginTop: 10, marginLeft: 15 }}>처방내역 검색</p>
        </div>
        <div id="phlogBox">
          <label id="phlogLabel">환자명</label>
          <input id="phlogInput" readOnly />
          <label id="phlogLabel">생년월일</label>
          <input id="phlogInput" />
        </div>
        <div class="mt-3 text-center">
          <button id="phlogButton">
            {" "}
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              style={{ marginRight: 10 }}
            />
            검색
          </button>
        </div>
      </div>
      <div id="phlogline" class="mt-3" style={{height: 500}}>
        <div id="phlogname">
          <div
            id="ordername"
            style={{ display: "flex", justifyContent: "space-around" }}
          >
            <p id="orderLog">병원</p>
            <p id="orderLog">처방전주소</p>
            <p id="orderLog">성명</p>
            <p id="orderLog">생년월일</p>
          </div>
        </div>
        <div id="phlogBox">
          검색 결과 반복문으로
        </div>
      </div>
    </div>
  );
}
