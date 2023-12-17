import React from "react";
import PhMainNav from "../../Components/PhMainNav";
import PhLoginForm from "../../Components/PhLoginForm";

import "../Doc/Login.css";

export function Login() {
  return (
    <div id="login">
      <PhMainNav />
      <PhLoginForm id="LoginForm"/>
    </div>
  );
}
