import { TextField, AspectRatio, Typography, Checkbox } from "@mui/joy";
import { React, useState } from "react";
import axios from "axios";
// import { Link } from "react-router-dom";

export default function SignTab1(props) {
  const [check, setCheck] = useState(false);
  const [name, setName] = useState(""); //이름
  const [id, setID] = useState(""); //아이디
  const [email, setEmail] = useState(""); //이메일
  const [password, setPass] = useState(""); //비밀번호
  const [passconfirm, setPassCon] = useState(""); //비밀번호확인
  const [rrn,setRrn] = useState('') //주민등록번호
  const [account, setAccount] = useState('') //지갑번호

  const URL= "https://j7e205.p.ssafy.io/api/patients/regist";

  const blueStyle = {
    textDecoration: "none",
    color: "white",
    fontWeight: "bold",
    backgroundColor: "#5681EF",
    height: 50,
    width: 200,
    borderRadius: 10,
    borderColor: "transparent",
  };
  const greenStyle = {
    textDecoration: "none",
    color: "white",
    fontWeight: "bold",
    backgroundColor: "#5FD068",
    height: 50,
    width: 200,
    borderRadius: 10,
    borderColor: "transparent",
  };

  function Next() {
    if (password === passconfirm) {
      if (check) {
        //엑시오스로 로그인 정보 보내기
        console.log(
          {
            "patientEmail": email,
            "patientId": id,
            "patientName": name,
            "patientPassword": password,
            "patientRRN": rrn,
            "patientWalletAddr": account
          }
        )
        axios
        .post(URL,
          {
            patientEmail: email,
            patientId: id,
            patientName: name,
            patientPassword: password,
            patientRRN: rrn,
            patientWalletAddr: account
          })
        .then(props.setStep(2))
        .catch(function(err){
          alert(err)
        })
        
      } else {
        alert("약관에 동의해 주세요");
      }
    } else {
      alert("비밀번호가 일치하지 않습니다");
    }
  }

  const getAccount = async () => {
    try {
      if (window.ethereum) {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });

        setAccount(accounts[0]);
      } else {
        alert("Install Metamask!");
      }
    } catch (error) {
      console.error(error);
    }
  };

  function changeRRN(e) {
    const a = e.target.value.replace(/^(\d{6})(\d{7})$/, `$1-$2`);
    setRrn(a);
    if (rrn.length === 14) {
      console.log(rrn);
    }
  }


  return (
    <div>
      <div style={{ marginTop: 20 }}>
        <strong>이름</strong>
        <TextField placeholder="이름을 입력해주세요" onChange={(e)=>{setName(e.target.value)}} />
        <div style={{ marginTop: 15 }}>
          <strong>지갑주소</strong>
          <TextField value={account} readOnly/>
        </div>
        <div style={{ marginTop: 15 }}>
          <strong>아이디</strong>
          <TextField placeholder="아이디를 입력해주세요" onChange={(e)=>{setID(e.target.value)}} />
        </div>
        <div style={{ marginTop: 15 }}>
          <strong>이메일 @</strong>
          <TextField placeholder="이메일을 입력해주세요" onChange={(e)=>{setEmail(e.target.value)}} />
        </div>
        <div style={{ marginTop: 15 }}>
          <strong>주민등록번호</strong>
          <TextField placeholder="이메일을 입력해주세요" value={rrn} onChange={changeRRN} />
        </div>
      </div>
      <div style={{ marginTop: 10 }}>
        <strong>비밀번호</strong>
        <TextField
          placeholder="비밀번호를 입력해주세요"
          onChange={(e)=>{setPass(e.target.value)}}
          type="password"
        />
        <TextField
          placeholder="비밀번호를 다시입력해주세요"
          onChange={(e)=>{setPassCon(e.target.value)}}
          style={{ marginTop: 5 }}
          type="password"
        />
      </div>
      <div style={{ marginTop: 10 }}>
        <strong>약관</strong>
        <AspectRatio variant="outlined">
          <Typography level="inherit" fontWeight="lg">
            여긴 약관이 들어갈 자리입니당
          </Typography>
        </AspectRatio>
      </div>
      <div className="mt-3 d-flex justify-content-center">
        <Checkbox size="sm" onChange={()=>{setCheck(!check)}} label="약관에 동의합니다." />
      </div>
      <div className="mt-3 d-flex justify-content-center">
        <button onClick={getAccount} style={greenStyle}>지갑연결</button>
      </div>
      <div className="mt-3 d-flex justify-content-center">
        <button onClick={Next} style={blueStyle}>
          다음 단계
        </button>
      </div>
    </div>
  );
}
