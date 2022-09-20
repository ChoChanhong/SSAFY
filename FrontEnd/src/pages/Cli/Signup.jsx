import {React,useState} from "react"
import { useMediaQuery } from "react-responsive"
import BackGround from "../../Components/BackGround"
import SignTab1 from "../../Components/SignTab1"
import SignTab2 from "../../Components/SignTab2"


export default function Signup(){
    const [step,setStep] = useState(1)
    const tab = { 1:<SignTab1 setStep={setStep}/> , 2:<SignTab2 setStep={setStep}/>}

    const isPc = useMediaQuery ({
        query: "(min-width:768px)"
      });
      
    return(
        <div id="webapp-containor">
            <div>
                { isPc ? <BackGround/> : null }
            </div>
            <div id="login">
                <div>로고 회원가입</div>
                <div>
                    <div>
                        <span>Step01 회원가입</span>
                        <div>___________</div>
                    </div>
                    <div>
                        <span>Step02 가입완료</span>
                        <div>___________</div>
                    </div>
                </div>
                {tab[step]}
            </div>
        </div>
        )}