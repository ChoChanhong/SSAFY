import React from "react"
import {Link} from "react-router-dom"
import DocNavbar from "../../Components/DocNavbar"
import CliInfo from "../../Components/Generate/CliInfo"
import PerInfo from "../../Components/Generate/Perinfo"
import PerDetail from "../../Components/Generate/PerDetail"


export default function Generate(){
    return(
        <div>
            <div>
                <DocNavbar/>
            </div>
            <div>
                <CliInfo/>
                <PerInfo/>
                <PerDetail/>
            </div>
        </div>
        
    )
}