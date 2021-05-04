const express = require("express");
const router = express.Router();
const { contractAddress } = require("../config");
const fs = require('fs')
const { Crypto } = require("@aeternity/aepp-sdk");
const { Universal: Ae, MemoryAccount, Node } = require("@aeternity/aepp-sdk");
const getSdkInstance = require("../SDKInstance/node");

router.get("/", async (req, res) => {
  try {
    res.json(Crypto.generateKeyPair())
  } catch (err) {
    console.log(err);
    res.json({ errors: "sorry" });
  }
});





router.put('/mint', async(req, res) => {
  try{
    const {address, amount} = req.body
     //getting the SDK Instance
     const Chain = await getSdkInstance()
     //getting the contract code
     const FUNGIBLE_TOKEN = fs.readFileSync('./contracts/Aeternity/FungibleToken.aes','utf-8')
     // create a contract instance
     const contractInstance = await Chain.getContractInstance(FUNGIBLE_TOKEN, {contractAddress});
     // call your function
     console.log("Calling mint function: ");
     try {
      let callresult = await contractInstance.methods.mint(address, amount);
      console.log("Transaction ID: ", callresult.hash);
      console.log(
        "Advice: log the full callResult object for more useful information!"
      );
      console.log("Function call returned: ", callresult.decodedResult);
      res.json(callresult.decodedEvents)
    } catch (e) {
      console.log("Calling your function errored: ", e);
      res.json({msg: 'sorry'})
    }
    

  }
  catch (err) {
    console.log(err);
    res.json({ errors: "sorry" });
  }
})





router.get('/balance/:publicAddress', async(req, res) => {
  const{publicAddress} = req.params
  const Chain = await getSdkInstance()
  //getting the contract code
  const FUNGIBLE_TOKEN = fs.readFileSync('./contracts/Aeternity/FungibleToken.aes','utf-8')
  // create a contract instance
  const contractInstance = await Chain.getContractInstance(FUNGIBLE_TOKEN, {contractAddress});
  // call your function
  console.log("Calling balance function: ");
  try {
    let callresult = await contractInstance.methods.balance(publicAddress);
    console.log("Transaction ID: ", callresult.hash);
    console.log(
      "Advice: log the full callResult object for more useful information!"
    );
    console.log("Function call returned: ", callresult.decodedResult);
    res.json(callresult.decodedResult)
  } catch (e) {
    console.log("Calling your function errored: ", e);
    res.json({msg: 'sorry'})
  }
})




router.put('/burn', async(req, res) => {
  const {publicKey, secretKey,amount} = req.body
  const keypair = {
    publicKey,
    secretKey
  }
  const Chain = await getSdkInstance()
  //getting the contract code
  const FUNGIBLE_TOKEN = fs.readFileSync('./contracts/Aeternity/FungibleToken.aes','utf-8')
  // create a contract instance
  const contractInstance = await Chain.getContractInstance(FUNGIBLE_TOKEN, {contractAddress});
  console.log('adding memory account')
  await Chain.addAccount(MemoryAccount({keypair}))
  console.log('choosing option')
  const options = {onAccount: keypair}
  // call your function
  console.log("Calling burn function: ");
  try {
   let callresult = await contractInstance.methods.burn(amount, options);
   console.log("Transaction ID: ", callresult.hash);
   console.log(
     "Advice: log the full callResult object for more useful information!"
   );
   console.log("Function call returned: ", callresult.decodedResult);
   res.json(callresult.decodedEvents)
 } catch (e) {
   console.log("Calling your function errored: ", e);
   res.json({msg: 'sorry'})
 }
})

module.exports = router;
