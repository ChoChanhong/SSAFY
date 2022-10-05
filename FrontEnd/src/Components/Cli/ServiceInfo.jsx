import { React, useState } from "react";
import IMG from "../../assets/images/004.jpg";

export default function ServiceInfo() {
  return (
    <div style={{ marginTop: 20, textAlign: "center" }}>
      <img src={IMG} alt="서비스 소개" style={{ width: 350 }} />
      <div
        style={{
          marginTop: 30,
          marginLeft: 30,
          marginRight: 30,
          textAlign: "start",
        }}
      >
        <p>
          본 서비스는 블록체인 기술을 기반으로 한 <br /> '전자처방전' 관련
          서비스입니다.
        </p>
        <p
          style={{
            marginTop: 30,
            fontWeight: "bold",
            fontSize: "20px",
            color: "#5681EF",
          }}
        >
          [ 주요 서비스 ]
        </p>
        <p>전자처방전 발급 및 관리</p>
        <p>전자처방전을 이용한 약국 조제 접수</p>
        <p
          style={{
            marginTop: 30,
            fontWeight: "bold",
            fontSize: "20px",
            color: "#5681EF",
          }}
        >
          [ 기대 효과 ]
        </p>
        <p>정기 처방 및 반복 처방 효율화</p>
        <p>민감 정보 안정성 확보</p>
      </div>
    </div>
  );
}
