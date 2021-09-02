"strict mode"

const Web3 = require('web3');
var Accounts = require('web3-eth-accounts');

const RINKEBY_RPC_URL =  process.env.SGT_RPC_URL || 'https://rinkeby-light.eth.linkpool.io';

var web3 = new Web3(RINKEBY_RPC_URL);
const DEFAULT_SEND_OPTIONS = {
    gas: 6000000
};
web3.eth.accounts = new Accounts(RINKEBY_RPC_URL);
const account = web3.eth.accounts.wallet.add(process.env.SGT_ACCOUNT_PRIVATE_KEY);
web3.eth.Contract.setProvider(RINKEBY_RPC_URL, web3.eth.accounts);

exports.web3 = web3;
exports.DEFAULT_SEND_OPTIONS = DEFAULT_SEND_OPTIONS;
exports.account = account;
exports.ACCOUNT_POLY_ADDRESS = account.address;