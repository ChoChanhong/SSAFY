import { React, useState } from "react";
import PerDetail from "../../Components/Doc/Generate/PerDetail";
import PhNavbar from "../../Components/PhNavbar";
import OrderInfo from "../../Components/PhOrder/OrderInfo";
import OrderList from "../../Components/PhOrder/OrderList";

export default function Order() {
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
