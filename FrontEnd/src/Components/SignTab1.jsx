import { TextField, AspectRatio, Typography, Checkbox } from "@mui/joy";
import { React, useState } from "react";
// import { Link } from "react-router-dom";

export default function SignTab1(props) {
  const [check, setCheck] = useState(false);
  const [name, setName] = useState("");
  const [id, setID] = useState("");
  const [password, setPass] = useState("");
  const [passconfirm, SetPassCon] = useState("");
  const buttonStyle = {
    textDecoration: "none",
    color: "white",
    fontWeight: "bold",
    backgroundColor: "#5681EF",
    height: 50,
    width: 200,
    borderRadius: 10,
    borderColor: "transparent",
  };
  function Next() {
    if (password === passconfirm) {
      if (check) {
        //엑시오스로 로그인 정보 보내기
        props.setStep(2);
      } else {
        alert("약관에 동의해 주세요");
      }
    } else {
      alert("비밀번호가 일치하지 않습니다");
    }
  }
  function changeCheck(e) {
    console.log(e.target.checked);
    setCheck(e.target.checked);
  }
  function changeName(e) {
    setName(e.target.value);
  }

  function changeID(e) {
    setID(e.target.value);
  }

  function changePass(e) {
    setPass(e.target.value);
  }

  function changePasscon(e) {
    SetPassCon(e.target.value);
  }

  return (
    <div>
      <div style={{ marginTop: 20 }}>
        <strong>이름</strong>
        <TextField placeholder="이름을 입력해주세요" onChange={changeName} />
        <div style={{ marginTop: 15 }}>
          <strong>이메일 @</strong>
          <TextField placeholder="이메일을 입력해주세요" onChange={changeID} />
        </div>
      </div>
      <div style={{ marginTop: 10 }}>
        <strong>비밀번호</strong>
        <TextField
          placeholder="비밀번호를 입력해주세요"
          onChange={changePass}
          type="password"
        />
        <TextField
          placeholder="비밀번호를 다시입력해주세요"
          onChange={changePasscon}
          style={{ marginTop: 5 }}
          type="password"
        />
      </div>
      <div style={{marginTop: 10}}>
        <strong>약관</strong>
        <AspectRatio variant="outlined">
          <Typography level="inherit" fontWeight="lg">
            여긴 약관이 들어갈 자리입니당
          </Typography>
        </AspectRatio>
      </div>
      <div class="mt-3 d-flex justify-content-center">
        <Checkbox
          size="sm"
          onChange={changeCheck}
          label="약관에 동의합니다."
        />
      </div>
      <div class="mt-5 d-flex justify-content-center">
        <button onClick={Next} style={buttonStyle}>
          다음 단계
        </button>
      </div>
    </div>
  );
}
