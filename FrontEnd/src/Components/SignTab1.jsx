import { React, useState } from "react";
import { Link } from "react-router-dom";

export default function SignTab1(props) {
  const [check, setCheck] = useState(false);
  function Next() {
    if (check) {
      props.setStep(2);
    } else {
      alert("약관에 동의해 주세요");
    }
  }
  function changeCheck(e) {
    console.log(e.target.checked);
    setCheck(e.target.checked);
  }
  return (
    <div>
      <div class="mt-5">
        <div>
          <label >아이디</label>
          <input placeholder="아이디를 입력해주세요"/>
        </div>
        <div>
          <label>비밀번호</label>
          <input placeholder="비밀번호를 입력해주세요"/>
          <input placeholder="비밀번호를 재입력해주세요"/>
        </div>
      </div>
      <span class="mt-2">약관</span>
      <div>여긴 약관이 들어갈 자리입니당</div>
      <input onChange={changeCheck} type="checkbox" />
      <div>
        <button onClick={Next}>다음 단계로</button>
      </div>
    </div>
  );
}
