import { React, useState } from "react";
// import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";


export default function SignTab1(props){  
    const [check,setCheck] = useState(false)
    const [name,setName] = useState('')
    const [id,setID] = useState('')
    const [password,setPass] = useState('')
    const [passconfirm,SetPassCon] = useState('')
    function Next(){
        if(password===passconfirm){
            if(check){
                //엑시오스로 로그인 정보 보내기
                props.setStep(2)}
            else{ alert("약관에 동의해 주세요") }
        }
        else{alert('비밀번호가 일치하지 않습니다')}
        
        
    }
    function changeCheck(e){
        console.log(e.target.checked)
        setCheck(e.target.checked)        
    }
    function changeName(e){
        setName(e.target.value)
    }

    function changeID(e){
        setID(e.target.value)
    }

    function changePass(e){
        setPass(e.target.value)
    }

    function changePasscon(e){
        SetPassCon(e.target.value)
    }

    return(
        <div>
            <div>
                <label>이름</label>
                <input placeholder="이름을 입력해주세요"onChange={changeName}/>
                <label>이메일 @</label>
                <input placeholder="이메일을 입력해주세요"onChange={changeID}/>
            </div>
            <div>
                <label>비밀번호</label>
                <input placeholder="비밀번호를 입력해주세요" onChange={changePass} type="password"/>
                <input placeholder="비밀번호를 다시입력해주세요" onChange={changePasscon} type="password"/>
                <span class="mt-2">약관</span>
            </div>
            <hr />
            <div>여긴 약관이 들어갈 자리입니당</div>
            <hr />
            <div class="mt-3 d-flex">
                <p>약관에 동의한다면 체크해주세요</p>
                <input onChange={changeCheck} type="checkbox" />
            </div>
            <div class="mt-5 d-flex justify-content-center">
                <Button onClick={Next} size="lg">다음 단계로</Button>
            </div>  
        </div>
  );
}
