import {React,useState} from "react"
import { Link } from 'react-router-dom';
export default function Signup3(){
    


    return(
     <div>
        <div>가입이 완료 되었습니다</div>
        <div>약쏙을 시작해 보세요</div>
        <Link to="/doc/login">로그인</Link>
        <Link to="">의사 가이드</Link>
     </div>   
    )
}