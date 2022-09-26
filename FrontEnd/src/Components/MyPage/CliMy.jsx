import { React, useState } from "react";
import "./CliMy.css";

export default function CliMy() {
  const [tab, setTab] = useState("0");
  const tabs = [];
  function move(e) {
    console.log(e.target.id);
    setTab(e.target.id);
  }

  return (
    <div style={{ width: 390, textAlign: "center" }}>
      <div class="mt-3 d-flex justify-content-center">
        <img src="img/002.png" alt="로고" width={50} />
        <h2 class="fw-bold">마이페이지</h2>
      </div>
      <div style={{ fontWeight: "bold", marginTop: 60 }}>
        <span style={{color:"#5FD068", fontWeight:"bold", fontSize:"30px"}}>[사용자이름]님</span>, 안녕하세요!
      </div>
      <div
        id="cliMytabbar"
        style={{ marginTop: 50, fontWeight: "bold", fontSize: 20 }}
      >
        <span
          className={tab === "0" ? "cliMytabSelected" : "cliMystab"}
          id="0"
          onClick={move}
        >
          기본정보
        </span>
        <span
          className={tab === "1" ? "cliMytabSelected" : "cliMystab"}
          id="1"
          onClick={move}
        >
          지갑정보
        </span>
      </div>
      <div>{tabs[tab]}</div>
    </div>
  );
}
