import React from "react";
import Wallet from "../../assets/serviceinfo/cli/wallet.JPG";
import My from "../../assets/serviceinfo/cli/My.JPG";
import Order from "../../assets/serviceinfo/cli/order.JPG";

export default function UserGuide() {
  const numBox = {
    color: "white",
    backgroundColor: "#5681EF",
    borderRadius: "5px",
    width: "30px",
    height: "25px",
    marginRight: "20px",
  };

  const guideText = {
    display: "flex",
    marginTop: "20px",
  };

  return (
    <div style={{ marginTop: 20, textAlign: "center" }}>
      <h4 style={{ color: "#5FD068" }}>약쏙을 올바르게 사용하는 법</h4>
      <div style={guideText}>
        <div style={numBox}>1</div>
        <p>회원가입시 전자지갑 주소를 연동해줍니다.</p>
      </div>
      <p style={{ fontSize: "13px", color: "#5681EF" }}>
        (MetaMask 설치 및 가입 필요)
      </p>
      <img src={Wallet} alt="지갑" style={{ width: "200px" }} />
      <div style={guideText}>
        <div style={numBox}>2</div>
        <p>'My처방'에서 처방전을 조회할 수 있습니다.</p>
      </div>
      <img src={My} alt="My처방" style={{ width: "200px" }} />
      <div style={guideText}>
        <div style={numBox}>3-1</div>
        <p>조제접수 시, 원하는 약국을 선택해줍니다</p>
      </div>
      <div style={guideText}>
        <div style={numBox}>3-2</div>
        <p>조제를 원하는 처방전을 선택해줍니다</p>
      </div>
      <div style={guideText}>
        <div style={numBox}>4</div>
        <p>조제 완료 시, '조제 확인' 탭에서 확인 가능합니다</p>
      </div>
      <img src={Order} alt="조제접수" style={{ width: "200px" }} />
    </div>
  );
}
