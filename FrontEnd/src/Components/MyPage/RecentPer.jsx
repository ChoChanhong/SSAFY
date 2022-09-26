import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCommentMedical,
  faShareNodes,
} from "@fortawesome/free-solid-svg-icons";
import React from "react";
import "./MyPerscription.css";

export default function RecentPer() {
  return (
    <div>
      <div className="myBox">
        <div style={{ margin: 20 }}>최근 처방</div>
        <div style={{ border: "solid" }}>처방내역</div>
        <div style={{ marginTop: 30 }}>
          <button id="bluebutton" style={{ height: "100" }}>
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
