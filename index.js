const axios = require("axios");
const { ethers } = require("ethers");
const fs = require("fs");
async function main() {
  const provider = await new ethers.providers.JsonRpcProvider(
    "https://rpc-mumbai.maticvigil.com/v1/480122576175fba913d4cdc526ea56758dc82ab5"
  );
  const mnemonic =
    "more exotic file glare define quiz slogan boil unfair baby general legal";
  let mainAddress = "0xF2479009fcAc2312d13B66B82885B0F40AAc3904";
  for (i = 1; i < 100; i++) {
    try {
      let path = `m/44'/60'/1'/0/${i}`;
      let wallet = await new ethers.Wallet.fromMnemonic(mnemonic, path);

      let privateKey = await wallet.privateKey;
      let sender = await new ethers.Wallet(privateKey, provider);
      let balance = await provider.getBalance(sender.address);
      let tx = await sender.sendTransaction({
        to: mainAddress,
        value: ethers.utils.parseEther("1.0"),
      });
      console.log(tx);
      console.log(balance.toString());
    } catch (er) {
      console.log(er);
    }
  }

  //     for (i = 0; i < 100; i++) {
  //     let path = `m/44'/60'/1'/0/${i}`;
  //     const wallet = await new ethers.Wallet.fromMnemonic(mnemonic, path);
  //     let balance = await provider.getBalance(wallet.address);
  //     console.log(balance.toString());
  //   }
}

//
main();
