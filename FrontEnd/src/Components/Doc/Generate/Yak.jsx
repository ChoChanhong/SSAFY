import {React} from "react";


export default function PerInfo(props){

    function D(){
        console.log(props.info.key)
        props.Delete(props.info.key)
    }

    return (
    <div>
        <span>{props.info.mname}</span>
        <span>{props.info.inj_q}</span>
        <span>{props.info.inj_t}</span>
        <span>{props.info.inj_d}</span>
        <span>{props.info.pernumber}</span>
        <span>{props.info.usage}</span>
        <button onClick={D}>삭제</button>
    </div>)
}