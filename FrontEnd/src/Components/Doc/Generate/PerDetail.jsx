import React from "react";
import "./PerDetail.css";

export default function PerDetail() {
  const localStorage = window.localStorage;

  return (
    <div
      style={{
        border: "solid 1px black",
        height: 760,
        width: 700,
        marginLeft: 30,
      }}
    >
      <div id="detailName">
        <p style={{ marginTop: 10, marginLeft: 10 }}>처방 정보</p>
        처방전 상세내역
        <div>{window.localStorage.getItem("login-token")}</div>
      </div>
    </div>
  );
}
