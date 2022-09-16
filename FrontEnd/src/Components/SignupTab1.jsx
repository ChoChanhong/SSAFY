import {React,useState} from "react"
import {Link} from "react-router-dom"

export default function Signup1(props){  
    const [check,setCheck] = useState(false)
    function Next(){
        if(check){props.setStep(2)}
        else{ alert("약관에 동의해 주세요") }
        
    }
    function changeCheck(e){
        console.log(e.target.checked)
        setCheck(e.target.checked)
        
    }
    return(
     <div>
        <div>
            <h2>[이용약관]</h2>
            <span>약관을 읽으신 후 동의 여부를 체크해 주세요.</span>
        </div>
        <div>
            이용약관 내용
        </div>
        <div>
            <label>동의</label>
            <input onChange={changeCheck} type="checkbox"/>
        </div>
        <div>
            <Link to = '/'>동의안함</Link>
            <button onClick={Next}>동의함</button>
        </div>
     </div>   
    )
}