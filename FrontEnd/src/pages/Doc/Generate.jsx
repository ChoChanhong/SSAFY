import React from "react";
import { Link } from "react-router-dom";
import DocNavbar from "../../Components/Doc/DocNavbar";
import CliInfo from "../../Components/Doc/Generate/CliInfo";
import PerInfo from "../../Components/Doc/Generate/Perinfo";
import PerDetail from "../../Components/Doc/Generate/PerDetail";

export default function Generate() {
  return (
    <div>
      <div>
        <DocNavbar />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-start",
          margin: "30px 50px 0px 50px",
        }}
      >
        <CliInfo />
        <PerInfo />
        <PerDetail />
      </div>
    </div>
  );
}
