import Web3 from "web3";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCommentMedical,
  faShareNodes,
} from "@fortawesome/free-solid-svg-icons";
import React, { useState, useEffect } from "react";
import "./MyPerscription.css";
import { abi, nftCA } from "../../../web3Config";

export default function RecentPer(props) {

  const recent = props.list[props.list.length-1]//가장최근처방
  //최근처방의 약 리스트
  const [yak,setYak] = useState('')
  useEffect(()=>{
    if(recent){
      const tmp = recent.dName.map((x,idx)=>
                                        <div>
                                        <span>{x}</span>
                                        <span>{recent.dosage[idx]}</span>
                                        <span>{recent.doseNum[idx]}</span>
                                        <span>{recent.dosePeriod[idx]}</span>
                                        <span>{recent.howtoTake[idx]}</span>
                                        </div>)
      setYak(tmp)
      console.log(tmp,'tmp')
    } 
  },[recent])

  return (
    <div>
      <div className="myBox">
        <div style={{ margin: 20 }}>
          <div>
            <span>병원명 : {recent ? recent.hosName : ''}</span>
          </div>
          <div>
            <span>처방일 : {recent ? recent.pubDate : ''}</span>            
          </div>
          <div>
            <span>처방 횟수 : {recent ? recent.dispensingCount : ''}/{recent ? recent.prescriptionCount : ''}</span>            
          </div>
          <div>
            <span>질병코드 : {recent ? recent.dCode : ''}</span>          
          </div>
        </div>
        <div style={{ border: "solid" }}>
          <div>처방내용</div>
          <div>약이름 투약량 투약횟수 투약일 복용방법</div>
          <div>{recent ? yak : ''}</div>
        </div>
        <div style={{ marginTop: 30 }}>
          <button id="bluebutton" style={{ height: "100" }} onClick={props.directMove}>
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
    </div>
  );
}
