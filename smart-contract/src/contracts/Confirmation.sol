// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import './ERC721Connector.sol';

contract Confirmation is ERC721Connector {
    
    struct confirmation {
        uint No; // 처방전의 토큰아이디
        string userName;
        string hosName;
        string pharName;
        
        string[] dName;
        uint[] dosage; // 투약량
        uint[] doseNum; // 투약 횟수
        uint[] dosePeriod; //총 투약일
        uint prescriptionCount;
        uint dispensingCount; // 조제 횟수 
        uint prepDate; // 조제일 
        string howtoTake; // 복용방법
    }

    // 확인서 리스트
    confirmation[] public cfms;

    mapping (address => uint[]) _allTokensOwned; // 자신을 거쳐간 모든 토큰 ID 저장
    
    mapping (address => confirmation[]) _cfmsFromAccount; // 발행한 모든 확인서

    mapping (address => uint) _accountAuth; // 권한

    mapping (uint => uint) _countOfNo;  // 처방전 토큰아이디 별 조제한 횟수
    
    mapping (address => mapping (address => confirmation[])) _patientListFromAccount;
    modifier cfmExists ( 
        uint _no,
        uint _dispensingcount)
    {
        bool check = false;
        for (uint i = 0; i < cfms.length; i++){
            if(cfms[i].No == _no && cfms[i].dispensingCount == _dispensingcount){
                check = true;
            }
        }
        require(!check, "Error : already exists confirmation ");
           _;
    }

    function mint(confirmation memory _confirmation)
        public cfmExists (_confirmation.No, _confirmation.dispensingCount){
            require(_countOfNo[_confirmation.No] < _confirmation.prescriptionCount, 'Error : You cannot exceed the number of preparations');
            cfms.push(_confirmation);

            uint _id = cfms.length -1;

            // 자기가 발행한 모든 확인서
            _cfmsFromAccount[msg.sender].push(_confirmation);
            // _countOfNo[_confirmation.No] += 1;

            _mint(msg.sender ,_id); 
        }

        function transferconfirmation(address _from, address _to, uint _tokenId) public {
            confirmation memory conf = cfms[_tokenId];
            
            _cfmsFromAccount[_to].push(conf);
            _patientListFromAccount[_from][_to].push(cfms[_tokenId]);
            transferFrom(_from, _to, _tokenId);
            
        }
        // address가 소유했었던 모든 확인서 리스트
        function getcfmsByAccount(address _address) public view returns (confirmation[] memory) {
            return _cfmsFromAccount[_address];
        }
        // from -> to 로 전달해준 확인서 리스트
        function getpatientListFromAccount(address _from, address _to) public view returns (confirmation[] memory){
            return _patientListFromAccount[_from][_to];
        }
        // 해당 tokenId 처방전의 조제 횟수
        function getcountOfprs(uint _tokenId) public view returns (uint){
            return _countOfNo[_tokenId];
        }

    constructor() ERC721Connector('Confirmation','Cfm') {}
}