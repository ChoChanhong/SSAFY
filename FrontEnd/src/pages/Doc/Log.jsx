import React from "react"
import {Link} from "react-router-dom"
import DocNavbar from "../../Components/DocNavbar"
import PerDetail from "../../Components/Generate/PerDetail"

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