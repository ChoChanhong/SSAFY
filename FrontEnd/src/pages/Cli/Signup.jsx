import { React, useState } from "react";
import { useMediaQuery } from "react-responsive";
import BackGround from "../../Components/BackGround";
import SignTab1 from "../../Components/SignTab1";
import SignTab2 from "../../Components/SignTab2";
import "./Signup.css";

export default function Signup() {
  const [step, setStep] = useState(1);
  const tab = {
    1: <SignTab1 setStep={setStep} />,
    2: <SignTab2 setStep={setStep} />,
  };

  const isPc = useMediaQuery({
    query: "(min-width:768px)",
  });

  return (
    <div id="webapp-containor">
      <div>{isPc ? <BackGround /> : null}</div>
      <div id="login">
        <div class="mt-3 d-flex justify-content-center">
          <img src="img/002.png" alt="로고" width={50} />
          <h2 class="fw-bold mt-3">회원가입</h2>
        </div>
        <div id="signuptabber" class="mt-5 d-flex justify-content-center">
          <div
            className={step === 1 ? "signuptabSelected" : "signuptab"}
            style={{ marginRight: 30 }}
          >
            <span style={{ marginLeft: 15 }}>Step01 회원가입</span>
            <div>______________________</div>
          </div>
          <div className={step === 2 ? "signuptabSelected" : "signuptab"}>
            <span style={{ marginLeft: 15 }}>Step02 가입완료</span>
            <div>______________________</div>
          </div>
        </div>
        {tab[step]}
      </div>
    </div>
  );
}
