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
        string[] dName; //약 이름

        uint[] dosage; // 투약량
        uint[] doseNum; // 투약 횟수
        uint[] dosePeriod; //총 투약일
        uint dispensingCount; // 조제 횟수 
        uint prescriptionCount; // 처방횟수
        // uint period; // 투약기간 ? 몇일치인지.
        string howtoTake; // 복용방법
        uint pubDate; // 발행일
        uint prepDate; // 조제일 
        
        }
        
        // 권한 
         
   
   // 처방전 배열

   
    preScription[] public preScriptions;
    uint i = 0;
    // preScription pp;
    
   

    
    
    
    mapping (address => uint) _accountAuth;  // 계좌 권한 (1 환자, 2 의사, 3 약사)
    
    mapping(string => bool) _preScriptionsExists;

    
    mapping (uint256 => uint ) _blockTotokenid;

    mapping (address => uint[]) _addToblock;
    //의사 계정주소 => 환자 계정주소 => 환자 토큰ID
    mapping (address => mapping (address => uint[])) _patientlistOfdotcor;
    // // 의사 계정 -> 담당한 환자 계정 리스트
    // mapping(address => address[])
    // // 환자의 전체 토큰
    // mapping(address => uint[])
    




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


    preScription Test;


     

    // 누가 민팅했는지 저장해야하나 ?
    // 의사가 조회할수 있도록(자기가 발행한 토큰ID)
    mapping (address => uint256[]) _mintedTokens;

  
    mapping (address => uint256[]) _alltokensOfphaccount;
   
    // 환자가 약사한테 보냈을 때 조회하려면  ????
    
    
    // 지금 로그인한 사람(msg.sender) 이 발행한 토큰 아이디 목록 가져오기

    function setMintedTokens(uint _tokenId) public {
        _mintedTokens[msg.sender].push(_tokenId);
    }
    function getMintedTokens() public view returns (uint256[] memory){
        return _mintedTokens[msg.sender];
    }

    
    // 존재하는 처방전인지 체크하기
    modifier prsExists( 
        string memory _userName, 
        string memory _hosName,
        string memory _pharName, 
        string memory _dCode, 
        uint _dispensingCount, 
        uint _prescriptionCount // 5 번 
        // uint256 _period ,
        // uint256 _pubDate,
        // uint256 _prepDate 
        ) {
           bool check = false;
           for (uint i = 0; i < preScriptions.length; i++){
            if(
                keccak256(bytes(preScriptions[i].userName)) == keccak256(bytes(_userName)) &&
                keccak256(bytes(preScriptions[i].hosName)) == keccak256(bytes(_hosName)) &&
                keccak256(bytes(preScriptions[i].pharName)) == keccak256(bytes(_pharName)) &&
                keccak256(bytes(preScriptions[i].dCode)) == keccak256(bytes(_dCode)) &&
                preScriptions[i].dispensingCount == _dispensingCount &&
                preScriptions[i].prescriptionCount == _prescriptionCount
                // keccak256(bytes(preScriptions[i].dispensingCount)) == keccak256(bytes(_dispensingCount)) &&
                // keccak256(bytes(preScriptions[i].prescriptionCount)) == keccak256(bytes(_prescriptionCount)) 
                // PreScriptions[i].period == _period &&
                // PreScriptions[i].pubDate == _pubDate &&
                // PreScriptions[i].prepDate == _prepDate
            ) {
                check =true;
            }
           } 
           require(!check, "Error : already exists preScription ");
           _;
        }

        // 트랜스퍼 나누기 의사/ 약사/ 환자 기능별로

        //환자가 약사한테
        function transferPreScription(address _from, address _to, uint _tokenId) public {

            // 토큰 전송하면서 다른 배열들도 다 값바꿔줘야함 ex) 소유자 토큰 인덱스 등등
            //  약사가 받은 전체 토큰 ID
            _alltokensOfphaccount[_to].push(_tokenId);
            transferFrom(_from, _to, _tokenId);
        }


        // 의사, 약사가 환자한테 전송할때 
        function transferTopatient(address _from, address _to, uint _tokenId) public {
              
              transferFrom(_from, _to, _tokenId);

            _patientlistOfdotcor[_from][_to].push(_tokenId);

        }
  
        // 약사가 
//    처방전 발급(민팅)
  function mint(
        // string memory _userName,// 사용자 이름
        // string memory _hosName,// 병원 이름
        // string memory _pharName, // 약국 이름
        // string memory _dCode,  // 질병코드
        // string[] memory _dName, //약 이름

        // uint[] memory _dosage, // 투약량
        // uint[] memory _doseNum, // 투약 횟수
        // uint[] memory _dosePeriod, //총 투약일
        // uint _dispensingCount, // 조제 횟수 
        // uint _prescriptionCount, // 처방횟수
        // // uint period; // 투약기간 ? 몇일치인지.
        // string memory _howtoTake, // 복용방법
        // uint _pubDate, // 발행일
        // uint _prepDate,

        preScription memory _preScription
         ) 
        public prsExists( _preScription.userName, _preScription.hosName, _preScription.pharName, _preScription.dCode, _preScription.dispensingCount, _preScription.prescriptionCount ){
            require(_accountAuth[msg.sender] == 2, 'You do not have permission');
            // preScription memory _preScription = preScription( _userName,  _hosName, _pharName, _dCode, _dName,  _dosage, _doseNum, _dosePeriod,  _dispensingCount, _prescriptionCount,  _howtoTake, _pubDate, _prepDate);
            
        // require(!_preScriptionsExists[_preScription],
        // 'Error - preScription already exists');
        // this is deprecated - uint _id = KryptoBirdz.push(_kryptoBird);
        preScriptions.push(_preScription);
        uint _id = preScriptions.length - 1;

        _blockTotokenid[block.number] = _id;
        _addToblock[msg.sender].push(block.number);
        // .push no longer returns the length but a ref to the added element
        _mint(msg.sender, _id);
        //누가 발행한건지 저장(발행한 전체 처방전)
        setMintedTokens(_id);

        // _preScriptionsExists[_preScription] = true;

    }

    function getPreScriptionByIndex(uint index) public returns(preScription memory) {
        return preScriptions[index];
    }

    //     function setPrsData(   
    //     string memory _userName, 
    //     string memory _hosName,
    //     string memory _pharName, 
    //     string memory _dCode, 
    //     string memory _dispensingCount, 
    //     string memory _prescriptionCount
    //   ) 
    //     public prsExists(_userName, _hosName, _pharName, _dCode, _dispensingCount, _prescriptionCount) {
            
    //         preScription memory prsData;
            
    //         prsData.userName = _userName;
    //         prsData.hosName = _hosName;
    //         prsData.pharName = _pharName;
    //         prsData.dCode = _dCode;
    //         prsData.dispensingCount = _dispensingCount;
    //         prsData.prescriptionCount = _prescriptionCount;

    //         PreScriptions.push(prsData);
    //         // return prsData;

    //     } 

    //      function Test22() public returns (preScription memory){
    //     return PreScriptions[0];
    // }


    


    constructor() ERC721Connector('PreScription','Script')
 {}

}


