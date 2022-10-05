import React from "react";
import "./PhDetail.css";

export default function PhDetail() {
  return (
    <div
      style={{
        border: "solid 1px black",
        height: 760,
        width: 700,
        marginLeft: 30,
      }}
    >
      <div id="phdetailName">
        <p style={{ marginTop: 10, marginLeft: 10 }}>처방 정보</p>
      </div>
    </div>
  );
}
