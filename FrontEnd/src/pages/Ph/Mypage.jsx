import { React, useEffect, useState } from "react";
import PhNavbar from "../../Components/PhNavbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMortarPestle,
  faPrescriptionBottleMedical,
} from "@fortawesome/free-solid-svg-icons";

export function Mypage() {
  const [account, setAccount] = useState("");

  const getAccount = async () => {
    try {
      if (window.ethereum) {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });

        setAccount(accounts[0]);
      } else {
        alert("Install Metamask!");
      }
    } catch (error) {
      console.error(error);
    }
  };

  // const navigate = useNavigate();
  // const {
  //     connector,
  //     library,
  //     chainId,
  //     account,
  //     active,
  //     error,
  //     activate,
  //     deactivate,
  //   } = useWeb3React();

  // useEffect(()=>{
  //     if(active){activate(injected)}
  //     else{navigate('/login')}
  // },[]);

  //   return (
  //     <div>
  //       <PhNavbar />
  //       <h1>약사 마이페이지</h1>
  //       <div>
  //         <div>{account}</div>
  //         <button onClick={getAccount}>dd</button>
  //         {/* <p>Account: {account}</p>
  //                 <p>ChainId: {chainId}</p> */}
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <div>
      <PhNavbar />
      <div style={{ display: "flex" }}>
        <h1 id="docmyTitle">
          <FontAwesomeIcon
            icon={faPrescriptionBottleMedical}
            style={{ color: "#00ADEF", marginRight: 30, height: 50 }}
          />
          <div style={{ color: "#00ADEF" }}>싸피약국</div>님, 안녕하세요!
        </h1>
        <button id="docLogout" style={{ marginLeft: 850 }} onClick={""}>
          로그아웃
        </button>
      </div>
      <div id="docmy">
        <div id="docAccInfo">
          <p id="docmyHead">
            {" "}
            <FontAwesomeIcon
              icon={faMortarPestle}
              style={{ marginRight: 30 }}
            />
            계정 정보
          </p>
          <div id="docmyBox">
            <div style={{ display: "flex" }}>
              <label id="docmyInfo">● 약국명 : </label>
              <p id="docmyAns"></p>
            </div>
            <div style={{ display: "flex" }}>
              <label id="docmyInfo">● 요양기관번호 : </label>
              {/* {info ? info.hospitalCRN : ""} */}
            </div>
            <div style={{ display: "flex" }}>
              <label id="docmyInfo">● 면허번호 :</label>{" "}
              {/* {info ? info.hospitalLicense : ""} */}
            </div>
            <div style={{ display: "flex" }}>
              <label id="docmyInfo">● 대표이메일 : </label>
              {/* {info ? info.userEmail : ""} */}
            </div>
            <div style={{ display: "flex" }}>
              <label id="docmyInfo">● 주소 : </label>
              {/* {info ? info.hospitalAddr : ""} */}
            </div>
            <div style={{ display: "flex" }}>
              <label id="docmyInfo">● 연락처 : </label>
              {/* {info ? info.hospitalTel : ""} */}
            </div>
            <div style={{ display: "flex" }}>
              <label id="docmyInfo">● 지갑 주소 : </label>
              {/* {info ? info.userWalletAddress : ""} */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
