import React, {useState, useEffect} from "react";
import axios from "axios";
import { Link } from 'react-router-dom';

import './LoginForm.css'

export default function LoginForm(){

    const [id,setId] = useState('')
    const [password,setPass] = useState('')
    const localStorage = window.localStorage
    const URL = 'https://j7e205.p.ssafy.io/api/hospitals/login'

    function setAuthorizationToken(token){
        if(token){
            axios.defaults.headers.common[
                "Authorization"
              ] = `Bearer ${token}`;
        }else{
            delete axios.defaults.headers.common["Authorization"];
        }
    }

    function IdChange(e){
        setId(e.target.value)
    }
    function PasswordChange(e){
        setPass(e.target.value)
    }


    function Send(){
        console.log(id,password)
        axios.post(URL,{ "userId" : id , "userPassword" : password })
        .then(
            function(res){
                localStorage.setItem('login-token', res.data.accessToken)
                setAuthorizationToken(localStorage.getItem('login-token'))
            }
        )

    }

    return(
        <div id="loginbox">
            <div class = "login">
                <h1 class = "title">병원로그인</h1>
                <p>약쏙(전자처방전)을 이용하기 위해서는 회원가입이 필요합니다</p>
                <label >아이디</label>
                <input onChange = {IdChange} class = "a"/>
                <label>비밀번호</label>
                <input onChange = {PasswordChange} type="password" class = "a"/>
                <button onClick={Send} id = "loginbutton">로그인</button>
                <Link to="/" class = "link" >아이디/비밀번호 찾기</Link>
            </div>
            <div class = "info">
                <img class = "logo"/>
                <div class = "buttonbox">
                    <Link to="/doc/signup" class = "linkbutton">회원가입</Link>
                    <Link to="/" class = "linkbutton">의사가이드</Link>
                </div>
            </div>
        </div>
    )
}