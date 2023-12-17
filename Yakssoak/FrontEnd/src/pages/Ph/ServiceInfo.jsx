import React from "react";
import PhMainNav from "../../Components/PhMainNav";
import Jojae from "../../assets/serviceinfo/ph/jojae.JPG";
import Log from "../../assets/serviceinfo/ph/jojaelog.JPG";

export function ServiceInfo() {
  const Box = {
    margin: "50px 100px",
    display: "flex",
  };

  const numBox = {
    color: "white",
    backgroundColor: "#5681EF",
    borderRadius: "5px",
    width: "50px",
    height: "30px",
    marginRight: "20px",
    textAlign: "center",
  };

  const guideText = {
    display: "flex",
    marginTop: "20px",
    fontSize: "20px",
  };

  return (
    <div>
      <PhMainNav />
      <div
        style={{
          borderBottom: "solid 5px #5681EF",
          marginLeft: "70px",
          marginRight: "1000px",
        }}
      >
        <p
          style={{
            textAlign: "start",
            marginTop: "20px",
            fontSize: "40px",
          }}
        >
          '약쏙'을 올바르게 사용하는 방법
        </p>
      </div>
      <div style={Box}>
        <div>
          <div
            style={{
              borderBottom: "solid 5px #5681EF",
              marginRight: "1000px",
            }}
          ></div>
          <div style={{ display: "flex", fontSize: "20px" }}>
            <div style={numBox}>1</div>
            <p>회원가입시 전자지갑 주소를 연동해줍니다.</p>
            <p style={{ color: "#5681EF", marginLeft: "15px" }}>
              (MetaMask 설치 및 가입 필요)
            </p>
          </div>
          <div style={guideText}>
            <div style={numBox}>2-1</div>
            <p>
              '조제 접수'에서 접수된 처방전을 확인하고 조제 정보를 입력할 수
              있습니다.
            </p>
          </div>
          <div style={guideText}>
            <div style={numBox}>2-2</div>
            <p>
              조제 정보를 입력한 후, 조제 접수를 누르면 환자는 접수 확인이
              가능합니다.
            </p>
          </div>
          <img src={Jojae} alt="generate" style={{ width: "750px" }} />
        </div>
        <div>
          <div style={guideText}>
            <div style={numBox}>3</div>
            <p>'조제이력 조회'에서 이전 조제 내역들을 조회할 수 있습니다.</p>
          </div>
          <img src={Log} alt="find" style={{ width: "750px" }} />
        </div>
      </div>
    </div>
  );
}
