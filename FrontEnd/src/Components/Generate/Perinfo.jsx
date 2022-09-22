import React from "react";

export default function PerInfo(){

    let now = new Date();
    let year = now.getFullYear()
    let month = now.getMonth() +1
    let date = now.getDate()
    let day = year+'-'+month+'-'+date

    return(
        <div>
            <div>처방 정보</div>
            <div>
                <div>
                    <label>기관명</label>
                    <input readOnly/>
                </div>
                <div>
                    <label>담당의사</label>
                    <input readOnly/>
                </div>
                <div>
                    <label>질병분류기호</label>
                    <input />
                </div>
                <div>
                    <label>처방횟수</label>
                    <input defaultValue={1} type="number" min="1"/>
                </div>
                <div>
                    <label>조제일수</label>
                    <input defaultValue={1} type="number" min="1" max="14"/>
                </div>
                <div>
                    <label>처방일</label>
                    <input value={day}/>
                </div>
            </div>
        </div>
    )
}