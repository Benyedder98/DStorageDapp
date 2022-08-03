require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.9",
  paths: {
    artifacts: './src/artifacts', 
  },
  networks: {
    hardhat: {
      chainId: 1337
    },
    rinkeby: {
      url: 'https://rinkeby.infura.io/v3/0502698a378f444a94ace879205a73f0',
      accounts: ['0x4ddeb936d4fb31b82ab42003dad1d4b23433043056abf64789c636b5c31ff9af']
    }
  }
};
