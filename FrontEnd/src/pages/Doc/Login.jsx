import React from "react";
import DocNavbar from "../../Components/DocNavbar";
import LoginForm from "../../Components/LoginForm";
import "./Login.css";

export function Login() {
  return (
    <div id="login">
      <DocNavbar id="Navbar" />
      <img src="img/001.png" alt="로고" />
      <LoginForm id="LoginForm" />
    </div>
  );
}
