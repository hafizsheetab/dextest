const express = require("express");
const router = express.Router();
const { keypair } = require("../config");
const fs = require('fs')
const { Crypto } = require("@aeternity/aepp-sdk");
const { Universal: Ae, MemoryAccount, Node } = require("@aeternity/aepp-sdk");
const getSdkInstance = require("../SDKInstance/node");

router.get("/", async (req, res) => {
  try {
    //getting the SDK Instance
    const Chain = await getSdkInstance()

    //getting the contract code
    const FUNGIBLE_TOKEN = fs.readFileSync('./contracts/Aeternity/FungibleToken.aes','utf-8')

    // create a contract instance
    const contractInstance = await Chain.getContractInstance(FUNGIBLE_TOKEN, {contractAddress: "ct_JowfmFqyFoHnn45RzZG3Ehj3QZfaHBEFjwcRZZf6H5uh32o6V"});

    // the name of the function you want to call
    var yourFunction = "balances";

    // the parameters of your function
    yourParams = [, , ,];

    // call your function
    console.log("Calling your function: " + yourFunction);
    try {
      let callresult = await contractInstance.methods[yourFunction]();
      console.log("Transaction ID: ", callresult.hash);
      console.log(
        "Advice: log the full callResult object for more useful information!"
      );
      console.log("Function call returned: ", callresult.decodedResult);
    } catch (e) {
      console.log("Calling your function errored: ", e);
    }
    res.json({msg: 'hello'})
  } catch (err) {
    console.log(err);
    res.json({ errors: "sorry" });
  }
});

module.exports = router;
