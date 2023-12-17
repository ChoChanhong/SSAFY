import React from "react";
import { Link } from "react-router-dom";
import DocNavbar from "../../Components/Doc/DocNavbar";
import LogFind from "../../Components/Doc/LogFind";
import PerDetail from "../../Components/Doc/Generate/PerDetail";

export function Log() {
  return (
    <div>
      <DocNavbar />
      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          margin: "30px 50px 10px 50px",
        }}
      >
        <LogFind />
        <PerDetail />
      </div>
    </div>
  );
}
