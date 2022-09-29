import { React, useState } from "react";
import { Link } from "react-router-dom";
import { Select } from "@mui/joy";
import { Option } from "@mui/joy";
import "./PhSignup.css";

export default function Signup2(props) {
  function Next() {
    props.setStep(3);
  }

  return (
    <div className="signBox">
      <div className="titleBox">
        <h3 className="title">회원가입</h3>
        {/* <div style={{ color: "red", marginTop: 15 }}>
          ※<span style={{ color: "black" }}> 필수 입력 항목입니다.</span>
        </div> */}
      </div>
      <div>
        <div
          className="infoBox"
          style={{ borderBottom: "solid 1px lightgray" }}
        >
          <label className="infoLabel">아이디</label>
          <input placeholder="아이디를 입력해주세요." />
          <button id="checkButton">중복체크</button>
        </div>
        <div
          className="infoBox"
          style={{ borderBottom: "solid 2px lightgray" }}
        >
          <label className="infoLabel">비밀번호</label>
          <input style={{ width: 500 }} />
          <label className="infoLabel" style={{ marginLeft: 20 }}>
            비밀번호 재확인
          </label>
          <input style={{ width: 500 }} />
        </div>
        <p style={{ color: "darkgray", marginTop: 15, marginLeft: 10 }}>
          8자리 이상 16자리 이하 영문, 숫자, 특수문자를 반드시 포함하시기
          바랍니다.
        </p>
        <div className="infoBox" style={{ borderTop: "solid 2px lightgray" }}>
          <label className="infoLabel">병원명</label>
          <input style={{ width: 500 }} />
          <label className="infoLabel" style={{ marginLeft: 20 }}>
            요양기관번호
          </label>
          <input style={{ width: 500 }} />
        </div>
        <div className="infoBox">
          <label className="infoLabel">대표원장성명</label>
          <input style={{ width: 500 }} />
          <label className="infoLabel" style={{ marginLeft: 20 }}>
            면허번호
          </label>
          <input style={{ width: 500 }} />
        </div>
        <div className="infoBox">
          <label className="infoLabel">대표이메일</label>
          <input style={{ width: 400 }} />
          <p style={{ margin: "10px 15px" }}>@</p>
          <input style={{ width: 300 }} />
          <Select
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
              <input />
              <button id="checkButton" style={{ width: 150 }}>
                우편번호찾기
              </button>
            </div>
            <input style={{ width: 800 }} />
          </div>
        </div>
        <div
          className="infoBox"
          style={{ borderBottom: "solid 2px lightgray" }}
        >
          <label className="infoLabel">병원 연락처</label>
          <input style={{ width: 300 }} />
          <label className="infoLabel" style={{ marginLeft: 20 }}>
            사업자 등록번호
          </label>
          <input style={{ width: 500 }} />
        </div>
      </div>
      <div className="buttonBox" style={{ marginTop: 100 }}>
        <Link to="/">
          <button
            className="button"
            style={{ color: "#5681EF", backgroundColor: "transparent" }}
          >
            취소
          </button>
        </Link>
        <button className="button" onClick={Next}>
          가입신청
        </button>
      </div>
    </div>
  );
}
