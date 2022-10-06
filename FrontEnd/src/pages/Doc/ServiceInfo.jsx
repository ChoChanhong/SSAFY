import React from "react";
import DocMainNav from "../../Components/Doc/DocMainNav";
import Find from "../../assets/serviceinfo/doc/find.JPG";
import Generate from "../../assets/serviceinfo/doc/generate.JPG";

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
      <DocMainNav />
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
            <p>'처방전 생성'에서 환자 조회 후, 처방전을 생성할 수 있습니다.</p>
          </div>
          <div style={guideText}>
            <div style={numBox}>2-2</div>
            <p>
              처방할 내용을 입력 후, 내용 업로드를 누르면 내용을 확인 할 수
              있습니다.
            </p>
          </div>
          <div style={guideText}>
            <div style={numBox}>2-3</div>
            <p>
              장기 처방 경우, 처방 내용 업로드를 횟수에 맞게 여러번 업로드
              합니다.
            </p>
          </div>
          <div style={guideText}>
            <div style={numBox}>2-4</div>
            <p>
              처방전 생성 버튼을 클릭하면, 환자의 지갑으로 생성된 처방전이
              전송됩니다.
            </p>
          </div>
          <img src={Generate} alt="generate" style={{ width: "750px" }} />
        </div>
        <div>
          <div style={guideText}>
            <div style={numBox}>3</div>
            <p>'처방전 조회'에서 이전 처방 내역들을 조회할 수 있습니다.</p>
          </div>
          <img src={Find} alt="find" style={{ width: "750px" }} />
        </div>
      </div>
    </div>
  );
}
