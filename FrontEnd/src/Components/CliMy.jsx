import { React,useState } from "react";


export default function CliMy(){
    const [tab,setTab] = useState(0)
    const tabs = []
    function move(e){
        console.log(e.target.id)
        setTab(e.target.id)
    }

    return(
        <div>
            <div>마이페이지</div>
            <div>[사용자이름]님, 안녕하세요!</div>
            <div>
                <span id='0' onClick={move}>기본정보</span>
                <span id='1' onClick={move}>지갑정보</span>
            </div>
            <div>{tabs[tab]}</div>
        </div>
    )
}