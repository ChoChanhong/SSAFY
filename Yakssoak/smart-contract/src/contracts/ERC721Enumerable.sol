// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import './ERC721.sol';
import './interfaces/IERC721Enumerable.sol';

contract ERC721Enumerable is IERC721Enumerable, ERC721 {

    uint256[] private _allTokens;

    // mapping from tokenId to position in _allTokens array
        mapping(uint256 => uint256) private _allTokensIndex;

    // mapping of owner to list of all owner token ids
        mapping(address => uint256[]) private _ownedTokens;

    // mapping from token ID to index of the owner tokens list 
        mapping(uint256 => uint256) private _ownedTokensIndex;

    
    constructor() {
        _registerInterface(bytes4(keccak256('totalSupply(bytes4)')^
        keccak256('tokenByIndex(bytes4)')^keccak256('tokenOfOwnerByIndex(bytes4)')));
    }

    function _mint(address to, uint256 tokenId) internal override(ERC721) {
        super._mint(to, tokenId);
        //  add tokens to the owner 
        // B. all tokens to our totalsuppy - to allTokens 
        _addTokensToAllTokenEnumeration(tokenId); 
        _addTokensToOwnerEnumeration(to, tokenId);
    }

    function transferPrs(address _from, address _to, uint _tokenId) public {
        
        transferFrom(_from, _to, _tokenId);
        uint id = _ownedTokensIndex[_tokenId];
        for(uint i = id ; i < _ownedTokens[_from].length -1; i++ ){
            _ownedTokens[_from][i] = _ownedTokens[_from][i+1];
            _ownedTokensIndex[_ownedTokens[_from][i]]--;
        }
        _ownedTokens[_from].pop();
       
        _addTokensToOwnerEnumeration(_to, _tokenId);
    }
    // add tokens to the _alltokens array and set the position of the tokens indexes
    function _addTokensToAllTokenEnumeration(uint256 tokenId) private {
        // tokenId에 해당하는 토큰 가져옴
        _allTokensIndex[tokenId] = _allTokens.length;
        _allTokens.push(tokenId); 
        // 토큰 추가할때 tokenID 의 위치와 그 위치의 길이도 같이 추적.
    }

    function _addTokensToOwnerEnumeration(address to, uint256 tokenId) private {
        // EXERCISE - CHALLENGE - DO THESE THREE THINGS:
        // 1. add address and token id to the _ownedTokens
        // 2. ownedTokensIndex tokenId set to address of 
        // ownedTokens position
        // 3. we want to execute the function with minting
        
        // 해당 tokenId의 토큰이 소유자의 몇번째 토큰인지 저장
        _ownedTokensIndex[tokenId] = _ownedTokens[to].length;
        _ownedTokens[to].push(tokenId);   
    }

    // index 값에 맞는 tokenId 리턴 
    function tokenByIndex(uint256 index) public override view returns(uint256) {
        // make sure that the index is not out of bounds of the total supply 
        require(index < totalSupply(), 'global index is out of bounds!');
        return _allTokens[index];
    }
    // 소유자가 가진 토큰중 index에 맞는 tokenId 리턴 
    function tokenOfOwnerByIndex(address owner, uint index) public override view returns(uint256) {
        require(index < balanceOf(owner),'owner index is out of bounds!');
        return _ownedTokens[owner][index];  
    }
    // 소유자가 가진 모든 토큰 Id 리턴
    function alltokenOfOwner(address owner) public view returns(uint256[] memory){
        return _ownedTokens[owner];
    }

    // return the total supply of the _allTokens array
    function totalSupply() public override view returns(uint256) {
        return _allTokens.length;
    }

}