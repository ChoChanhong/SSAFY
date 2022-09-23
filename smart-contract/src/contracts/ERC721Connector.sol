// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import './ERC721Metadata.sol';
import './ERC721Enumerable.sol';

contract ERC721Connector is ERC721Metadata, ERC721Enumerable {
    //커넥터 배포할 떄, 메타데이터 정보도 전달되게

    constructor(string memory name, string memory symbol)  
    ERC721Metadata(name, symbol) {
        
    }

}