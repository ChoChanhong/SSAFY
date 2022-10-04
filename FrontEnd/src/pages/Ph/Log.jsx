import React from "react";
import PhNavbar from "../../Components/PhNavbar";
import PhLogFind from "../../Components/PhLogFind";
import PhLog from "../../Components/PhLog";

export function Log() {
  return (
    <div>
      <div>
        <PhNavbar />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          margin: "30px 50px 10px 50px",
        }}
      >
        <PhLogFind />
        <PhLog />
      </div>
    </div>
  );
}
