import React from "react"
import {Link} from "react-router-dom"
import DocNavbar from "../../Components/Doc/DocNavbar"
import PerDetail from "../../Components/Doc/Generate/PerDetail"

export function Log(){
    return(
        <div>
            <DocNavbar/>
            <div>
                <PerDetail/>
            </div>
        </div>
        
    )
}