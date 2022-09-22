import {React,useState} from "react"
import DocNavbar from "../../Components/DocNavbar"
import Signup1 from "../../Components/DocSignUp/SignupTab1"
import Signup2 from "../../Components/DocSignUp/SignupTab2"
import Signup3 from "../../Components/DocSignUp/SignupTab3"
import "./Signup.css"

export function Signup(){

    const [step,setStep] = useState(1)
    const tab = { 1:<Signup1 setStep={setStep}/> , 2:<Signup2 setStep={setStep}/> , 3:<Signup3 setStep={setStep}/>}

    return(
        <div>
            <DocNavbar id = "Navbar"/>
            <div id = "signuptabbar">
                <div class = {step===1 ? "signuptabSelected" : "signuptab"}>
                    <p>Step 01</p>
                    <p>이용약관 동의</p>
                </div>
                <div class = {step===2 ? "signuptabSelected" : "signuptab"}>
                    <p>Step 02</p>
                    <p>회원정보 작성</p>
                </div>
                <div class = {step===3 ? "signuptabSelected" : "signuptab"}>
                    <p>Step 03</p>
                    <p>회원가입 완료</p>
                </div>
            </div>
            <div>
                {tab[step]}
            </div>
        </div>
    )
}