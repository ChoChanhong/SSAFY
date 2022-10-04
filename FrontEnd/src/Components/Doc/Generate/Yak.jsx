import {React} from "react";


export default function PerInfo(props){

    function D(){
        console.log(props.info.key)
        props.Delete(props.info.key)
    }

    return (
    <div >
        <div>약품명 : {props.info.dName}</div>
        <div>1회 투약량 : {props.info.dosage}</div>
        <div>1일 투약횟수 : {props.info.doseNum}</div>
        <div>총 투약일수 : {props.info.dosePeriod}</div>
        <div>용법 :{props.info.howtoTake}</div>
        <button onClick={D}>삭제</button>
    </div>)
}