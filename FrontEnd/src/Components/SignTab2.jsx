import { React } from "react";
import { Link } from "react-router-dom";

export default function SignTab2(props) {
  const h3 = {
    color: "#5681EF",
    marginTop: 50,
    fontWeight: "bold",
  };
  return (
    <div class="text-center" style={{ marginTop: 180 }}>
      <h2 style={{ fontWeight: "bold" }}>가입이 완료 되었습니다</h2>
      <h3 style={h3}>약쏙을 시작해보세요</h3>
      <div style={{ marginTop: 150 }}>
        <Link to="/login">
          <button
            style={{
              color: "white",
              backgroundColor: "#5FD068",
              height: 50,
              width: 250,
              borderRadius: 10,
              borderColor: "transparent",
            }}
          >
            로그인
          </button>
        </Link>
      </div>
      <div>
        <Link to="/serviceinfo">
          <button
            class="mt-3"
            style={{
              color: "white",
              backgroundColor: "#5681EF",
              height: 50,
              width: 250,
              borderRadius: 10,
              borderColor: "transparent",
            }}
          >
            이용가이드
          </button>
        </Link>
      </div>
    </div>
  );
}
