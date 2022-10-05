import { minWidth } from "@mui/system";
import { React, useState, useRef, useEffect } from "react";
import Yak from "./Yak";
import { useNavigate } from "react-router-dom";
import setAuthorizationToken from "../../../utils/AuthorizationToken";
// import { nftContract, web3 } from "../../web3Config";
import { abi, nftCA } from "../../../web3Config";
import Web3 from "web3";
import axios from "axios";
// import detectEthereumProvider from "@metamask/detect-provider";
import "./Perinfo.css";

export default function PerInfo(props) {
  const navigate = useNavigate();
  const URL = "https://j7e205.p.ssafy.io/api/hospitals/me";
  const localStorage = window.localStorage;
  const [info, setInfo] = useState("");

  //날짜 계산용
  let now = new Date();
  let year = now.getFullYear();
  let month = now.getMonth() + 1;
  let date = now.getDate();
  let day = year + "-" + month + "-" + date;



  useEffect(() => {
    const token = localStorage.getItem("login-token");
    setAuthorizationToken(token);
    axios
      .get(URL)
      .then(function (res) {
        console.log(res.data);
        setInfo(res.data);
      })
      .catch(function (err) {
        alert("올바른 접근 방식이 아닙니다.");
        navigate("/doc/");
      });
  }, []);


  

  

  const [docname, setDocname] = useState(""); //의사이름
  const [dname, setDname] = useState(""); //질병분류기호
  const [Perlog, setPlog] = useState([]); //처방내역
  const [yaks, setYaks] = useState([]);

  const dCode = useRef();
  const dName = useRef();
  const dosage = useRef();
  const doseNum = useRef();
  const dosePeriod = useRef();
  const prescriptionCount = useRef();
  const howtoTake = useRef();

  function Add() {
    let tmp = Perlog;
    tmp.push({
      key: Perlog.length,
      dCode: dCode.current.value,
      dName: dName.current.value,
      dosage: dosage.current.value,
      doseNum: doseNum.current.value,
      dosePeriod: dosePeriod.current.value,
      prescriptionCount: prescriptionCount.current.value,
      howtoTake: howtoTake.current.value,
    });
    console.log("tmp :" + tmp);
    setPlog(tmp);
    setYaks(Perlog.map((log) => <Yak info={log} Delete={Delete} />));
  }

  function Delete(idx) {
    let tmp = Perlog;
    delete tmp[idx];
    setPlog(tmp);
    setYaks(Perlog.map((log) => <Yak info={log} Delete={Delete} />));
  }
  // const mint = web3.asdasd.contarc

 async function submit() {


    const prescription = {
      userName : String(props.name),
      hosName : String(info.userName),
      pharName: "",
      dCode : String(dCode.current.value),
      dName : Perlog.map((x) => String(x.dName)),
      dosage : Perlog.map(((x) => parseInt(x.dosage))),
      doseNum : Perlog.map((x) => parseInt(x.doseNum)),
      dosePeriod : Perlog.map((x) => parseInt(x.dosePeriod)),
      dispensingCount : Perlog.map((x) => 0),
      prescriptionCount : parseInt(prescriptionCount.current.value),
      // howtoTake : Perlog.map((x) => String(x.howtoTake)),
      howtoTake : Perlog.map((x) => String(x.howtoTake)),
      pubDate : 123,
      prepDate : 123,

    }
    
   
    console.log('--------------------------------')
    console.log(prescription);
    // console.log(ss);
   
    // e.preventDefault();
    const web3 = new Web3(window.ethereum);
    const contract = new web3.eth.Contract(abi, nftCA);
    const account = await web3.eth.requestAccounts();
    const myAccount = account[0];
    // let d = prescription;
    console.log(contract);
    console.log(myAccount);
    await contract.methods
      .setDoctorAuth(myAccount)
      .send({ from: myAccount });
    console.log("222222222222222222222222222222222");
     await contract.methods
      .mint(prescription)
      .send({ from: myAccount });
    console.log(" 처방전 발급 됐음");
    // 전송 환자 주소 넣어줘야함
    //  await contract.methods.transferDoctorToPatient(myAccount, "0x4feC718B4fB4931d645f2F3E144560e26c2980a7", 0)
    //  .send({ from : myAccount})
    // console.log("처방전 전송 완료")
    
  }

  return (
    <div id="Per">
      <div>
        <div id="Pername">
          <p style={{ marginTop: 10, marginLeft: 10 }}>처방 정보</p>
        </div>
        <div id="Perline">
          <div>
            <label id="PerLabel">기관명</label>
            <input id="PerInput" value={info.userName} readOnly />
          </div>
          <div>
            <label id="PerLabel">담당의사</label>
            <input id="PerInput" style={{ width: 185 }} />
          </div>
          <div>
            <label id="PerLabel">처방일</label>
            <input id="PerInput" readOnly value={day} />
          </div>
          <div>
            <label id="PerLabel">질병분류기호</label>
            <input id="PerInput" ref={dCode} style={{ width: 170, marginLeft: 10 }} />
          </div>
          <div>
            <div>
              <label id="PerLabel">약품명</label>
              <input id="PerInput" ref={dName} />
            </div>
            <div>
              <label id="PerLabel">1회 투약량</label>
              <input
                id="PerInput"
                style={{ width: 80 }}
                ref={dosage}
                defaultValue={1}
                type="number"
                min="1"
              />
            </div>
            <div>
              <label id="PerLabel">1일 투약횟수</label>
              <input
                id="PerInput"
                style={{ width: 80 }}
                ref={doseNum}
                defaultValue={1}
                type="number"
                min="1"
              />
            </div>
            <div>
              <label id="PerLabel">총 투약일수</label>
              <input
                id="PerInput"
                style={{ width: 80 }}
                ref={dosePeriod}
                defaultValue={1}
                type="number"
                min="1"
                max="14"
              />
            </div>
            <div>
              <label id="PerLabel">처방횟수</label>
              <input
                id="PerInput"
                style={{ width: 80 }}
                ref={prescriptionCount}
                defaultValue={1}
                type="number"
                min="1"
              />
            </div>
            <div>
              <label id="PerLabel">용 법</label>
              <input id="PerInput" ref={howtoTake} />
            </div>
            <button id="Addbutton" onClick={Add}>
              내용 업로드
            </button>
          </div>
        </div>
      </div>
      <div>
        <div id="Pername">
          <p style={{ marginTop: 10, marginLeft: 10 }}>처방 내역</p>
        </div>
        <div id="Perline">
          <div>
            <label id="PerLabel">처방내역</label>
            <div>
              {Perlog}
              <div>--------</div>
              {yaks}
              <div>--------</div>
            </div>
          </div>
          <div style={{ textAlign: "center", marginTop: 20 }}>
            <button id="Genbutton" onClick={submit}>
              처방하기
            </button>
            <div>
              {/* <button onClick={Mint}> 민팅테스트</button> */}
            </div>
          
          </div>
        </div>
      </div>
    </div>
  );
}
