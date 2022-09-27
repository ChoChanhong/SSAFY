import React from "react";
import DocNavbar from "../../Components/DocNavbar";
import LoginForm from "../../Components/LoginForm";
import "./Login.css";

export function Login() {
  return (
    <div id="login">
      <DocNavbar id="Navbar" />
      <LoginForm id="LoginForm" />
    </div>
  );
}
