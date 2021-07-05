const axios = require("axios");

const { ethers } = require("ethers");
const address = require("./address.json");
let i = 0;
function faucet() {
  console.log(i, address.addresses[i]);
  axios
    .post("https://api.faucet.matic.network/transferTokens", {
      address: address.addresses[i],
      network: "mumbai",
      token: "maticToken",
    })
    .then((res) => {
      i = (i + 1) % 100;
      if (i === 99) {
        setTimeout(() => {
          faucet();
        }, 60000);
      } else faucet();
      console.log("Hash", res.data);
    })
    .catch((err) => {
      console.log("Error", err);
      i = (i + 1) % 100;
      if (i === 99) {
        setTimeout(() => {
          faucet();
        }, 60000);
      } else faucet();
    });
}

//
faucet();
