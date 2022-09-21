import { React } from "react";
import { Link } from "react-router-dom";

export default function SignTab2(props) {
  return (
    <div>
      <div>가입이 완료 되었습니다</div>
      <Link to="/login">로그인</Link>　||　
      <Link to="">이용가이드</Link>
    </div>
  );
}
