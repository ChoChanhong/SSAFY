import {React,useState} from "react";
import PhNavbar from "../../Components/PhNavbar";
import PhLogFind from "../../Components/PhLog/PhLogFind";
import PhLog from "../../Components/PhLog/PhLog";

export function Log() {

  const [info,setInfo] = useState('')

  function changeInfo(e){
    setInfo(e)
    console.log(info)
  }

  return (
    <div>
      <div>
        <PhNavbar />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          margin: "30px 50px 10px 50px",
        }}
      >
        <PhLogFind changeInfo={changeInfo}/>
        <PhLog info={info}/>
      </div>
    </div>
  );
}
