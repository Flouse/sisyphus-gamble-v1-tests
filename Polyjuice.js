"strict mode"

const Web3 = require('web3');
const { PolyjuiceHttpProvider, PolyjuiceAccounts } = require("@polyjuice-provider/web3");

const { ACCOUNT_PRIVATE_KEY } = require('./secrets');       //<- COMMENT OUT THIS &
//const ACCOUNT_PRIVATE_KEY = '<YOUR_ETHEREUM_PRIVATE_KEY>';//<- UNCOMMENT AND REPLACE THIS ;)

// This contract is a SisyphusGambleVenues, full solidity contract can be found at:
// https://github.com/haxyz/SisyphusGamble/blob/master/contracts/SisyphusGamble.sol
// Transaction hash: 0x1b0e1615f005b40e7e04e7143834b86b424858ce3a588f1e87e8bf10bea4efcd
// Deployed contract address:
const SISYPHUSGAMBLEVENUES_ADDRESS = '0x538d6f5ae9235Ca33B1018782dCC14566cc92434';

// The contract used is a ERC20 Proxy Contract deployed with the follwing arguments:
// const SUDT_NAME = 'Nervos Ethereum';
// const SUDT_SYMBOL = 'ckETH';
// const SUDT_TOTAL_SUPPLY = 1000000000;
// const SUDT_ID = '30';
// Transaction hash: 0xd0fabc258fea858849f0e12199d79ee4be3848f9ca57c2850f45e254a0ada2ab
// Deployed contract address:
const ERC20_ADDRESS = '0x659f945e59b11a4E2dd2AD62a934BeEe5436eAaf';

const GODWOKEN_RPC_URL = 'https://godwoken-testnet-web3-rpc.ckbapp.dev';
const polyjuiceConfig = {
    rollupTypeHash: '0x4cc2e6526204ae6a2e8fcf12f7ad472f41a1606d5b9624beebd215d780809f6a',
    ethAccountLockCodeHash: '0xdeec13a7b8e100579541384ccaf4b5223733e4a5483c3aec95ddc4c1d5ea5b22',
    web3Url: GODWOKEN_RPC_URL
};
  
const provider = new PolyjuiceHttpProvider(
    GODWOKEN_RPC_URL,
    polyjuiceConfig,
);

const web3 = new Web3(provider);
const DEFAULT_SEND_OPTIONS = {
    gas: 6000000
};
web3.eth.accounts = new PolyjuiceAccounts(polyjuiceConfig);
const account = web3.eth.accounts.wallet.add(ACCOUNT_PRIVATE_KEY);
web3.eth.Contract.setProvider(provider, web3.eth.accounts);

//Use the real deal from libray!!!///////////////////////////////////////////////////////////////////////////
const POLY_ADDRESS = '0x6a9729b13a39c948b5a47dc20be3282c03bf98dd';

exports.web3 = web3;
exports.DEFAULT_SEND_OPTIONS = DEFAULT_SEND_OPTIONS
exports.account = account;
exports.POLY_ADDRESS = POLY_ADDRESS
exports.SISYPHUSGAMBLEVENUES_ADDRESS = SISYPHUSGAMBLEVENUES_ADDRESS;
exports.ERC20_ADDRESS = ERC20_ADDRESS;