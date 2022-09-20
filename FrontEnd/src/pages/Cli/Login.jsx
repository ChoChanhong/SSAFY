import React from "react"
import { useMediaQuery } from "react-responsive"
import { Link } from "react-router-dom"
import BackGround from "../../Components/BackGround"

export default function Login(){

    const isPc = useMediaQuery ({
        query: "(min-width:768px)"
      });
      
    return(
        <div id="webapp-containor">
            <div>
                { isPc ? <BackGround/> : null }
            </div>
            <div id="login">
                <div>로고</div>
                <div>일반사용자 로그인</div>
                <input/>
                <input/>
                <button>로그인</button>
                <Link to="/signup">회원가입</Link>
                <div>
                    <span>아이디를 잊었다면?</span>
                    <Link to="">아이디 찾기</Link>
                </div>
                <div>
                    <Link to="/doc/login">의사</Link>
                    <span>/</span>
                    <Link to="/ph/login">약사</Link>
                </div>
            </div>
        </div>
        
    )
}