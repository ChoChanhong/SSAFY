// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import './ERC721Connector.sol';

contract PreScription is ERC721Connector {

    // array to store our nfts
    // 처방전 리스트
   struct  preScription {
        string  Uname; // 사용자 이름
        string Hname; // 병원이름 
        
        }
  
    preScription[] public PreScriptions;


  
    mapping(string => bool) _preScriptionsExists;

    function mint(string memory _Uname, string memory _Hname ) public {

        // require(!_preScriptionsExists[_preScription],
        // 'Error - preScription already exists');
        // this is deprecated - uint _id = KryptoBirdz.push(_kryptoBird);
        PreScriptions.push(preScription(_Uname, _Hname));
        uint _id = PreScriptions.length - 1;

        // .push no longer returns the length but a ref to the added element
        _mint(msg.sender, _id);

        // _preScriptionsExists[_preScription] = true;

    }

    function Test(preScription[] memory _PreScriptions) public  returns(string memory) {
        
        return _PreScriptions._Uname;
    }

    constructor() ERC721Connector('PreScription','Script')
 {}

}


