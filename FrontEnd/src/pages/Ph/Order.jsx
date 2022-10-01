import REACT, { useState } from "react";
import DaumPostCode from "react-daum-postcode";
import PerDetail from "../../Components/Generate/PerDetail";
import PhNavbar from "../../Components/PhNavbar";
import OrderInfo from "../../Components/PhOrder/OrderInfo";
import OrderList from "../../Components/PhOrder/OrderList";

export default function Order() {
  // const handleComplete = (data) => {
  //   let fullAddress = data.address;
  //   let extraAddress = "";
  //   if (data.addressType === "R") {
  //     if (data.bname !== "") {
  //       extraAddress += data.bname;
  //     }
  //     if (data.buildingName !== "") {
  //       extraAddress +=
  //         extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
  //     }
  //     fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
  //   }
  //   console.log(fullAddress);
  //fullAddress -> 전체 주소반환
  // };
  return (
    <div>
      {/* <div>dddddd</div>
            <DaumPostCode onComplete={handleComplete} className="post-code" />
            <div>ddddd</div> */}
      <div>
        <PhNavbar />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          margin: "30px 50px 0px 50px",
        }}
      >
        <OrderList />
        <PerDetail />
        <OrderInfo />
      </div>
    </div>
  );
}
