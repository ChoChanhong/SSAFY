import Web3 from "web3";
import React, { useState, useEffect } from "react";
import { abi, nftCA } from "../../../web3Config";
export default function RegularPer() {
  const [list, setList] = useState([]);

  useEffect(() => {
    getList();
  }, []);

  // 현재 내 지갑의 주소를 거쳐간 모든 처방전 출력
  async function getList() {
    const web3 = new Web3(window.ethereum);
    const contract = new web3.eth.Contract(abi, nftCA);
    const account = await web3.eth.requestAccounts();
    const myAccount = account[0];

    // 리스트 형태로 출력하는데 이거 크기가 동적인데 어떻게 저장?
    const allList = await contract.methods
      .getAllListFromAccount(myAccount)
      .call();
    setList(allList);

    console.log(allList);
  }

  return (
    <div>
      <div className="myBox">
        <div style={{ margin: 20 }}>정기 처방</div>
      </div>
    </div>
  );
}
