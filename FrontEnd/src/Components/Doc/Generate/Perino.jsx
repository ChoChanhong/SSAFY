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


  const Mint = async (e) => {
    e.preventDefault();
    console.log(1111);
    const data = {
      userName: "Test102",
      hosName: "Test0",
      pharName: "Test0",
      dCode: "aaa",
      dName: ["bb", "rr"],
      dosage: [1, 2],
      doseNum: [2, 2],
      dosePeriod: [2, 2],
      dispensingCount: 1,
      prescriptionCount: 1,
      howtoTake: "asddasda",
      pubDate: 12322123,
      prepDate: 231355,
    };
    console.log(data);
    const web3 = new Web3(window.ethereum);
    const contract = new web3.eth.Contract(abi, nftCA);
    console.log(contract);
    await contract.methods
      .setDoctorAuth("0x4aDD641353eDc52325Cce4198b60AE17B8037f54")
      .send({ from: "0x4aDD641353eDc52325Cce4198b60AE17B8037f54" });
    console.log("222222222222222222222222222222222");
    await contract.methods
      .mint(data)
      .send({ from: "0x4aDD641353eDc52325Cce4198b60AE17B8037f54" });
    console.log(" 처방전 발급 11111111");
    const totalSupply = await contract.methods.totalSupply().call();
    const prsList = await contract.methods.getPreScriptionByIndex(0).call();
    console.log("1111111111111111111111111111111111111111111");
    console.log(data);
    console.log(totalSupply);
    console.log(prsList);
  };
  //의사가 환자한테 전송 할때
  // const Transfer = async (e) => {
  //   e.preventDefault();
  //   console.log(" 처방전 전송 의사 -> 환자 ");
  //   const web3 = new Web3(window.ethereum);
  //   const contract = new web3.eth.Contract(abi, nftCA);
  //   // 현재 소유한 토큰 아이디 가져옴.
  //   const tokenId = contract.methods.alltokenOfOwner.call();
  //   const { e1 } = await contract.methods.transferDoctorToPatient(
  //     "의사주소",
  //     "환자주소",
  //     tokenId
  //   );
  // };
  // // 환자가 약사한테 전송
  // const Transfer2 = async (e) => {
  //   e.preventDefault();
  //   console.log(" 처방전 전송 환자 -> 약사");
  //   const web3 = new Web3(window.ethereum);
  //   const contract = new web3.eth.Contract(abi, nftCA);
  //   // 현재 소유한 토큰 아이디 가져옴.
  //   const tokenId = contract.methods.alltokenOfOwner.call();
  //   const { e1 } = await contract.methos.transferPreScription(
  //     "환자주소",
  //     "약사주소",
  //     "토큰아이디"
  //   );
  // };

  // // 약사가 환자한테
  // const Transfer3 = async (e) => {
  //   e.preventDefault();
  //   console.log(" 처방전 전송 약사 -> 환자");
  //   const web3 = new Web3(window.ethereum);
  //   const account = await web3.eth.requestAccounts();
  //   const myAccount = account[0];
  //   const contract = new web3.eth.Contract(abi, nftCA);
  //   // 현재 소유한 토큰 아이디 가져옴.
  //   const tokenId = contract.methods.alltokenOfOwner.call();
  //   const { e1 } = await contract.methos.transferPharmacyToPatient(
  //     myAccount,
  //     "환자주소",
  //     "토큰아이디"
  //   );
  // };
  // // 처방전 전체 조회
  // const Search = async (e) => {
  //   e.preventDefault();
  //   console.log("조회할거임");
  //   const web3 = new Web3(window.ethereum);
  //   const account = await web3.eth.requestAccounts();
  //   const myAccount = account[0];
  //   const contract = new web3.eth.Contract(abi, nftCA);
  //   // 매개변수로 넘겨준 주소를 거쳐간 모든 처방전 조회
  //   // 처방전 형식의 배열 리턴
  //   const list = contract.methods.getAllListFromAccount(myAccount).call();
  // };

  // // 조건부 조회
  // const Search2 = async (e) => {
  //   e.preventDefault();
  //   console.log("조건부 조회할거임");
  //   const web3 = new Web3(window.ethereum);
  //   const account = await web3.eth.requestAccounts();
  //   const myAccount = account[0];
  //   const contract = new web3.eth.Contract(abi, nftCA);
  //   // 현재주소 가 조회할 주소로 보낸 처방전만 검색
  //   // 처방전 형식의 배열 리턴
  //   const list = contract.methods
  //     .getPatientListFromAccount("현재주소", "조회할 주소")
  //     .call();
  // };
  // 조제 asdasdasd
  // create aaaa

  let now = new Date();
  let year = now.getFullYear();
  let month = now.getMonth() + 1;
  let date = now.getDate();
  let day = year + "-" + month + "-" + date;

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
      userName : "aa",
      hosName : "bb",
      pharName: "cc",
      dCode : "wwwww",
      dName : Perlog.map((x) => x.dName),
      dosage : Perlog.map(((x) => parseInt(x.dosage))),
      doseNum : Perlog.map((x) => parseInt(x.doseNum)),
      dosePeriod : Perlog.map((x) => parseInt(x.dosePeriod)),
      dispensingCount : 0,
      // 얘가 안읽어와짐
      prescriptionCount : 0,
      howtoTake : Perlog.map((x) => x.howtoTake),
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
    const totalSupply = await contract.methods.totalSupply().call();
    const prsList = await contract.methods.getPreScriptionByIndex(0).call();
    console.log("1111111111111111111111111111111111111111111");
    console.log(prescription);
    console.log(totalSupply);
    console.log(prsList);
    
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
            <input id="PerInput" readOnly />
          </div>
          <div>
            <label id="PerLabel">담당의사</label>
            <input id="PerInput" style={{ width: 185 }} readOnly />
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
