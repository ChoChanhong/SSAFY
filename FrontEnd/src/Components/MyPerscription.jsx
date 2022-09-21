import { React,useState } from "react";
import RecentPer from "./RecentPer";
import RegularPer from "./RegularPer";
import Perlog from "./Perlog";


export default function MyPerscription(){
    const [tab,setTab] = useState(0)
    const tabs = [<RecentPer/>,<RegularPer/>,<Perlog/>]
    function move(e){
        console.log(e.target.id)
        setTab(e.target.id)
    }

    return(
        <div>
            <div>My처방</div>
            <div>
                <span id='0' onClick={move}>최근 처방</span>
                <span id='1' onClick={move}>정기 처방</span>
                <span id='2' onClick={move}>처방 이력</span>
            </div>
            <div>{tabs[tab]}</div>
        </div>
    )
}