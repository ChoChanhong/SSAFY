import Web3 from "web3";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCommentMedical,
  faShareNodes,
} from "@fortawesome/free-solid-svg-icons";
import React, { useState, useEffect } from "react";
import "./MyPerscription.css";
import { abi, nftCA } from "../../../web3Config";

export default function RecentPer() {
  const [hosNamed, setHosName] = useState("");
  const [account, setAccount] = useState("");

  const web3 = new Web3(window.ethereum);
  const contract = new web3.eth.Contract(abi, nftCA);

  useEffect(() => {
    getAccount();
    checkList();
  }, []);

  const getAccount = async () => {
    try {
      if (window.ethereum) {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });

        setAccount(accounts[0]);
        const list = await contract.methods
          .getAllListFromAccount(account)
          .call();
      } else {
        alert("Install Metamask!");
      }
    } catch (error) {
      console.error(error);
    }
  };

  async function checkList() {
    const web3 = new Web3(window.ethereum);
    const contract = new web3.eth.Contract(abi, nftCA);

    // 매개변수로 넘겨준 주소를 거쳐간 모든 처방전 조회
    // 처방전 형식의 배열 리턴
    const list = await contract.methods
      .getAllListFromAccount("0xC78Bf04D11874042A6fcfC2B8D66b297C24D5c4B")
      .call();

    setHosName(list[0].hosname);

    console.log(list[0].hosname);
  }

  const getContract = async () => {
    const data = {
      userName: "Test1",
      hosName: "Test2",
      pharName: "Test2",
      dCode: "aaa",
      dName: ["bb", "cc"],
      dosage: [1, 2],
      doseNum: [2, 2],
      dosePeriod: [2, 2],
      dispensingCount: 1,
      prescriptionCount: 1,
      howtoTake: "asddasda",
      pubDate: 123123123,
      prepDate: 23123123,
    };

    const web3 = new Web3(window.ethereum);
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });

    console.log(accounts);

    console.log(contract._jsonInterface);

    const count = await contract.methods
      .getMintedTokens()
      .call()
      .then((id) => console.log("Token: ", id));

    const prsList = await contract.methods
      .getPreScriptionByIndex(0)
      .call()
      .then((id) => console.log("List: ", id));
  };

  async function tttt(e) {
    e.preventDefault();

    const web3 = new Web3(window.ethereum);
    const contract = new web3.eth.Contract(abi, nftCA);

    const tttt = await contract.methods.preScriptions(1).call();
    console.log(tttt.hosName);
  }

  async function transferTopatient(e) {
    e.preventDefault();

    const web3 = new Web3(window.ethereum);
    const contract = new web3.eth.Contract(abi, nftCA);

    const tf = await contract.methods
      .transferTopatient(
        "0x8A63F16AcED00b39edb79c9bec9731abC9Bad61b",
        "0xC78Bf04D11874042A6fcfC2B8D66b297C24D5c4B",
        0
      )
      .send({ from: "0x8A63F16AcED00b39edb79c9bec9731abC9Bad61b" });
    console.log(tf);
  }

  async function balanceOf(e) {
    e.preventDefault();

    const web3 = new Web3(window.ethereum);
    const contract = new web3.eth.Contract(abi, nftCA);

    const bof = await contract.methods
      .balanceOf("0xC78Bf04D11874042A6fcfC2B8D66b297C24D5c4B")
      .call();
    console.log(bof);

    const totalSupply = await contract.methods.totalSupply().call();
    console.log(totalSupply);

    const toobi = await contract.methods
      .tokenOfOwnerByIndex("0xC78Bf04D11874042A6fcfC2B8D66b297C24D5c4B", 0)
      .call();
    console.log(toobi);

    // const tokens = [];
    // for (let i = 0; i < bof; i++) {
    //   let toobi = await contract.methods.tokenOfOwnerByIndex('0xC78Bf04D11874042A6fcfC2B8D66b297C24D5c4B', i).call()
    //   console.log(toobi);
    //   tokens.push(toobi);
    // }
  }

  async function alltokenOfOwner(e) {
    e.preventDefault();

    const web3 = new Web3(window.ethereum);
    const contract = new web3.eth.Contract(abi, nftCA);

    const alltoOwn = await contract.methods
      .alltokenOfOwner("0xC78Bf04D11874042A6fcfC2B8D66b297C24D5c4B")
      .call();
    console.log(alltoOwn.length);
    console.log(alltoOwn);
  }

  async function getBalanceOf(e) {
    e.preventDefault();

    const web3 = new Web3(window.ethereum);
    const contract = new web3.eth.Contract(abi, nftCA);

    const getB = await contract.methods
      .getBalanceOf("0xC78Bf04D11874042A6fcfC2B8D66b297C24D5c4B")
      .call();

    console.log(getB);
  }

  return (
    <div>
      <div className="myBox">
        <div style={{ margin: 20 }}>최근 처방</div>
        <div style={{ border: "solid" }}>처방내역</div>
        <div style={{ marginTop: 30 }}>
          <button id="bluebutton" style={{ height: "100" }}>
            조제접수
          </button>
        </div>
        <div
          class="d-flex justify-content-evenly"
          style={{ marginTop: 50, marginBottom: 30 }}
        >
          <button id="textbutton">
            <FontAwesomeIcon
              icon={faCommentMedical}
              style={{ marginRight: 10 }}
            />
            상세내역
          </button>
          <button id="textbutton">
            <FontAwesomeIcon icon={faShareNodes} style={{ marginRight: 10 }} />
            내보내기
          </button>
        </div>
      </div>
      <button onClick={getContract}> 테스트</button>
      <button onClick={transferTopatient}> transferTopatient </button>
      <button onClick={balanceOf}> balanceOf </button>
      <button onClick={alltokenOfOwner}> alltokenOfOwner </button>
      <button onClick={getBalanceOf}> getBalanceOf </button>
      <button onClick={tttt}> tttt </button>
    </div>
  );
}
