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
      <div>
        <div>
          <label>아이디</label>
          <input />
        </div>
        <div>
          <label>비밀번호</label>
          <input />
          <input />
        </div>
      </div>
      <div>약관</div>
      <input onChange={changeCheck} type="checkbox" />
      <div>
        <button onClick={Next}>다음 단계로</button>
      </div>
    </div>
  );
}
