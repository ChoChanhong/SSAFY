import { React, useState } from "react";
import { useMediaQuery } from "react-responsive";
import BackGround from "../Components/BackGround";
import ServiceInfo from "../Components/ServiceInfo";
import UserGuide from "../Components/UserGuide";
import Logo from "../assets/images/001.png"
import "./Intro.css";

export function Intro() {
  const [step, setStep] = useState(1);
  const tab = {
    1: <ServiceInfo/>,
    2: <UserGuide/>,
  };

  const isPc = useMediaQuery({
    query: "(min-width:768px)",
  });

  return (
    <div id="webapp-containor">
      <div>{isPc ? <BackGround /> : null}</div>
      <div id="main">
        <div className="mb-5">
          <img style={{ height: 100 }} src={Logo} alt="로고" />
        </div>
        <div id="introTabber" class="mt-5 d-flex justify-content-center">
          <div
            className={step === 1 ? "introTabSelected" : "introTab"}
            style={{ marginRight: 30 }}
          >
            <span style={{ marginLeft: 15 }} onClick={()=>{setStep(1)}}>서비스 소개</span>
            <div>______________________</div>
          </div>
          <div className={step === 2 ? "introTabSelected" : "introTab"}>
            <span style={{ marginLeft: 15 }} onClick={()=>{setStep(2)}}>이용가이드</span>
            <div>______________________</div>
          </div>
        </div>
        {tab[step]}
      </div>
    </div>
  );
}
