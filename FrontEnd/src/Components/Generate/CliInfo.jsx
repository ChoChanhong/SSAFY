import { React, useState } from "react";
import "./Cliinfo.css";

export default function CliInfo() {
  const [Snum, setSnum] = useState("");
  const info = { name: "", phone: "", address: "", wallet: "" };
  function numberCheck(e) {
    const a = e.target.value.replace(/^(\d{6})(\d{7})$/, `$1-$2`);
    setSnum(a);
    if (Snum.length === 14) {
      console.log(Snum);
      //axios로 환자정보 받아옴
    }
  }

  return (
    <div>
      <div id="line">
        <div id="name">
          <p style={{ marginTop: 10, marginLeft: 10 }}>환자정보</p>
        </div>
        <div id="genBox">
          <label id="genLabel">환자명</label>
          <input id="genInput" value={info.name} readOnly />
        </div>
        <div id="genBox">
          <label id="genLabel">주민번호</label>
          <input style={{ width: 200 }} value={Snum} onChange={numberCheck} />
        </div>
        <div id="genBox">
          <label id="genLabel">전화번호</label>
          <input style={{ width: 200 }} value={info.phone} readOnly />
        </div>
        <div id="genBox">
          <label id="genLabel">주소</label>
          <input
            id="genInput"
            style={{ marginLeft: 41 }}
            value={info.address}
            readOnly
          />
        </div>
      </div>
      <div>
        <div
          id="name"
          class="mt-3"
          style={{ display: "flex", justifyContent: "space-around" }}
        >
          <p id="genLog">발급일자</p>
          <p id="genLog">수령여부</p>
          <p id="genLog">처방전 주소</p>
        </div>
        <div id="line"> 이전 처방내역 반복문으로</div>
      </div>
    </div>
  );
}
