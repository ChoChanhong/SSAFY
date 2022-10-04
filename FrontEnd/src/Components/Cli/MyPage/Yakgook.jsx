import { areArraysEqual } from "@mui/base";
import { React,useState } from "react";

export default function Yakgook(props) {

  return (
    <div>
        <div>{props.data.userName}</div>
        <div>전화번호 : {props.data.pharmTel}</div>
        <div>주소 : {props.data.pharmAddr}</div>      
    </div>
  );
}
