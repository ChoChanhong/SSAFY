import { React } from "react";
import "./Yak.css";

export default function PerInfo(props) {
  function D() {
    console.log(props.info.key);
    props.Delete(props.info.key);
  }

  return (
    <div id="yakdiv">
      <div id="yakLabel">약품명 :　{props.info.dName}</div>
      <div id="yakLabel">1회 투약량 :　{props.info.dosage}</div>
      <div id="yakLabel">1일 투약횟수 :　{props.info.doseNum}</div>
      <div id="yakLabel">총 투약일수 :　{props.info.dosePeriod}</div>
      <div id="yakLabel">용법 :　{props.info.howtoTake}</div>
      <button id="yakButton" onClick={D}>삭제</button>
    </div>
  );
}
