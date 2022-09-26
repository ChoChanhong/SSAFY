import { minWidth } from "@mui/system";
import {React, useState, useRef, useEffect} from "react";
import Yak from './Yak'

export default function PerInfo(){

    

    let now = new Date();
    let year = now.getFullYear()
    let month = now.getMonth() +1
    let date = now.getDate()
    let day = year+'-'+month+'-'+date

    const [dname,setDname] = useState('') //질병분류기호
    const [Perlog,setPlog] = useState([]) //처방내역
    const [yaks,setYaks] = useState([])

    const mname = useRef()
    const inj_q = useRef()
    const inj_t = useRef()
    const inj_d = useRef()
    const pernumber = useRef()
    const useage = useRef()

    function Add(){
        let tmp = Perlog
        tmp.push(
            {   
                key : Perlog.length,
                mname : mname.current.value,
                inj_q : inj_q.current.value,
                inj_t : inj_t.current.value,
                inj_d : inj_d.current.value,
                pernumber : pernumber.current.value,
                useage : useage.current.value
            }
        )
        setPlog(tmp)
        setYaks(Perlog.map((log)=>(<Yak info={log} Delete={Delete}/>)))
    }

    function Delete(idx){
        let tmp = Perlog
        delete tmp[idx]
        setPlog(tmp)
        setYaks(Perlog.map((log)=>(<Yak info={log} Delete={Delete}/>)))
    }
    // const mint = web3.asdasd.contarc
    
    function submit(){
        let ss = {
            doc : '',
            //의사 지갑
            cli : '',
            //환자 지갑
            ph : '',
            //약사 지갑
            dname : dname,
            //질병코드
            perscription : Perlog,
            //처방내역
            date : day,
            //처방일

        }
        console.log(ss)
    }

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
                    <input/>
                </div>
                <div>
                    <label>처방내역</label>
                    {Perlog}
                    <div>--------</div>
                    {yaks}
                    <div>--------</div>
                </div>
                <div>
                    <label>처방생성</label>
                    <label>약품명</label>
                    <input ref = {mname}/>
                    <label>1회 투약량</label>
                    <input ref = {inj_q} defaultValue={1} type="number" min="1"/>
                    <label>1일 투약횟수</label>
                    <input ref = {inj_t} defaultValue={1} type="number" min="1"/>
                    <label>총 투약일수</label>
                    <input ref = {inj_d} defaultValue={1} type="number" min="1" max="14"/>
                    <label>처방횟수</label>
                    <input ref = {pernumber} defaultValue={1} type="number" min="1"/>
                    <label>용 법</label>
                    <input ref = {useage}/>
                    <button onClick={Add}>추가</button>
                </div>
                <div>
                    <label>처방일</label>
                    <input readOnly value={day}/>
                </div>
            </div>
            <button onClick={submit}>처방하기</button>
        </div>
    )
}