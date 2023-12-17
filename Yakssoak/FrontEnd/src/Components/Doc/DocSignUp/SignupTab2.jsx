import { React, useState } from "react";
import { Link } from "react-router-dom";
import { Modal, Select } from "@mui/joy";
import { Option } from "@mui/joy";
import axios from "axios";
import { Navigate } from "react-router-dom";
import DaumPostCode from "react-daum-postcode";
import "./DocSignup.css";

export default function Signup2(props) {

  const URL = "https://j7e205.p.ssafy.io/api/hospitals/regist";


  const [show, setShow] = useState(false); //주소 모달
  const [id, setId] = useState(""); //아이디
  const [address, setAddress] = useState(""); //주소
  const [daddress, setDAddress] = useState(""); //상세주소
  const [CRN,setCRN] = useState(''); //요양기관번호
  const [pass, setPass] = useState(""); //비밀번호
  const [passcon, setPasscon] = useState(""); //비밀번호확인
  const [license, setLicense] = useState(""); //면허번호
  const [account, setAccount] = useState(""); //지갑
  const [name, setName] = useState(""); //대표원장성명
  const [hname, setHname] = useState(""); //병원이름
  const [email, setEmail] = useState(""); //대표이메일
  const [emaill, setEmaill] = useState(""); //이메일도메인
  const [tel, setTel] = useState(""); //전화번호


  function Next() {
    if(pass===passcon){
      console.log(
        {
          "hospitalAddr": address+daddress,
          "hospitalCRN": CRN,
          "hospitalCode": "0000",
          "hospitalDoctor": "김철민",
          "hospitalEmail": "hosfy@ssafy.com",
          "hospitalId": "hosfy",
          "hospitalLicense": "00000",
          "hospitalName": "철이 정형외과",
          "hospitalPassword": "hosfy",
          "hospitalTel": "000-0000-0000",
          "hospitalWalletAddr": "bbbbbbbbbbbbbbbbbbbbbb"
        }
      )
      // props.setStep(3);}
  }}

  function changeShow() {
    setShow(true);
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

  const handleComplete = (data) => {
    let fullAddress = data.address;
    let extraAddress = "";
    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }
    console.log(fullAddress);
    setAddress(fullAddress);
    //fullAddress -> 전체 주소반환
  };

  return (
    <div className="signBox" style={{ marginTop: 25 }}>
      <div className="titleBox">
        <h3 className="title">회원가입</h3>
      </div>
      <div>
        <div
          className="infoBox"
          style={{ borderBottom: "solid 1px lightgray" }}
        >
          <label className="infoLabel">아이디</label>
          <input onChange={(e)=>{setId(e.target.value)}} placeholder="아이디를 입력해주세요." />
          <button id="checkButton">중복체크</button>
        </div>
        <div
          className="infoBox"
          style={{ borderBottom: "solid 2px lightgray" }}
        >
          <label className="infoLabel">비밀번호</label>
          <input onChange={(e)=>{setPass(e.target.value)}} style={{ width: 500 }} />
          <label className="infoLabel" style={{ marginLeft: 20 }}>
            비밀번호 재확인
          </label>
          <input onChange={(e)=>{setPasscon(e.target.value)}}style={{ width: 500 }} />
        </div>
        <p style={{ color: "darkgray", marginTop: 15, marginLeft: 10 }}>
          8자리 이상 16자리 이하 영문, 숫자, 특수문자를 반드시 포함하시기
          바랍니다.
        </p>
        <div className="infoBox" style={{ borderTop: "solid 2px lightgray" }}>
          <label className="infoLabel">병원명</label>
          <input style={{ width: 500 }} onChange={(e)=>{setHname(e.target.value)}}/>
          <label className="infoLabel" style={{ marginLeft: 20 }}>
            요양기관번호
          </label>
          <input onChange={(e)=>{setCRN(e.target.value)}} style={{ width: 500 }} />
        </div>
        <div className="infoBox">
          <label className="infoLabel">대표원장성명</label>
          <input onChange={(e)=>{setName(e.target.value)}} style={{ width: 500 }} />
          <label className="infoLabel" style={{ marginLeft: 20 }}>
            면허번호
          </label>
          <input onChange={(e)=>{setLicense(e.target.value)}} style={{ width: 500 }} />
        </div>
        <div className="infoBox">
          <label className="infoLabel">대표이메일</label>
          <input onChange={(e)=>{setEmail(e.target.value)}}style={{ width: 400 }} />
          <p style={{ margin: "10px 15px" }}>@</p>
          <input value={emaill} style={{ width: 300 }} />
          <Select
            onChange={(e)=>{setEmaill(e.target.innerText)}}
            style={{ height: 20, marginTop: 8, marginLeft: 15 }}
            placeholder="이메일을 선택해주세요."
            size="sm"
          >
            <Option value="naver.com">naver.com</Option>
            <Option value="gmail.com">gmail.com</Option>
            <Option value="hanmail.net">hanmail.net</Option>
          </Select>
        </div>
        <div
          style={{
            display: "flex",
            height: 100,
            borderBottom: "solid 1px lightgray",
          }}
        >
          <label className="infoLabel" style={{ height: 100, paddingTop: 30 }}>
            주소(도로명)
          </label>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div>
              <button
                id="checkButton"
                onClick={changeShow}
                style={{ width: 150 }}
              >
                우편번호찾기
              </button>
              <input
                disabled
                placeholder="우편번호찾기로 주소를 입력하세요."
                readOnly
                value={address}
                style={{ width: 700 }}
              />
            </div>
            <input
              style={{ width: 500, marginLeft: 175 }}
              placeholder="상세주소를 입력해주세요."
              onChange={(e)=>{setDAddress(e.target.value)}}
            />
          </div>
          <div className="adressBox">
            {show ? (
              <DaumPostCode onComplete={handleComplete} className="post-code" />
            ) : (
              ""
            )}
          </div>
        </div>
        <div
          className="infoBox"
          style={{ borderBottom: "solid 1px lightgray" }}
        >
          <label className="infoLabel">병원 연락처</label>
          <input onChange={(e)=>{setTel(e.target.value)}}style={{ width: 500 }} />
        </div>
        <div
          className="infoBox"
          style={{ borderBottom: "solid 2px lightgray" }}
        >
          <label className="infoLabel">지갑 등록</label>
          <input readOnly value={account}/>
          <button id="checkButton" onClick={getAccount}>
            지갑연결
          </button>
        </div>
      </div>
      <div className="buttonBox" style={{ marginTop: 30 }}>
        <Link to="/">
          <button
            className="docbutton"
            style={{ color: "#5681EF", backgroundColor: "transparent" }}
          >
            취소
          </button>
        </Link>
        <button
          className="docbutton"
          style={{ color: "#5681EF", backgroundColor: "transparent" }}
          onClick={Next}
        >
          가입신청
        </button>
      </div>
    </div>
  );
}
