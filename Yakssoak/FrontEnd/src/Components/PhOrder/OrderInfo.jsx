import {React,useState,useEffect} from "react";
import "./OrderInfo.css";
import Web3 from "web3";
import { cfmabi, cfmCA , nftCA, abi } from "../../web3Config";
import axios from "axios";


export default function OrderInfo(props) {

  const [info,setInfo] = useState('')
  const [list,setList] = useState('')
  const [state,setState] = useState('')
  const [how,setHow] = useState('')
  const [token,setToken] = useState('')
  const [confirm,setConfirm] = useState('')

  useEffect(()=>{
    setInfo(props.info)
    setList(props.list)
    setState(props.state)
  },[props])

  useEffect(()=>{
    if(list[state]){
      if(info){
        Mint()
      }
    }
  },[info,list,state])

  //날짜 계산용
  let now = new Date();
  let year = now.getFullYear();
  let month = now.getMonth() + 1;
  let date = now.getDate();
  let day = year * 10000  + month * 100  +date;


  const Mint = async (e) => {
    console.log(info)
    console.log(list)
    console.log('Mint')
    // e.preventDefault();
    const web3 = new Web3(window.ethereum);
    const contract = new web3.eth.Contract(cfmabi, cfmCA); //확인서
    const contract2 = new web3.eth.Contract(abi, nftCA); // 처방전
    const account = await web3.eth.requestAccounts();
    const myAccount = account[0];
    const tokenId = await contract2.methods.alltokenOfOwner(myAccount).call();
    let pertime = ''
    try{
      pertime = await contract.mathods.getcountOfprs(tokenId[state]).call();
      pertime ++
    } catch (err) {
      pertime = 1
    }
    const AA = async () => {
      try{
        const res = await axios
        .post("https://j7e205.p.ssafy.io/api/prescriptions/searchPatientWallet", { tokenId : tokenId[state]});
        setToken(res.data)
      }
      catch(err){
        console.log(err)
      }    
    }
    AA()
        const confirmation = {
          id : parseInt(tokenId[state]),
          userName : String(list[state].userName),
          hosName : String(list[state].hosName),
          pharName : String(info.userName),
          dName : list[state].dName.map((x)=>String(x)),
          dosage :  list[state].dosage.map((x)=>parseInt(x)),
          doseNum : list[state].doseNum.map((x)=>parseInt(x)),
          dosePeriod : list[state].dosePeriod.map((x)=>parseInt(x)),
          prescriptionCount : parseInt(list[state].prescriptionCount),
          dispensingCount : parseInt(pertime),
          prepDate : parseInt(day),
          howtoTake : String(how)
        }
        // const confirmation = {
        //   id : tokenId[state],
        //   userName : list[state].userName,
        //   hosName : list[state].hosName,
        //   pharName : info.userName,
        //   dName : list[state].dName,
        //   dosage :  list[state].dosage,
        //   doseNum : list[state].doseNum,
        //   dosePeriod : list[state].dosePeriod,
        //   prescriptionCount : list[state].prescriptionCount,
        //   dispensingCount : pertime,
        //   prepDate : day,
        //   howtoTake : how
        // }
        console.log(confirmation,'confirmation')
        setConfirm(confirmation)
        console.log(confirm,'confirm')
      }
  
    async function Send(){
      console.log(confirm,'확인')
      const web3 = new Web3(window.ethereum);
      const contract = new web3.eth.Contract(cfmabi, cfmCA); //확인서
      const contract2 = new web3.eth.Contract(abi, nftCA); // 처방전
      const account = await web3.eth.requestAccounts();
      const myAccount = account[0];
      let text = await contract.methods.totalSupply().call() - 1;
      console.log(text,'index')

      await contract.methods
        .mint(confirm)
        .send({ from: myAccount });
      let index = await contract.methods.totalSupply().call() - 1;
      console.log(index,'index')
          //확인서 전달
      await contract.methods
        .transferconfirmation(myAccount, token, index)
        .send({ from : myAccount })
      await contract2.methods
      .setPharmacyAuth(myAccount)
      .send({ from: myAccount });
      await contract2.methods.transferPharmacyToPatient(myAccount, token, confirm.id)
        .send({ from : myAccount})
    }
    

  

  return (
    <div>
      <div id="orderinfoline">
        <div id="orderinfoname">
          <p style={{ marginTop: 10, marginLeft: 10 }}>조제정보</p>
        </div>
        <div id="orderinfoBox">
          <label id="orderinfoLabel">조제기관명</label>
          <input id="orderinfoInput" value={ info ? info.userName : ''} readOnly />
        </div>
        <div id="ordeinforBox">
          <label id="orderinfoLabel">조제횟수</label>
          <input id="orderinfoInput" readOnly value={confirm ? `${confirm.dispensingCount-1}/${confirm.prescriptionCount}`: ''}/>
        </div>
        <div id="orderinfoBox">
          <label id="orderinfoLabel">조제일</label>
          <input id="orderinfoInput" value={day} readOnly />
        </div>
        <div>
          <label id="orderinfoLabel">처방 변경/수정/대체내용</label>
          <textarea onChange={(e)=>{setHow(e.target.value)}} name="" id="orderinfoText" cols="35" rows="8"></textarea>
        </div>
        <div className="mt-3 text-center">
          <button id="orderinfoButton" onClick = { Send }>조제 등록</button>
        </div>
      </div>
    </div>
  );
}
