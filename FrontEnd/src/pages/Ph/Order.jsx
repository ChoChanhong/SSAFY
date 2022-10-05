import { React } from "react";
import PhNavbar from "../../Components/PhNavbar";
import OrderInfo from "../../Components/PhOrder/OrderInfo";
import PhDetail from "../../Components/PhOrder/PhDetail";
import OrderList from "../../Components/PhOrder/OrderList";

export default function Order() {
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
        <OrderList />
        <PhDetail />
        <OrderInfo />
      </div>
    </div>
  );
}
