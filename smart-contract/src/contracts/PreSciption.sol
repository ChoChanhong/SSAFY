// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import './ERC721Connector.sol';

contract PreScription is ERC721Connector {

    // array to store our nfts
    // 처방전 리스트
   struct  preScription {
        // preScriptionExists 를 위해서 처방전을 구분할 수 있는 넘버 ? 같은거 추가해야할듯 .
        string userName; // 사용자 이름
        string hosName; // 병원 이름
        string pharName; // 약국 이름
        string dCode; // 질병코드
        string dispensingCount; // 조제 횟수 
        string prescriptionCount; // 처방횟수
        uint period; // 투약기간 ? 몇일치인지.
        uint pubDate; // 발행일
        uint prepDate; // 조제일 
        
        }
        
        // 권한 
         
   
   // 처방전 배열
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

    // 누가 민팅했는지 저장해야하나 ?

    mapping (address => uint256[]) _mintedTokens;

    // 지금 로그인한 사람(msg.sender) 이 발행한 토큰 아이디 목록 가져오기
    function getMintedTokens() public view returns (uint256[] memory){
        return _mintedTokens[msg.sender];
    }


    // 존재하는 처방전인지 체크하기
    modifier prsExists( 
        string memory _userName, 
        string memory _hosName,
        string memory _pharName, 
        string memory _dCode, 
        string memory _dispensingCount, 
        string memory _prescriptionCount, 
        uint256 _period ,
        uint256 _pubDate,
        uint256 _prepDate 
        ) {
           bool check = false;
           for (uint i = 0; i < PreScriptions.length; i++){
            if(
                keccak256(bytes(PreScriptions[i].userName)) == keccak256(bytes(_userName)) &&
                keccak256(bytes(PreScriptions[i].hosName)) == keccak256(bytes(_hosName)) &&
                keccak256(bytes(PreScriptions[i].pharName)) == keccak256(bytes(_pharName)) &&
                keccak256(bytes(PreScriptions[i].dCode)) == keccak256(bytes(_dCode)) &&
                keccak256(bytes(PreScriptions[i].dispensingCount)) == keccak256(bytes(_dispensingCount)) &&
                keccak256(bytes(PreScriptions[i].prescriptionCount)) == keccak256(bytes(_prescriptionCount)) &&
                PreScriptions[i].period == _period &&
                PreScriptions[i].pubDate == _pubDate &&
                PreScriptions[i].prepDate == _prepDate
            ) {
                check =true;
            }
           } 
           require(!check, "Error : already exists PreScription ");
           _;
        }

        function transferPreScription(address _from, address _to, uint _tokenId) public {

            // 토큰 전송하면서 다른 배열들도 다 값바꿔줘야함 ex) 소유자 토큰 인덱스 등등
            transferFrom(_from, _to, _tokenId);


        }

        // mapping(address => uint) Token;
        // fucntion getAuth(address _address) public returns(uint){
        //     return Token(address) 
        // }

    
    // 데이터 조회
    // 환자는 자기꺼만 조회하게 

    // 처방확인.
    
    //  

    
    // 처방전 발급(민팅)
  function mint(
        string memory _userName, 
        string memory _hosName,
        string memory _pharName, 
        string memory _dCode, 
        string memory _dispensingCount, 
        string  memory _prescriptionCount, 
        uint _period, 
        int _pubDate,
        uint prepDate ) 
        public prsExists( _userName, _hosName, _pharName, _dCode, _dispensingCount, _prescriptionCount, _period, _pubDate,
       prepDate ){
            preScription memory _preScription = preScription( _userName,  _hosName, _pharName, _dCode, _dispensingCount, _prescriptionCount, _period, _pubDate,
        prepDate);

        // require(!_preScriptionsExists[_preScription],
        // 'Error - preScription already exists');
        // this is deprecated - uint _id = KryptoBirdz.push(_kryptoBird);
        PreScriptions.push(_preScription);
        uint _id = PreScriptions.length - 1;

        // .push no longer returns the length but a ref to the added element
        _mint(msg.sender, _id);
        _mintedTokens[msg.sender].push(_id);

        // _preScriptionsExists[_preScription] = true;

    }

    function Test(uint index) public returns(preScription memory) {
        return PreScriptions[index];
    }

    constructor() ERC721Connector('PreScription','Script')
 {}

}


