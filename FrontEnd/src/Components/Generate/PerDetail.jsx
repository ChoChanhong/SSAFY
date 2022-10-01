import React from "react";

export default function PerDetail() {
  const localStorage = window.localStorage;

  return (
    <div style={{ border: "solid 1px black", height: 700, width: 700 }}>
      처방전 상세내역
      {window.localStorage.getItem("login-token")}
    </div>
  );
}
