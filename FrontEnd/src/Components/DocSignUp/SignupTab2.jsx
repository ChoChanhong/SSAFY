import {React,useState} from "react"
import {Link} from "react-router-dom"

export default function Signup2(props){  

    function Next(){
        props.setStep(3)
    }

    return(
     <div>
        <div>
            <h2>회원가입</h2>
            <span>필수 입력 항목입니다.</span>
        </div>
        <div>
            <div>
                <label>아이디</label>
                <input/>
            </div>
            <div>
                <label>비밀번호</label>
                <input/>
            </div>
            <div>
                <label>비밀번호 확인</label>
                <input/>
            </div>
            <div>
                <label>병원명</label>
                <input/>
            </div>
            <div>
                <label>요양기관번호</label>
                <input/>
            </div>
            <div>
                <label>대표원장성명</label>
                <input/>
            </div>
            <div>
                <label>면허번호</label>
                <input/>
            </div>
            <div>
                <label>대표이메일</label>
                <input/>
                <input/>
                <select>
                </select>
            </div>
            <div>
                <label>주소(도로명)</label>
                <input/>
                <input/>
            </div>
            
        </div>
        <div>
            <Link to = '/'>취소</Link>
            <button onClick={Next}>가입신청</button>
        </div>
     </div>   
    )
}