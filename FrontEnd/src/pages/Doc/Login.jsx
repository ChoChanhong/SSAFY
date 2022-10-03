import React from "react";

import DocMainNav from "../../Components/Doc/DocMainNav";
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
