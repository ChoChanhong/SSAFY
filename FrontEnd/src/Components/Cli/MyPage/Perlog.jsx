import Web3 from "web3";
import React, { useState, useEffect } from "react";
import { abi, nftCA } from "../../../web3Config";



export default function Perlog(props) {

  const list = props.list.map((yak)=><div>
                                        <div>{yak[1]}</div>
                                        <div>발행일 :{yak.pubDate}</div>
                                        <div>{yak.prescriptionCount === '1' ? '단기' : '정기' }</div>
                                        <button>상세내역</button>
                                      </div>)

  useEffect(() => {
    console.log(props.list,'처방이력페이지')
    console.log(props.list[0][1])
  }, []);




  return (
    <div>
      <div className="myBox">
        <div style={{ margin: 20 }}>처방 이력</div>
        <div>
          {list}
        </div>
      </div>
    </div>
  );
}
