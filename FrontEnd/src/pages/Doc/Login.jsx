import React from "react";
import DocMainNav from "../../Components/PhMainNav";
import LoginForm from "../../Components/Doc/LoginForm";
import "./Login.css";

export function Login() {
  return (
    <div id="login">
      <DocMainNav id="Navbar" />
      <LoginForm id="LoginForm" />
    </div>
  );
}
