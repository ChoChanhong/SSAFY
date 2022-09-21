import { React } from "react";
import { Link } from "react-router-dom";

export default function SignTab2(props) {
  return (
    <div class="mt-5 text-center">
      <h1>가입이 완료 되었습니다</h1>
      <h3>약쏙을 시작해보세요</h3>
      <div style={{ margin: 150 }}>
        <Link to="/login">
          <button
            style={{
              color: "white",
              backgroundColor: "#5FD068",
              height: 50,
              width: 200,
              borderRadius: 10,
              borderColor: "transparent"
            }}
          >
            로그인
          </button>
        </Link>
        <Link to="">
          <button
            class="mt-3"
            style={{
              color: "white",
              backgroundColor: "#5681EF",
              height: 50,
              width: 200,
              borderRadius: 10,
              borderColor: "transparent"
            }}
          >
            이용가이드
          </button>
        </Link>
      </div>
    </div>
  );
}
