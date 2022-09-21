import { React,useState } from "react";


export default function Reception(){
    const [tab,setTab] = useState(0)
    const tabs = []
    function move(e){
        console.log(e.target.id)
        setTab(e.target.id)
    }

    return(
        <div>
            <div>조제접수</div>
            <div>
                <span id='0' onClick={move}>조제 접수</span>
                <span id='1' onClick={move}>접수 확인</span>
            </div>
            <div>{tabs[tab]}</div>
        </div>
    )
}