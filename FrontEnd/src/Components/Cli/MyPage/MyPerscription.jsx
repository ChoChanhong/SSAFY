import { React, useState } from "react";
import RecentPer from "./RecentPer";
import RegularPer from "./RegularPer";
import Perlog from "./Perlog";
import Logo from "../../../assets/images/002.png";
import "./MyPerscription.css";

export default function MyPerscription() {
  const [tab, setTab] = useState("0");
  const tabs = [<RecentPer />, <RegularPer />, <Perlog />];
  function move(e) {
    console.log(e.target.id);
    setTab(e.target.id);
  }

  return (
    <div style={{ width: 390, textAlign: "center" }}>
      <div className="mt-3 d-flex justify-content-center">
        <img src={Logo} alt="로고" width={50} />
        <h2 className="fw-bold mt-3">My 처방</h2>
      </div>
      <div
        id="myPerstabbar"
        style={{ marginTop: 50, fontWeight: "bold", fontSize: 20 }}
      >
        <span
          className={tab === "0" ? "myPerstabSelected" : "myPerstab"}
          id="0"
          onClick={move}
          style={{ marginRight: 20 }}
        >
          최근 처방
        </span>
        <span
          className={tab === "1" ? "myPerstabSelected" : "myPerstab"}
          id="1"
          onClick={move}
          style={{ marginRight: 20 }}
        >
          정기 처방
        </span>
        <span
          className={tab === "2" ? "myPerstabSelected" : "smyPerstab"}
          id="2"
          onClick={move}
        >
          처방 이력
        </span>
      </div>
      <div>{tabs[tab]}</div>
    </div>
  );
}
