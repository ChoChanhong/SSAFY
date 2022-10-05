import {React,useState,useEffect} from "react";
import { useNavigate } from "react-router-dom";
import Yakgook from "./Yakgook";
import axios from "axios";


export default function ReceptionOrder() {


    const URL = "https://j7e205.p.ssafy.io/api/pharms/list";
    const navigate = useNavigate()
    const [list,setList] = useState('') //약국들의 리스트
    const [state,setState] = useState('') //현재 선택중인 약국, ''이면 전체보기
    const [selected,setSelected] = useState('') //선택된 처방전번호
    const [reserve,setReserve] = useState(false) //예약창 보여줄지

    useEffect(()=>{
        axios
        .get(URL)
        .then(
            function(res){
                console.log(res.data)
                setList(res.data.map((x,idx)=><div>
                                                <Yakgook click={click} data={x} idx={idx}/>    
                                                { state ==='' ? <button onClick={()=>click(idx)}>조제접수</button> : '처방전'}
                                                </div>))
            }
            
        )
    },[state])

    function click(x){
        setState(x)
    }

    function close(){
        setState('')
        setReserve(false)
    }

    function reservation(){
        
    }

    return(
        <div>
            {state==='' ? list : list[state] }
            {state==='' ? '' : 
            <div>
                <div>처방전 목록</div>
                <div>처방전 목록</div>
                <div>처방전 목록</div>
                <div>처방전 목록</div>
                <button onClick={()=>setReserve(true)}>예약</button>
                <button onClick={close}>닫기</button>
            </div>}
            { reserve ? 
                <div>
                    <div>원하시는 수령시간을 선택해 주세요 </div>
                                       
                    {/* 예약창 확인을 누르면 예약정보 전송*/}
                    <div>
                        <select>
                            <option selected>오전</option>
                            <option>오후</option>
                        </select>
                        <select>
                            <option selected>00</option>
                            <option>01</option>
                            <option>02</option>
                            <option>03</option>
                            <option>04</option>
                            <option>05</option>
                            <option>06</option>
                            <option>07</option>
                            <option>08</option>
                            <option>09</option>
                            <option>10</option>
                            <option>11</option>
                            <option>12</option>
                        </select>
                        시
                        <select>
                            <option selected>00</option>
                            <option>10</option>
                            <option>20</option>
                            <option>30</option>
                            <option>40</option>
                            <option>50</option>
                        </select>
                        분
                    </div>
                    <button>확인</button>
                    <button onClick={()=>setReserve(false)}>취소</button>
                </div>
                     : ''}
        </div>
    )
}