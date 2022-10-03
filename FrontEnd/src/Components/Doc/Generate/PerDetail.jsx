import React from "react";

export default function PerDetail(){
    
    const localStorage = window.localStorage

    return(
        <div>
            처방전 상세내역
            {window.localStorage.getItem('login-token')}
        </div>
    )
}