import {React,useState,useEffect} from "react";
import { useNavigate } from "react-router-dom";
import Yakgook from "./Yakgook";
import axios from "axios";


export default function ReceptionOrder() {


    const URL = "https://j7e205.p.ssafy.io/api/pharms/list";
    const navigate = useNavigate()
    const [list,setList] = useState('')
    const [state,setState] = useState('')
    const [selected,setSelected] = useState(0)

    useEffect(()=>{
        axios
        .get(URL)
        .then(
            function(res){
                console.log(res.data)
                setList(res.data.map((x,idx)=><Yakgook click={click} data={x} idx={idx}/>))
            }
            
        )
    },[])

    function click(x){
        console.log(x)
        setState(x)
    }

    function close(){
        setState('')
    }

    function reserve(){
        //selected 된 컴포넌트를 가지고 이동
        navigate()
    }

    return(
        <div>
            {state==='' ? list : list[state] }
            {state==='' ? '' : 
            <div>
                자신이 받은 처방전을 여기에 표시
                <button onClick={reserve}>예약</button>
                <button onClick={close}>닫기</button>
            </div>}
        </div>
    )
}