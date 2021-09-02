"strict mode"

const Web3 = require('web3');
const { PolyjuiceHttpProvider, PolyjuiceAccounts } = require("@polyjuice-provider/web3");
const { utils } = require("@ckb-lumos/base");

const GODWOKEN_RPC_URL = process.env.SGT_RPC_URL || 'https://godwoken-testnet-web3-rpc.ckbapp.dev';

const polyjuiceConfig = {
    rollupTypeHash: '0xdf6913a5941ffda9756b0a325fb1115521af6d1c08841505f84bdb6e0f9b7b10',
    ethAccountLockCodeHash: '0x2cf55023e2bfdbb86e0d95320f7d2f15393a76a830d5bb5e687e0c780d90134d',
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