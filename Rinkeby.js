"strict mode"

const Web3 = require('web3');
var Accounts = require('web3-eth-accounts');

//This tests require an account with:
//- funds to send transactions
//- ERC20 token funds to test the contract
const { ACCOUNT_PRIVATE_KEY } = require('./secrets');       //<- COMMENT OUT THIS &
//const ACCOUNT_PRIVATE_KEY = '<YOUR_ETHEREUM_PRIVATE_KEY>';//<- UNCOMMENT AND REPLACE THIS ;)

// This contract is a SisyphusGambleVenues, full solidity contract can be found at:
// https://github.com/haxyz/SisyphusGamble/blob/master/SisyphusGamble.sol
// Transaction hash: 0x5674ab9bdd33892a265f96315f64b7813bfb92a8a3eee12207761d1f9788224b
// Deployed contract address:
const SISYPHUSGAMBLEVENUES_ADDRESS = '0x6f1214be97e5146edf8889511f7624148a9c948d';

// The contract used is a ERC20 Wrapped Ether:
const ERC20_ADDRESS = '0xc778417e063141139fce010982780140aa0cd5ab';

const RINKEBY_RPC_URL = 'https://rinkeby-light.eth.linkpool.io';

var web3 = new Web3(RINKEBY_RPC_URL);
const DEFAULT_SEND_OPTIONS = {
    gas: 6000000
};
web3.eth.accounts = new Accounts(RINKEBY_RPC_URL);
const account = web3.eth.accounts.wallet.add(ACCOUNT_PRIVATE_KEY);
web3.eth.Contract.setProvider(RINKEBY_RPC_URL, web3.eth.accounts);

exports.web3 = web3;
exports.DEFAULT_SEND_OPTIONS = DEFAULT_SEND_OPTIONS;
exports.account = account;
exports.ACCOUNT_POLY_ADDRESS = account.address;
exports.SISYPHUSGAMBLEVENUES_ADDRESS = SISYPHUSGAMBLEVENUES_ADDRESS;
exports.ERC20_ADDRESS = ERC20_ADDRESS;