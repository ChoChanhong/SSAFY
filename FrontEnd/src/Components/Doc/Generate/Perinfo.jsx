import { minWidth } from "@mui/system";
import {React, useState, useRef, useEffect} from "react";
import Yak from './Yak'
import { useNavigate } from "react-router-dom";
import setAuthorizationToken from '../../../utils/AuthorizationToken'
// import { nftContract, web3 } from "../../web3Config";
import {abi, nftCA} from "../../../web3Config";
import Web3 from "web3";
import axios from "axios";
// import detectEthereumProvider from "@metamask/detect-provider";


export default function PerInfo(){

    const navigate = useNavigate();
    const URL = "https://j7e205.p.ssafy.io/api/hospitals/me";
    const localStorage = window.localStorage;
    const [info,setInfo] = useState('')    

    useEffect(()=>{
      const token = localStorage.getItem("login-token")
      setAuthorizationToken(token)
      axios
      .get(URL)
      .then(function(res){
        console.log(res.data)
        setInfo(res.data)
      })
      .catch(function(err){
        alert('올바른 접근 방식이 아닙니다.')
        navigate('/doc/')
      })
    },[])

    async function componentDidMount() {
        await this.loadWeb3();
        await this.loadBlockchainData();
    }

    // async function loadWeb3() {
    //     const provider = await detectEthereumProvider();
        
    //     if(provider) {
    //         console.log('ethereum wallet is connected')
    //         window.web3 = new Web3(provider)
    //     } else {
    //         // no ethereum provider
    //         console.log('no ethereum wallet detected')
    //     }
    // }
    const Mint = async (e) => {
        e.preventDefault();
        console.log(1111)
        const data = {userName : "Test2", hosName : "Test3",pharName : "Test2",dCode : "aaa",dName : ['bb', 'cc'],dosage : [1, 2], doseNum : [2 , 2],dosePeriod : [2 , 2], dispensingCount : 1, prescriptionCount : 1, howtoTake : "asddasda",pubDate : 123123123,prepDate : 23123123}
        console.log(data)
        const web3 = new Web3(window.ethereum);
        const contract = new web3.eth.Contract(abi, nftCA)
        console.log(contract)
        const { ee } = await contract.methods.setDoctorAuth('0x4aDD641353eDc52325Cce4198b60AE17B8037f54').send({from : '0x4aDD641353eDc52325Cce4198b60AE17B8037f54'});
        console.log ('222222222222222222222222222222222')
        const { event } = await contract.methods.mint( data )
                                                .send({from: '0x4aDD641353eDc52325Cce4198b60AE17B8037f54'});
        console.log(" 처방전 발급 11111111")
        const totalSupply = await contract.methods.totalSupply().call()
        const prsList = await contract.methods.getPreScriptionByIndex(0).call();
        console.log('1111111111111111111111111111111111111111111')
        console.log(data)
        console.log(totalSupply);
        console.log(prsList);
                                                
    }
    //의사가 환자한테 전송 할때
    const Transfer = async(e) => {
        e.preventDefault();
        console.log(" 처방전 전송 의사 -> 환자 ")
        const web3 = new Web3(window.ethereum);
        const contract = new web3.eth.Contract(abi, nftCA)
        // 현재 소유한 토큰 아이디 가져옴.
        const tokenId = contract.methods.alltokenOfOwner.call();
        const {e1} = await contract.methods.transferDoctorToPatient('의사주소', '환자주소', tokenId);
    }
    // 환자가 약사한테 전송
    const Transfer2 = async(e) => {
        e.preventDefault();
        console.log(" 처방전 전송 환자 -> 약사")
        const web3 = new Web3(window.ethereum);
        const contract = new web3.eth.Contract(abi, nftCA);
        // 현재 소유한 토큰 아이디 가져옴.
        const tokenId = contract.methods.alltokenOfOwner.call();
        const {e1} = await contract.methos.transferPreScription("환자주소", "약사주소", "토큰아이디");

    }

    // 약사가 환자한테
    const Transfer3 = async(e) => {
        e.preventDefault();
        console.log(" 처방전 전송 약사 -> 환자")
        const web3 = new Web3(window.ethereum);
        const account = await web3.eth.requestAccounts();
        const myAccount = account[0];
        const contract = new web3.eth.Contract(abi, nftCA);
        // 현재 소유한 토큰 아이디 가져옴.
        const tokenId = contract.methods.alltokenOfOwner.call();
        const {e1} = await contract.methos.transferPharmacyToPatient( myAccount , "환자주소", '토큰아이디');
        
    }
    // 처방전 전체 조회
    const Search = async(e) => {
        e.preventDefault();
        console.log("조회할거임");
        const web3 = new Web3(window.ethereum);
        const account = await web3.eth.requestAccounts();
        const myAccount = account[0];
        const contract = new web3.eth.Contract(abi, nftCA);
        // 매개변수로 넘겨준 주소를 거쳐간 모든 처방전 조회
         // 처방전 형식의 배열 리턴        
        const list = contract.methods.getAllListFromAccount(myAccount).call();

    }

    // 조건부 조회
    const Search2 = async(e) => {
        e.preventDefault();
        console.log("조건부 조회할거임");
        const web3 = new Web3(window.ethereum);
        const account = await web3.eth.requestAccounts();
        const myAccount = account[0];
        const contract = new web3.eth.Contract(abi, nftCA);
        // 현재주소 가 조회할 주소로 보낸 처방전만 검색 
        // 처방전 형식의 배열 리턴                
        const list = contract.methods.getPatientListFromAccount("현재주소", "조회할 주소").call();
    }
    // 조제 asdasdasd
    // create aaaa

    let now = new Date();
    let year = now.getFullYear()
    let month = now.getMonth() +1
    let date = now.getDate()
    let day = year+'-'+month+'-'+date

    const [docname,setDocname] = useState('')//의사이름
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
                    <input value={info ? info.userName : ''} readOnly/>
                </div>
                <div>
                    <label>담당의사</label>
                    <input onChange={(e)=>setDocname(e.target.value)}/>
                </div>
                <div>
                    <label>질병분류기호</label>
                    <input onChange={(e)=>setDname(e.target.value)}/>
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
            <button onClick={Mint} > 민팅테스트</button>
            {/* <button onClick={componentDidMount}> 마운트</button> */}
            {/* <button onClick={loadWeb3}> 지갑로드</button> */}
        </div>
    )
}