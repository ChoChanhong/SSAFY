// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import './ERC721Connector.sol';

contract PreScription is ERC721Connector {

    // array to store our nfts
    // 처방전 리스트
   struct  preScription {
        // preScriptionExists 를 위해서 처방전을 구분할 수 있는 넘버 ? 같은거 추가해야할듯 .
        string userName; // 사용자 이름
        string hosName; // 병원이름
        string Dcode; // 질병코드
        string dispensingCount; // 조제 횟수 
        string prescriptionCount; // 처방횟수
        uint period; // 투약기간 ? 몇일치인지.
        
        }
        
        // 권한 
         
   
    preScription[] public PreScriptions;

    
    
    mapping (address => uint) _accountAuth;  // 계좌 권한 (1 환자, 2 의사, 3 약사)
    
    mapping(string => bool) _preScriptionsExists;


        // 환자
        function setPatientAuth(address _address) public {
        _accountAuth[_address] = 1;
    }
        // 의사
        function setDoctorAuth(address _address) public {
        _accountAuth[_address] = 2;
    }
        //약사
        function setPharmacyAuth(address _address) public {
        _accountAuth[_address] = 3;
    }

    
    // 

    

    function mint(string memory _userName, string memory _hosName, string memory _dCode, string memory _dispensingCount, string  memory _prescriptionCount, uint _period) public {

        // require(!_preScriptionsExists[_preScription],
        // 'Error - preScription already exists');
        // this is deprecated - uint _id = KryptoBirdz.push(_kryptoBird);
        PreScriptions.push(preScription( _userName, _hosName, _dCode, _dispensingCount, _prescriptionCount, _period));
        uint _id = PreScriptions.length - 1;

        // .push no longer returns the length but a ref to the added element
        _mint(msg.sender, _id);

        // _preScriptionsExists[_preScription] = true;

    }

    function Test(uint index) public returns(preScription memory) {
        return PreScriptions[index];
    }

    constructor() ERC721Connector('PreScription','Script')
 {}

}


