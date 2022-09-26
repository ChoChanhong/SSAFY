import { React,useState } from "react";

export default function CliInfo(){

    const [ Snum,setSnum ] = useState('') 
    const info = { name : "", phone : "", address : "", wallet : ""}
    function numberCheck(e){
        const a = e.target.value.replace(/^(\d{6})(\d{7})$/, `$1-$2`);
        setSnum(a)
        if(Snum.length===14){
            console.log(Snum)
            //axios로 환자정보 받아옴
        }
    }

    return(
        <div>
            <div>
                <div>환자정보</div>
                <div>
                    <label>환자명</label>
                    <input value = {info.name} readOnly/>
                </div>
                <div>
                    <label>주민번호</label>
                    <input value = {Snum} onChange={numberCheck}/>
                </div>
                <div>
                    <label>전화번호</label>
                    <input value = {info.phone} readOnly/>
                </div>
                <div>
                    <label>주소</label>
                    <input value = {info.address} readOnly/>
                </div>
            </div>
            <div>
                <div>
                    <span>발급일자</span>
                    <span>수령여부</span>
                    <span>처방전 주소</span>
                </div>
                <div>
                    이전 처방내역 반복문으로
                </div>
            </div>
        </div>
    )
}