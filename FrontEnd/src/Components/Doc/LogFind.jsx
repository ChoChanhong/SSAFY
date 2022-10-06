import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import "./LogFind.css";

export default function LogFind() {
  return (
    <div>
      <div id="logline">
        <div id="logname">
          <p style={{ marginTop: 10, marginLeft: 15 }}>처방내역 검색</p>
        </div>
        <div id="logBox">
          <label id="logLabel">환자명</label>
          <input id="logInput" readOnly />
          <label id="logLabel">생년월일</label>
          <input id="logInput" />
        </div>
        <div className="mt-3 text-center">
          <button id="logButton">
            {" "}
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              style={{ marginRight: 10 }}
            />
            검색
          </button>
        </div>
      </div>
      <div id="logline" className="mt-3" style={{ height: 500 }}>
        <div id="logname">
          <div style={{ display: "flex", justifyContent: "space-around" }}>
            <p id="orderLog">환자명</p>
            <p id="orderLog">생년월일</p>
            <p id="orderLog">처방일</p>
            <p id="orderLog">처방주소</p>
          </div>
        </div>
        <div id="logBox">검색 결과 반복문으로</div>
      </div>
    </div>
  );
}
