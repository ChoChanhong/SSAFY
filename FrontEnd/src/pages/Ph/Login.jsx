import React from "react";
import { Link } from "react-router-dom";
import { injected } from "../../lib/Connectors";
import { useWeb3React } from "@web3-react/core";
import { useNavigate } from "react-router-dom";
import PhMainNav from "../../Components/PhMainNav";
import PhLoginForm from "../../Components/PhLoginForm";

export function Login() {
  const navigate = useNavigate();
  const {
    connector,
    library,
    chainId,
    account,
    active,
    error,
    activate,
    deactivate,
  } = useWeb3React();

  function login() {
    if (active) {
      navigate("/ph");
    } else {
      activate(injected);
    }
  }

  return (
    <div>
      <PhMainNav/>
      <PhLoginForm />
      <button onClick={login}>로그인</button>
    </div>
  );
}
