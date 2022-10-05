import Web3 from "web3";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCommentMedical,
  faShareNodes,
} from "@fortawesome/free-solid-svg-icons";
import React, { useState, useEffect } from "react";
import "./MyPerscription.css";
import { abi, nftCA } from "../../../web3Config";

export default function RecentPer(props) {
  const recent = props.list[props.list.length - 1]; //가장최근처방
  //최근처방의 약 리스트
  const [yak, setYak] = useState("");

  useEffect(() => {
    if (recent) {
      const tmp = recent.dName.map((x, idx) => (
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <span>{x}</span>
          <span>{recent.dosage[idx]}mg</span>
          <span>{recent.doseNum[idx]}회</span>
          <span>{recent.dosePeriod[idx]}일</span>
          <span>{recent.howtoTake[idx]}</span>
        </div>
      ));
      setYak(tmp);
      console.log(tmp, "tmp");
    }
  }, [recent]);

  return (
    <div>
      <div className="myBox">
        <div style={{ margin: 20, textAlign: "start" }}>
          <div style={{ marginBottom: 5 }}>
            <span>병원명 :　{recent ? recent.hosName : ""}</span>
          </div>
          <div style={{ marginBottom: 5 }}>
            <span>처방일 :　{recent ? recent.pubDate : ""}</span>
          </div>
          <div style={{ marginBottom: 5 }}>
            <span>
              처방 횟수 :　{recent ? recent.dispensingCount : ""}　/　
              {recent ? recent.prescriptionCount : ""}
            </span>
          </div>
          <div style={{ marginBottom: 5 }}>
            <span>질병코드 :　{recent ? recent.dCode : ""}</span>
          </div>
        </div>
        <div
          style={{
            margin: "10px 10px 10px 10px",
            border: "solid 1px black",
            width: 330,
            height: 300,
          }}
        >
          <div style={{ margin: 10 }}>[ 처방내용 ]</div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              margin: "2px 10px 2px 10px",
            }}
          >
            <p>약이름</p> <p>투약량</p> <p>투약횟수</p> <p>투약일</p>{" "}
            <p>복용방법</p>
          </div>
          <div>{recent ? yak : ""}</div>
        </div>
        <div style={{ marginTop: 30 }}>
          <button
            id="bluebutton"
            style={{ height: "100" }}
            onClick={props.directMove}
          >
            조제접수
          </button>
        </div>
        <div
          class="d-flex justify-content-evenly"
          style={{ marginTop: 50, marginBottom: 30 }}
        >
          <button id="textbutton">
            <FontAwesomeIcon
              icon={faCommentMedical}
              style={{ marginRight: 10 }}
            />
            상세내역
          </button>
          <button id="textbutton">
            <FontAwesomeIcon icon={faShareNodes} style={{ marginRight: 10 }} />
            내보내기
          </button>
        </div>
      </div>
    </div>
  );
}
