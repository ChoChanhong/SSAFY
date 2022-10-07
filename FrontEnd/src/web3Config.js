
const nftAbi =[
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "_owner",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "_approved",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "_tokenId",
        "type": "uint256"
      }
    ],
    "name": "Approval",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "_from",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "_to",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "_tokenId",
        "type": "uint256"
      }
    ],
    "name": "Transfer",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      }
    ],
    "name": "alltokenOfOwner",
    "outputs": [
      {
        "internalType": "uint256[]",
        "name": "",
        "type": "uint256[]"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "approve",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_owner",
        "type": "address"
      }
    ],
    "name": "balanceOf",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [],
    "name": "name",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_tokenId",
        "type": "uint256"
      }
    ],
    "name": "ownerOf",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "preScriptions",
    "outputs": [
      {
        "internalType": "string",
        "name": "userName",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "hosName",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "pharName",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "dCode",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "dispensingCount",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "prescriptionCount",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "pubDate",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "prepDate",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "bytes4",
        "name": "interfaceID",
        "type": "bytes4"
      }
    ],
    "name": "supportsInterface",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [],
    "name": "symbol",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "index",
        "type": "uint256"
      }
    ],
    "name": "tokenByIndex",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "index",
        "type": "uint256"
      }
    ],
    "name": "tokenOfOwnerByIndex",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [],
    "name": "totalSupply",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_from",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "_to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "_tokenId",
        "type": "uint256"
      }
    ],
    "name": "transferFrom",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_from",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "_to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "_tokenId",
        "type": "uint256"
      }
    ],
    "name": "transferPrs",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_address",
        "type": "address"
      }
    ],
    "name": "getAllListFromAccount",
    "outputs": [
      {
        "components": [
          {
            "internalType": "string",
            "name": "userName",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "hosName",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "pharName",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "dCode",
            "type": "string"
          },
          {
            "internalType": "string[]",
            "name": "dName",
            "type": "string[]"
          },
          {
            "internalType": "uint256[]",
            "name": "dosage",
            "type": "uint256[]"
          },
          {
            "internalType": "uint256[]",
            "name": "doseNum",
            "type": "uint256[]"
          },
          {
            "internalType": "uint256[]",
            "name": "dosePeriod",
            "type": "uint256[]"
          },
          {
            "internalType": "uint256",
            "name": "dispensingCount",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "prescriptionCount",
            "type": "uint256"
          },
          {
            "internalType": "string[]",
            "name": "howtoTake",
            "type": "string[]"
          },
          {
            "internalType": "uint256",
            "name": "pubDate",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "prepDate",
            "type": "uint256"
          }
        ],
        "internalType": "struct PreScription.preScription[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_from",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "_to",
        "type": "address"
      }
    ],
    "name": "getPatientListFromAccount",
    "outputs": [
      {
        "components": [
          {
            "internalType": "string",
            "name": "userName",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "hosName",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "pharName",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "dCode",
            "type": "string"
          },
          {
            "internalType": "string[]",
            "name": "dName",
            "type": "string[]"
          },
          {
            "internalType": "uint256[]",
            "name": "dosage",
            "type": "uint256[]"
          },
          {
            "internalType": "uint256[]",
            "name": "doseNum",
            "type": "uint256[]"
          },
          {
            "internalType": "uint256[]",
            "name": "dosePeriod",
            "type": "uint256[]"
          },
          {
            "internalType": "uint256",
            "name": "dispensingCount",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "prescriptionCount",
            "type": "uint256"
          },
          {
            "internalType": "string[]",
            "name": "howtoTake",
            "type": "string[]"
          },
          {
            "internalType": "uint256",
            "name": "pubDate",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "prepDate",
            "type": "uint256"
          }
        ],
        "internalType": "struct PreScription.preScription[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_tokenId",
        "type": "uint256"
      }
    ],
    "name": "getOfferCountOfToken",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_address",
        "type": "address"
      }
    ],
    "name": "setPatientAuth",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_address",
        "type": "address"
      }
    ],
    "name": "setDoctorAuth",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_address",
        "type": "address"
      }
    ],
    "name": "setPharmacyAuth",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_address",
        "type": "address"
      }
    ],
    "name": "getAuthOfAccount",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_tokenId",
        "type": "uint256"
      }
    ],
    "name": "setMintedTokens",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getMintedTokens",
    "outputs": [
      {
        "internalType": "uint256[]",
        "name": "",
        "type": "uint256[]"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_address",
        "type": "address"
      }
    ],
    "name": "getBalanceOf",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_from",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "_to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "_tokenId",
        "type": "uint256"
      }
    ],
    "name": "transferPreScription",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_from",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "_to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "_tokenId",
        "type": "uint256"
      }
    ],
    "name": "transferDoctorToPatient",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_from",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "_to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "_tokenId",
        "type": "uint256"
      }
    ],
    "name": "transferPharmacyToPatient",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "components": [
          {
            "internalType": "string",
            "name": "userName",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "hosName",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "pharName",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "dCode",
            "type": "string"
          },
          {
            "internalType": "string[]",
            "name": "dName",
            "type": "string[]"
          },
          {
            "internalType": "uint256[]",
            "name": "dosage",
            "type": "uint256[]"
          },
          {
            "internalType": "uint256[]",
            "name": "doseNum",
            "type": "uint256[]"
          },
          {
            "internalType": "uint256[]",
            "name": "dosePeriod",
            "type": "uint256[]"
          },
          {
            "internalType": "uint256",
            "name": "dispensingCount",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "prescriptionCount",
            "type": "uint256"
          },
          {
            "internalType": "string[]",
            "name": "howtoTake",
            "type": "string[]"
          },
          {
            "internalType": "uint256",
            "name": "pubDate",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "prepDate",
            "type": "uint256"
          }
        ],
        "internalType": "struct PreScription.preScription",
        "name": "_preScription",
        "type": "tuple"
      }
    ],
    "name": "mint",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "index",
        "type": "uint256"
      }
    ],
    "name": "getPreScriptionByIndex",
    "outputs": [
      {
        "components": [
          {
            "internalType": "string",
            "name": "userName",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "hosName",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "pharName",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "dCode",
            "type": "string"
          },
          {
            "internalType": "string[]",
            "name": "dName",
            "type": "string[]"
          },
          {
            "internalType": "uint256[]",
            "name": "dosage",
            "type": "uint256[]"
          },
          {
            "internalType": "uint256[]",
            "name": "doseNum",
            "type": "uint256[]"
          },
          {
            "internalType": "uint256[]",
            "name": "dosePeriod",
            "type": "uint256[]"
          },
          {
            "internalType": "uint256",
            "name": "dispensingCount",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "prescriptionCount",
            "type": "uint256"
          },
          {
            "internalType": "string[]",
            "name": "howtoTake",
            "type": "string[]"
          },
          {
            "internalType": "uint256",
            "name": "pubDate",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "prepDate",
            "type": "uint256"
          }
        ],
        "internalType": "struct PreScription.preScription",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  }
];

