import React from "react"
import { useMediaQuery } from "react-responsive"
import { Link } from "react-router-dom"
import BackGround from "../Components/BackGround"
import "./Main.css"

export default function Main(){

    const isPc = useMediaQuery ({
        query: "(min-width:768px)"
      });
      
    return(
        <div id="webapp-containor">
            <div>
                { isPc ? <BackGround/> : null }
            </div>
            <div id="main">
                <div>로고</div>
                <div>슬라이드 화면</div>
                <Link to="/login">시작하기</Link>
                <Link to="/signup">회원가입</Link>
                <div>
                    <Link to="/doc/login">의사</Link>
                    <Link to="/ph/login">약사</Link>
                </div>
            </div>
        </div>
        
    )
}