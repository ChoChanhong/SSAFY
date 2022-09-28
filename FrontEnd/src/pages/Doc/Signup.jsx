import { React, useState } from "react";
import DocMainNav from "../../Components/DocMainNav";
import Signup1 from "../../Components/DocSignUp/SignupTab1";
import Signup2 from "../../Components/DocSignUp/SignupTab2";
import Signup3 from "../../Components/DocSignUp/SignupTab3";
import "./Signup.css";

export function Signup() {
  const [step, setStep] = useState(1);
  const tab = {
    1: <Signup1 setStep={setStep} />,
    2: <Signup2 setStep={setStep} />,
    3: <Signup3 setStep={setStep} />,
  };

  return (
    <div>
      <DocMainNav id="Navbar" />
      <div id="signuptabbar">
        <div className={step === 1 ? "signuptabSelected" : "signuptab"}>
          <span style={{fontSize:"20px"}}>Step 01</span>
          <span style={{fontSize:"13px"}}>이용약관 동의</span>
        </div>
        <div className={step === 2 ? "signuptabSelected" : "signuptab"}>
          <span style={{fontSize:"20px"}}>Step 02</span>
          <span style={{fontSize:"13px"}}>회원정보 작성</span>
        </div>
        <div className={step === 3 ? "signuptabSelected" : "signuptab"}>
          <span style={{fontSize:"20px"}}>Step 03</span>
          <span style={{fontSize:"13px"}}>회원가입 완료</span>
        </div>
      </div>
      <div>{tab[step]}</div>
    </div>
  );
}