const cfmAbi = [
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "_owner",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "_approved",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "_tokenId",
        "type": "uint256"
      }
    ],
    "name": "Approval",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "_from",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "_to",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "_tokenId",
        "type": "uint256"
      }
    ],
    "name": "Transfer",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      }
    ],
    "name": "alltokenOfOwner",
    "outputs": [
      {
        "internalType": "uint256[]",
        "name": "",
        "type": "uint256[]"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "approve",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_owner",
        "type": "address"
      }
    ],
    "name": "balanceOf",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "cfms",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "userName",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "hosName",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "pharName",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "prescriptionCount",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "dispensingCount",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "prepDate",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "howtoTake",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [],
    "name": "name",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_tokenId",
        "type": "uint256"
      }
    ],
    "name": "ownerOf",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "bytes4",
        "name": "interfaceID",
        "type": "bytes4"
      }
    ],
    "name": "supportsInterface",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [],
    "name": "symbol",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "index",
        "type": "uint256"
      }
    ],
    "name": "tokenByIndex",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "index",
        "type": "uint256"
      }
    ],
    "name": "tokenOfOwnerByIndex",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [],
    "name": "totalSupply",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_from",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "_to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "_tokenId",
        "type": "uint256"
      }
    ],
    "name": "transferFrom",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_from",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "_to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "_tokenId",
        "type": "uint256"
      }
    ],
    "name": "transferPrs",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "id",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "userName",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "hosName",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "pharName",
            "type": "string"
          },
          {
            "internalType": "string[]",
            "name": "dName",
            "type": "string[]"
          },
          {
            "internalType": "uint256[]",
            "name": "dosage",
            "type": "uint256[]"
          },
          {
            "internalType": "uint256[]",
            "name": "doseNum",
            "type": "uint256[]"
          },
          {
            "internalType": "uint256[]",
            "name": "dosePeriod",
            "type": "uint256[]"
          },
          {
            "internalType": "uint256",
            "name": "prescriptionCount",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "dispensingCount",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "prepDate",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "howtoTake",
            "type": "string"
          }
        ],
        "internalType": "struct Confirmation.confirmation",
        "name": "_confirmation",
        "type": "tuple"
      }
    ],
    "name": "mint",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_from",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "_to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "_tokenId",
        "type": "uint256"
      }
    ],
    "name": "transferconfirmation",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_address",
        "type": "address"
      }
    ],
    "name": "getcfmsByAccount",
    "outputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "id",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "userName",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "hosName",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "pharName",
            "type": "string"
          },
          {
            "internalType": "string[]",
            "name": "dName",
            "type": "string[]"
          },
          {
            "internalType": "uint256[]",
            "name": "dosage",
            "type": "uint256[]"
          },
          {
            "internalType": "uint256[]",
            "name": "doseNum",
            "type": "uint256[]"
          },
          {
            "internalType": "uint256[]",
            "name": "dosePeriod",
            "type": "uint256[]"
          },
          {
            "internalType": "uint256",
            "name": "prescriptionCount",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "dispensingCount",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "prepDate",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "howtoTake",
            "type": "string"
          }
        ],
        "internalType": "struct Confirmation.confirmation[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_from",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "_to",
        "type": "address"
      }
    ],
    "name": "getpatientListFromAccount",
    "outputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "id",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "userName",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "hosName",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "pharName",
            "type": "string"
          },
          {
            "internalType": "string[]",
            "name": "dName",
            "type": "string[]"
          },
          {
            "internalType": "uint256[]",
            "name": "dosage",
            "type": "uint256[]"
          },
          {
            "internalType": "uint256[]",
            "name": "doseNum",
            "type": "uint256[]"
          },
          {
            "internalType": "uint256[]",
            "name": "dosePeriod",
            "type": "uint256[]"
          },
          {
            "internalType": "uint256",
            "name": "prescriptionCount",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "dispensingCount",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "prepDate",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "howtoTake",
            "type": "string"
          }
        ],
        "internalType": "struct Confirmation.confirmation[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_tokenId",
        "type": "uint256"
      }
    ],
    "name": "getcountOfprs",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  }
];

    export const nftCA = '0x8e8f0ea2106D6Bc57D0dC980811f4bd4Dc9492d8';

    export const cfmCA = '0x38d2bac85d5D53D88A0CBA15674d697083959527';
    // export const web3 = new Web3(window.ethereum);
    export const abi = nftAbi;
    export const cfmabi = cfmAbi;
    // export const nftContract = web3.eth.Contract(nftAbi, nftCA);