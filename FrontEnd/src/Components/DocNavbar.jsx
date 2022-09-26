import React from "react";
import { Link } from 'react-router-dom';
import './DocNavbar.css'

export default function DocNavbar(){

    return(
        <div id="nav">
            <img id="logo"/>
            <div>
                <Link to ="/doc/generate">처방전 생성</Link>
                <Link to ="/doc/log">처방전 조회</Link>
                <Link to ="/doc/">마이페이지</Link>
            </div>
        </div>
    )
}