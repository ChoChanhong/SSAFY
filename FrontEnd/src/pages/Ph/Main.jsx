import { React, useEffect } from "react"
import { injected } from '../../lib/Connectors';
import { useWeb3React } from '@web3-react/core';
import { useNavigate } from 'react-router-dom';

export function Main(){
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
    
    useEffect(()=>{
        if(activate){}
        else{navigate('/login')}        
    },[]);

    return(
        <div>
            <h1>약사 메인</h1>
            <div>
                <p>Account: {account}</p>
                <p>ChainId: {chainId}</p>
            </div>
        </div>
        
    )
}