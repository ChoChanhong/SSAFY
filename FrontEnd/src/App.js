import { React, useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
//공통
import Main from "./pages/Main";
import { Intro as ServiceInfo } from "./pages/Intro";
import NotFoundPage from "./pages/NotFoundPage";
//환자
import Login from "./pages/Cli/Login";
import Mypage from "./pages/Cli/Mypage";
import Perdetail from "./pages/Cli/Perdetail";
import Perscription from "./pages/Cli/Perscription";
import Signup from "./pages/Cli/Signup";
//의사
import { Login as DocLogin } from "./pages/Doc/Login";
import { Signup as DocSignup } from "./pages/Doc/Signup";
import { Log as DocLog } from "./pages/Doc/Log";
import Generate from "./pages/Doc/Generate";
import { Mypage as DocMypage } from "./pages/Doc/Mypage";
import { ServiceInfo as DocInfo } from "./pages/Doc/ServiceInfo";
//약사
import { Mypage as PhMypage } from "./pages/Ph/Mypage";
import { Login as PhLogin } from "./pages/Ph/Login";
import { Signup as PhSignup } from "./pages/Ph/Signup";
import { Log as PhLog } from "./pages/Ph/Log";
import Order from "./pages/Ph/Order";
import { ServiceInfo as PhInfo } from "./pages/Ph/ServiceInfo";

function App() {
  return (
    <Routes>
      {/*공통*/}
      <Route path="/" element={<Main />} />
      <Route path="/serviceinfo" element={<ServiceInfo />} />
      <Route path="/*" element={<NotFoundPage />} />
      {/*환자*/}
      <Route path="/my" element={<Mypage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/perscription" element={<Perscription />} />
      <Route path="/perdetail" element={<Perdetail />} />
      {/*의사*/}
      <Route path="/doc" element={<DocLogin />} />
      <Route path="/doc/signup" element={<DocSignup />} />
      <Route path="/doc/log" element={<DocLog />} />
      <Route path="/doc/generate" element={<Generate />} />
      <Route path="/doc/my" element={<DocMypage />} />
      <Route path="/doc/serviceinfo" element={<DocInfo />} />
      {/*약사*/}
      <Route path="/ph" element={<PhLogin />} />
      <Route path="/ph/signup" element={<PhSignup />} />
      <Route path="/ph/log" element={<PhLog />} />
      <Route path="/ph/order" element={<Order />} />
      <Route path="/ph/my" element={<PhMypage />} />
      <Route path="/ph/serviceinfo" element={<PhInfo />} />
    </Routes>
  );
}

export default App;
