import React, { useState } from "react";
import { Link } from "react-router-dom";
import DocNavbar from "../../Components/Doc/DocNavbar";
import CliInfo from "../../Components/Doc/Generate/CliInfo";
import PerInfo from "../../Components/Doc/Generate/Perinfo";
import PerDetail from "../../Components/Doc/Generate/PerDetail";

export default function Generate() {

  const [name,setName] = useState('')
  const [wallet,setWallet] = useState('')
  const [userSeq,setUserSeq] = useState('')


  function changeName(x){
    setName(x)
  }

  function changeWallet(x){
    setWallet(x)
  }

  function changeUserSeq(x){
    setUserSeq(x)
  }

  return (
    <div>
      <div>
        <DocNavbar />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-start",
          margin: "30px 50px 0px 50px",
        }}
      >
        <CliInfo changeName = { changeName } changeWallet={ changeWallet } changeUserSeq={ changeUserSeq }/>
        <PerInfo name = {name} wallet = {wallet} userSeq= { userSeq }/>
        <PerDetail />
      </div>
    </div>
  );
}
