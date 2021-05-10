const abi = require("./orfeedABI.json");
const providers = require("./providers.json");
const tokens = require("./tokens.json");
Web3 = require("web3");

web3 = new Web3(
  "https://mainnet.infura.io/v3/ed07e65b44354a48aa1f5547369fb513"
);

contractAddr = "0x8316b082621cfedab95bf4a44a1d4b64a6ffc336";
var orContract = new web3.eth.Contract(abi, contractAddr);

const test = () => {
  for (var srcToken in tokens) {
    for (var dstToken in tokens) {
      if (srcToken != dstToken) {
        console.log(srcToken, dstToken);
        providersTest(srcToken, dstToken);
        //orContract.methods.getExchangeRate(srcToken, dstToken);
      }
    }
  }
  //orContract.methods.getExchangeRate();
};

const providersTest = (srcToken, dstToken) => {
  for (var provider in providers.OrFeed) {
    orContract.methods
      .getExchangeRate(
        srcToken,
        dstToken,
        providers.OrFeed[provider],
        10 ^ tokens[srcToken].decimals
      )
      .call(function (error, data) {
        console.log(`${srcToken} to ${dstToken}: ${data} \n`);
      });
    console.log(providers.OrFeed[provider]);
  }
};
test();
