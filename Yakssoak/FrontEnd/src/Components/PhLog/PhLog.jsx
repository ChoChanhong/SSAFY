import React, { useEffect } from "react";
import "./PhLog.css";

export default function PhLog(props) {

  return (
    <div id="logLine">
      <div id="phlogName">
        <p style={{ marginTop: 10, marginLeft: 10 }}>조제 이력</p>
      </div>
      <div>{props ? props.info : ''}</div>
    </div>
  );
}
