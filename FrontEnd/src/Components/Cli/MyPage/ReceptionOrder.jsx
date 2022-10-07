import { React, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Yakgook from "./Yakgook";
import axios from "axios";
import "./ReceptionOrder.css";
import Web3 from "web3";
import { abi, nftCA } from "../../../web3Config";

export default function ReceptionOrder() {
  const URL = "https://j7e205.p.ssafy.io/api/pharms/list";
  const navigate = useNavigate();
  const [list, setList] = useState(""); //약국들의 리스트
  const [per, setPer] = useState(""); //처방전 리스트
  const [state, setState] = useState(""); //현재 선택중인 약국, ''이면 전체보기
  const [selected, setSelected] = useState(0); //선택된 처방전번호
  const [reserve, setReserve] = useState(false); //예약창 보여줄지

  useEffect(() => {
    axios.get(URL).then(function (res) {
      console.log(res.data, "data");
      setList(
        res.data.map((x, idx) => (
          <div
            style={{
              borderBottom: "solid 1px darkgray",
              margin: "0px 20px 20px 20px",
            }}
          >
            <div
              style={{
                textAlign: "start",
                marginLeft: "25px",
              }}
            >
              <Yakgook click={click} data={x} idx={idx} />
              {state === "" ? (
                <div style={{ margin: "15px 0px 15px 150px" }}>
                  <button id="bluebutton" onClick={() => click(idx)}>
                    조제접수
                  </button>
                </div>
              ) : (
                <div style={{ margin: "10px 0px ", marginLeft: "100px" }}>
                  [ 처방전 목록 ]
                </div>
              )}
            </div>
          </div>
        ))
      );
    });
  }, [state]);

  useEffect(() => {
    checkList();
  }, [selected]);

  async function checkList() {
    const web3 = new Web3(window.ethereum);
    const contract = new web3.eth.Contract(abi, nftCA);
    const account = await web3.eth.requestAccounts();
    const myAccount = account[0];
    // 매개변수로 넘겨준 주소를 거쳐간 모든 처방전 조회
    // 처방전 형식의 배열 리턴
    //const per = await contract.methods.getAllListFromAccount(myAccount).call();
    const tokenId = await contract.methods.alltokenOfOwner(myAccount).call();
    console.log(tokenId, "token");
    const per = [];
    for (let i = 0; i < tokenId.length; i++) {
      per.push(
        await contract.methods.getPreScriptionByIndex(tokenId[i]).call()
      );
    }
    console.log(per, "per");
    const tmp = per.map((yak, idx) => (
      <div
        onClick={() => {
          setSelected(idx);
        }}
      >
        <div>{idx === selected ? "----------------" : ""}</div>
        <div>{yak[1]}</div>
        <div>{yak.pubDate}</div>
        <div>{yak.prescriptionCount === "1" ? "단기" : "정기"}</div>
        <button>상세내역</button>
        <div>{idx === selected ? "----------------" : ""}</div>
      </div>
    ));
    setPer(tmp);
  }

  function click(x) {
    setState(x);
  }

  function close() {
    setState("");
    setReserve(false);
  }

  async function reservation() {
    const web3 = new Web3(window.ethereum);
    const contract = new web3.eth.Contract(abi, nftCA);
    const account = await web3.eth.requestAccounts();
    const myAccount = account[0];

    const tokenId = await contract.methods.alltokenOfOwner(myAccount).call();
    await contract.methods
      .transferPreScription(
        myAccount,
        list[state].props.children.props.children[0].props.data
          .userWalletAddress,
        tokenId[per.length - selected - 1]
      )
      .send({ from: myAccount });

    console.log(state);
    console.log(
      list[state].props.children.props.children[0].props.data.userWalletAddress,
      "약국지갑번호"
    );
    console.log(per.length - selected - 1, "몇번째 처방전인지");
  }

  return (
    <div style={{ marginTop: 20 }}>
      {state === "" ? list : list[state]}
      {state === "" ? (
        ""
      ) : (
        <div>
          <div>{per}</div>
          <button
            onClick={() => setReserve(true)}
            style={{
              color: "white",
              backgroundColor: "#5681EF",
              borderColor: "transparent",
              borderRadius: "5px",
              width: "80px",
              marginRight: "30px",
            }}
          >
            예약
          </button>
          <button
            onClick={close}
            style={{
              color: "white",
              backgroundColor: "red",
              borderColor: "transparent",
              borderRadius: "5px",
              width: "80px",
            }}
          >
            닫기
          </button>
        </div>
      )}
      {reserve ? (
        <div>
          <div>조제를 신청하시겠습니까?</div>
          {/* 예약창 확인을 누르면 예약정보 전송*/}
          <button
            onClick={reservation}
            style={{
              color: "white",
              backgroundColor: "#5681EF",
              borderColor: "transparent",
              borderRadius: "5px",
              width: "80px",
              marginRight: "30px",
            }}
          >
            확인
          </button>
          <button
            onClick={() => setReserve(false)}
            style={{
              color: "white",
              backgroundColor: "red",
              borderColor: "transparent",
              borderRadius: "5px",
              width: "80px",
            }}
          >
            취소
          </button>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
