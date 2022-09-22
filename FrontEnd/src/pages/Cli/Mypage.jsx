import { React, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { Link } from "react-router-dom";
import BackGround from "../../Components/BackGround";
import MyPerscription from "../../Components/MyPerscription";
import CliMy from "../../Components/CliMy";
import Reception from "../../Components/Reception";
import "./Mypage.css";

export default function Mypage() {
  const [tab, setTab] = useState(0);
  const tabs = [<MyPerscription />, <Reception />, <CliMy />];
  const isPc = useMediaQuery({
    query: "(min-width:768px)",
  });

  function move(e) {
    console.log(e.target.id);
    setTab(e.target.id);
  }

  return (
    <div id="webapp-containor">
      <div>{isPc ? <BackGround /> : null}</div>
      <div >
        <div>{tabs[tab]}</div>
        <div id="bottom" class="d-flex justify-content-center">
          <span id="0" onClick={move}>
            My 처방
          </span>
          <span>|</span>
          <span id="1" onClick={move}>
            조제접수
          </span>
          <span>|</span>
          <span id="2" onClick={move}>
            마이페이지
          </span>
        </div>
      </div>
    </div>
  );
}
