"strict mode"

const Web3 = require('web3');
const { PolyjuiceHttpProvider, PolyjuiceAccounts } = require("@polyjuice-provider/web3");
const { utils } = require("@ckb-lumos/base");


const GODWOKEN_RPC_URL = process.env.SGT_RPC_URL || 'https://godwoken-testnet-web3-rpc.ckbapp.dev';
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
const account = web3.eth.accounts.wallet.add(process.env.SGT_ACCOUNT_PRIVATE_KEY);
web3.eth.Contract.setProvider(provider, web3.eth.accounts);

const ACCOUNT_POLY_ADDRESS = utils.computeScriptHash({
    code_hash: polyjuiceConfig.ethAccountLockCodeHash,
    hash_type: "type",
    args: polyjuiceConfig.rollupTypeHash + account.address.slice(2).toLowerCase(),
}).slice(0, 42);

exports.web3 = web3;
exports.DEFAULT_SEND_OPTIONS = DEFAULT_SEND_OPTIONS;
exports.account = account;
exports.ACCOUNT_POLY_ADDRESS = ACCOUNT_POLY_ADDRESS;