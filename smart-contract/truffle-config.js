const PrivateKeyProvider = require("truffle-privatekey-provider")

const privateKey = '0x02b4cfdf1d39c7633610078338f12350ebe2793fb3d4bc261e84b46ca58eb727';

module.exports = {

  networks: {
    development: {
    host: "127.0.0.1",     // Localhost (default: none)
    port: 7545,            // Standard Ethereum port (default: none)
    network_id: "*",       // Any network (default: none)
   
    },
  // },
    // 싸피 네트워크 연결 
    ssafy : {
      provider: () => new PrivateKeyProvider(privateKey, `http://52.141.42.92:8545`),
      network_id: "*",
      
    //얘는 패키지제이슨에 넣어야함
    /*"truffle-privatekey-provider": "^1.5.0", */
    }
  },

  // networks: {
  //   development: {
  //   host: "43.201.35.88",     // Localhost (default: none)
  //   port: 8545,            // Standard Ethereum port (default: none)
  //   network_id: "*",       // Any network (default: none)
  //   },
  // ssafy : {
    // provider: () => new PrivateKeyProvider(privateKey, `http://20.196.209.2:8545`),
    // network_id: "*",
// }
  // },

  contracts_directory: './src/contracts/',
  contracts_build_directory: './src/abis',

  compilers: {
    solc: {
     version:'^0.8.0',
     optimizer:{
       enabled:'true',
       runs: 200,
      //  details:{
      //   yul: true
      //  }
     }
    }
  },

};
