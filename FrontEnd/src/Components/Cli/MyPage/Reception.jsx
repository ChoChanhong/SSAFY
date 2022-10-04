import { React, useState } from "react";
import ReceptionConfirm from "./ReceptionConfirm";
import ReceptionOrder from "./ReceptionOrder";
import "./Reception.css";

export default function Reception() {
  const [tab, setTab] = useState("0");
  const tabs = [<ReceptionOrder/>,<ReceptionConfirm/>];
  function move(e) {
    console.log(e.target.id);
    setTab(e.target.id);
  }

  return (
    <div style={{ width: 390, textAlign: "center" }}>
      <div class="mt-3 d-flex justify-content-center">
        <img src="img/002.png" alt="로고" width={50} />
        <h2 class="fw-bold mt-3">조제 접수</h2>
      </div>
      <div
        id="receptiontabbar"
        style={{ marginTop: 50, fontWeight: "bold", fontSize: 20 }}
      >
        <span
          className={tab === "0" ? "receptiontabSelected" : "receptiontab"}
          id="0"
          onClick={move}
        >
          조제 접수
        </span>
        <span
          className={tab === "1" ? "receptiontabSelected" : "receptiontab"}
          id="1"
          onClick={move}
        >
          접수 확인
        </span>
      </div>
      <div>{tabs[tab]}</div>
    </div>
  );
}
