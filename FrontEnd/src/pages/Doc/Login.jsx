import React from "react";
import DocMainNav from "../../Components/DocMainNav";
import LoginForm from "../../Components/LoginForm";
import "./Login.css";

export function Login() {
  return (
    <div id="login">
      <DocMainNav id="Navbar" />
      <LoginForm id="LoginForm" />
    </div>
  );
}
