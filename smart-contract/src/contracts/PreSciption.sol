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
        string[] howtoTake; // 복용방법
        uint pubDate; // 발행일
        uint prepDate; // 조제일 
        
        }
        
        // 권한       
   
   // 처방전 배열

   
    preScription[] public preScriptions;
    // preScription pp;
    
   

    
    mapping (address => uint[]) _allTokensOwned; // 자신을 거쳐간 모든 토큰 ID 저장

    mapping (address => preScription[]) _allListFromAccount; // 자신을 거쳐간 모든 처방전
    
    mapping (address => uint) _accountAuth;  // 계좌 권한 (1 환자, 2 의사, 3 약사)
    
    mapping(string => bool) _preScriptionsExists;

    
    mapping (uint256 => uint ) _blockTotokenid;

    mapping (address => uint[]) _addToblock;
    //의사 계정주소 => 환자 계정주소 => 환자 토큰ID
    mapping (address => mapping (address => uint[])) _patientListFromAccount2;

    mapping (address => mapping (address => preScription[])) _patientListFromAccount;

    // 정기처방전 리스트
    mapping (address => preScription[]) _regularPrescription;

     
    // // 의사 계정 -> 담당한 환자 계정 리스트
    // mapping(address => address[])
    // // 환자의 전체 토큰
    // mapping(address => uint[])

    //토큰별 처방 횟수 저장
    mapping (uint256 => uint256) _prsCountOfTokenId;
    //토큰별 조제 횟수 저장
    mapping (uint256 => uint256) _offerCountOfTokenId;

        // _address 를 거쳐간 모든 처방전리스트
        function getAllListFromAccount(address _address) public view returns(preScription[] memory){
            return _allListFromAccount[_address];
        }

         // 해당 주소에서 전송한 모든 토큰
        function getAllTokensOwned(address _address) public view returns(uint[] memory){
            return _allTokensOwned[_address];
        }
        // _from에서 _to 로 전송된  처방전 리스트
        function getPatientListFromAccount(address _from, address _to) public view returns(preScription[] memory) {
            return _patientListFromAccount[_from][_to];
        }
        function getOfferCountOfToken(uint _tokenId) public view returns(uint){
            return _offerCountOfTokenId[_tokenId];
        }

        // function getRegularPreScription(address _address) public view returns(preScription[] memory) {
        //     return _regularPrescription[_address];
        // }
       


       
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
        //해당 주소의 권한 반환
        // function getAuthOfAccount(address _address) public view returns(uint){
        //     return _accountAuth[_address];
        // }
        // function getAllPrescription(address _address) public view returns(preScription[] memory){
        //     preScription[] memory prs;
        //     for(uint i = 0; i < _allTokensOwned[_address].length; i++){
        //         prs[i] = (preScriptions[_allTokensOwned[_address][i]]);
        //     }
        //     return prs;
        // }

  

        // function getListOfPatient(address _from, address _to) public returns(preScription[] memory){
        //     uint[] memory idList = _patientListFromAccount[_from][_to];
        //     preScription[] memory  prsList;
        //     for(uint i = 0; i < idList.length; i++){
        //         prsList.push(idList[i]);
        //     }
        // }





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
        string memory _dCode,
        string[] memory _dName, //약 이름
        uint _pubDate // 발행일
  
        ) {
           bool check = false;
           for (uint i = 0; i < preScriptions.length; i++){
                uint cnt = 0; 
                for(uint j = 0; j < preScriptions[i].dName.length; j++){
                    if(
                         keccak256(bytes(preScriptions[i].dName[j])) == keccak256(bytes(_dName[j])) 
                    ){
                           cnt++;
                    }
                }
            if(preScriptions[i].dName.length == _dName.length && 
                    cnt == preScriptions[i].dName.length && 
                    preScriptions[i].pubDate == _pubDate &&
                keccak256(bytes(preScriptions[i].userName)) == keccak256(bytes(_userName)) &&
                keccak256(bytes(preScriptions[i].hosName)) == keccak256(bytes(_hosName)) &&
                keccak256(bytes(preScriptions[i].dCode)) == keccak256(bytes(_dCode))
           
            ) {
                check =true;
            }
           } 
           require(!check, "Error : already exists preScription ");
           _;
        }
        // // 약 종류, 처방일 같은지 체크
        //  modifier prsnmExists(string[] memory _dName, uint256 _pubDate) {
        //     bool check = false;
        //    for (uint i = 0; i < preScriptions.length; i++){
        //     uint cnt = 0; 
        //         for(uint j = 0; j < preScriptions[i].dName.length; j++){
        //             if(
        //                  keccak256(bytes(preScriptions[i].dName[j])) == keccak256(bytes(_dName[j])) 
                      
        //             ){
        //                    cnt++;
        //             }
        //         }
         
        //         if( preScriptions[i].dName.length == _dName.length && 
        //             cnt == preScriptions[i].dName.length && 
        //             preScriptions[i].pubDate == _pubDate )
        //      {
        //         check =true;
        //     }
        //    } 
        //    require(!check, "Error : already exists preScription ");
        //    _;
        //  }
        //  주소가 가진 토큰갯수 반환
        function getBalanceOf(address _address) public view returns(uint256) {
            return balanceOf(_address);
        }

        // 트랜스퍼 나누기 의사/ 약사/ 환자 기능별로

        //환자가 약사한테
        function transferPreScription(address _from, address _to, uint _tokenId) public {
            // 처방횟수만큼 조제 받았으면 조제의뢰 불가
            require(_offerCountOfTokenId[_tokenId] != 0, 'The number of dispensing has been exceeded.');
            // 토큰 전송하면서 다른 배열들도 다 값바꿔줘야함 ex) 소유자 토큰 인덱스 등등
            //  약사가 받은 전체 토큰 ID
            _allTokensOwned[_to].push(_tokenId);
            _allListFromAccount[_to].push(preScriptions[_tokenId]);
           transferPrs(_from, _to, _tokenId);
        }

        
        // 의사가 환자한테 전송할때 
        function transferDoctorToPatient(address _from, address _to, uint _tokenId) public {
              
              transferPrs(_from, _to, _tokenId);
            _allTokensOwned[_to].push(_tokenId);
            _allListFromAccount[_to].push(preScriptions[_tokenId]);
        //     preScription memory prs = preScriptions[_tokenId];

        //     // 처방 횟수가 1보다 크면 정기처방처방전 리스트에 추가.
        //       if(prs.prescriptionCount > 1){
        //     _regularPrescription[_to].push(prs);
        // }
        //     // _patientListFromAccount[_from][_to].push(_tokenId);
            _patientListFromAccount[_from][_to].push(preScriptions[_tokenId]);

        }
        //약사가 환자한테 전송할때 
        function transferPharmacyToPatient(address _from, address _to, uint _tokenId) public {
            require(_accountAuth[_from] == 3, 'You do not permittion');
            require(_offerCountOfTokenId[_tokenId] != 0, 'The number of dispensing has been exceeded.');
            transferPrs(_from, _to, _tokenId);
            _offerCountOfTokenId[_tokenId]--;
           // _patientListFromAccount[_from][_to].push(_tokenId);
            _patientListFromAccount[_from][_to].push(preScriptions[_tokenId]);
        }
    
//    처방전 발급(민팅)
  function mint(
   
        preScription memory _preScription
         ) 
        public prsExists ( _preScription.userName, _preScription.hosName,  _preScription.dCode, _preScription.dName, _preScription.pubDate ) {
            require(_accountAuth[msg.sender] == 2, 'You do not have permission');
          
        preScriptions.push(_preScription);
        
      
        uint _id = preScriptions.length - 1;

        _allListFromAccount[msg.sender].push(_preScription);
        _blockTotokenid[block.number] = _id;
        _addToblock[msg.sender].push(block.number);
        // 제공 가능한 횟수  0 이되면 조제하면 안댐.
        _offerCountOfTokenId[_id] = _preScription.prescriptionCount;
        // .push no longer returns the length but a ref to the added element
        _mint(msg.sender, _id);
        //누가 발행한건지 저장(발행한 전체 처방전)
        setMintedTokens(_id);

        // _preScriptionsExists[_preScription] = true;

    }

    function getPreScriptionByIndex(uint index) public view returns(preScription memory) {
        return preScriptions[index];
    }

    


    constructor() ERC721Connector('PreScription','Script') {}

}


