import {React} from "react";


export default function PerInfo(props){

    function D(){
        console.log(props.info.key)
        props.Delete(props.info.key)
    }

    return (
    <div >
        <span>약품명 : {props.info.dName}</span>
        <span>{props.info.dosage}</span>
        <span>{props.info.doseNum}</span>
        <span>{props.info.dosePeriod}</span>
        <span>{props.info.prescriptionCount}</span>
        <span>{props.info.howtoTake}</span>
        <button onClick={D}>삭제</button>
    </div>)
}