import { areArraysEqual } from "@mui/base";
import { React,useState } from "react";

export default function Yakgook(props) {

    function AA(){
        props.click(props.idx)
    }
  return (
    <div>
        <div>{props.data.userName}</div>
        <div>전화번호 : {props.data.pharmTel}</div>
        <div>주소 : {props.data.pharmAddr}</div>
        <div>
            <button onClick={AA}>조제접수</button>
        </div>
        
    </div>
  );
}
