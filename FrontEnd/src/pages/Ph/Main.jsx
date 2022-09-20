import React from "react"
import { injected } from '../../lib/Connectors';
import { useWeb3React } from '@web3-react/core';

export function Main(){
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
    
    const handdleConnect = () => {
        if(active) {
            deactivate();
          }  
        else{
            activate(injected);
        }
      }

    return(
        <div>
            <h1>약사 메인</h1>
            <div>
                <button type="button" onClick={handdleConnect}>{active ? 'disconnect':'connect'}</button>
                <p>Account: {account}</p>
                <p>ChainId: {chainId}</p>
            </div>
        </div>
        
    )
}