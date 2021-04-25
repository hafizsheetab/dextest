const { keypair } = require("../config");
const { Universal: Ae, MemoryAccount, Node } = require("@aeternity/aepp-sdk");
const getSdkInstance = async () => {
    // This Function returns an instance that is connected to the Aeternity blockchain. 
    // You can use this instance anywhere in the code and it is initialized with a Memory Account
    // You can add any account and then use it by the options parameter
  try {
    
    const NODE_URL = "https://testnet.aeternity.io";
    const NODE_INTERNAL_URL = "https://testnet.aeternity.io";
    const COMPILER_URL = "https://compiler.aepps.com";
    const account = MemoryAccount({ keypair });
    const node = await Node({ url: NODE_URL, internalUrl: NODE_INTERNAL_URL });
    const Chain = await Ae({
      nodes: [
        {
          name: "testNode",
          instance: node,
        },
      ],
      compilerUrl: COMPILER_URL,
      accounts: [account],
      address: keypair.publicKey,
    });
    const height = await Chain.height();
    console.log("Connected to Testnet Node! Current Block:", height);
    return Chain
  } catch (e) {
    console.log(e);
    return null;
  }
};

module.exports = getSdkInstance
