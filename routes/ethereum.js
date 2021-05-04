const express = require("express");
const router = express.Router();
const Web3 = require("web3");
const tokenAbi = require("../solidityAbis/TokenBase.json");
const HDWalletProvider = require("@truffle/hdwallet-provider");
const { contractAddressEth, keypairEth, nodeAddressEth } = require("../config");
const { privateKey, publicKey } = keypairEth;
const provider = new HDWalletProvider(privateKey, nodeAddressEth);
const web3 = new Web3(provider);

router.put("/mint", async (req, res) => {
  try {
    const { toAddress, amount } = req.body;
    tokenContractInterface = await new web3.eth.Contract(
      tokenAbi,
      contractAddressEth,
      {
        from: publicKey,
        gasPrice: "1000000000",
      }
    );
    var tx = {
      from: publicKey,
      to: contractAddressEth,
      value: 0,
      gasPrice: "1000000000",
      gas: "6721900",
      data: tokenContractInterface.methods.mint(toAddress, amount).encodeABI(),
    };
    var signedTx = await web3.eth.accounts.signTransaction(tx, privateKey);
    var sentTx = await web3.eth.sendSignedTransaction(
      signedTx.raw || signedTx.rawTransaction
    );
    console.log(sentTx);

    res.json(sentTx);
  } catch (err) {
    console.log(err);
    res.json({ msg: "sorry" });
  }
});

router.put("/burn", async (req, res) => {
  try {
    const { fromAddress, amount } = req.body;
    tokenContractInterface = await new web3.eth.Contract(
      tokenAbi,
      contractAddressEth,
      {
        from: publicKey,
        gasPrice: "1000000000",
      }
    );
    var tx = {
      from: publicKey,
      to: contractAddressEth,
      value: 0,
      gasPrice: "1000000000",
      gas: "6721900",
      data: tokenContractInterface.methods
        .burn(fromAddress, amount)
        .encodeABI(),
    };
    var signedTx = await web3.eth.accounts.signTransaction(tx, privateKey);
    var sentTx = await web3.eth.sendSignedTransaction(
      signedTx.raw || signedTx.rawTransaction
    );
    console.log(sentTx);
    res.json(sentTx);
  } catch (err) {
    console.log(err);
    res.json({ msg: "sorry" });
  }
});

router.get("/balance/:accountAddress", async (req, res) => {
  try {
    const { accountAddress } = req.params;
    tokenContractInterface = await new web3.eth.Contract(
      tokenAbi,
      contractAddressEth,
      {
        from: publicKey,
        gasPrice: "1000000000",
      }
    );
    res.json(
      await tokenContractInterface.methods
        .balanceOf(accountAddress)
        .call({ from: publicKey })
    );
  } catch (err) {
    console.log(err);
    res.json({ msg: "sorry" });
  }
});
module.exports = router;
