# Sisyphus gamble v1 tests

This tests require an account with funds create contracts to send transactions.

Usage:
- `yarn install`
- define a `.env` file for example:
    ```
    SGT_ACCOUNT_PRIVATE_KEY=<YOUR-ETHEREUM-PRIVATE-KEY>
    SGT_NETWORK=Polyjuice
    SGT_RPC_URL=localhost:6100 
    ```
- `yarn start`


### Status on Polyjuice: error

```
haxyz@nervos-workstation:~/sisyphus-gamble-v1-tests$ yarn start
yarn run v1.22.5
$ node -r dotenv/config index.js
Using Polyjuice network with default RPC URL
Checking Balance...
Deploying contract...
Txn Hash: 0xd6193094d500c78b60a41b42d355cb831c1dc2ea4dc42aab149006e0e9b8c1ed
Sisyphus gamble venues deployed on address: 0xC60ECb5FffF9379AedFA8B3F1E13588e28032d55
Deploying contract...
Txn Hash: 0x6520a951a138de0025b5ee747045879a465b07577b0b52c50b874ad7b632822d
TestERC20 on address: 0x86A23AD90139f58a354AD055879f720982e57491
Checking ERC20 Balance...
Approving ERC20 usage...
Txn Hash: 0xcff4ed5ce048e9cdc233852e84b7fb7e0113268cf3eef551a2283155829db08c
New Sisyphus Gamble...
Txn Hash: 0x75f8fcc4e9d252926d66383648a8cfc622aadaf87e736bc0578d377ae84ccbbf
Getting Sisyphus Gamble Venues...
Sisyphus gamble venues deployed on address: 0x86AE547922F4B0Ba2E96CB5f3ad2B7b7f63c8DF8
Approving ERC20 usage...
Txn Hash: 0x20b7d15a2444304ca6c6d2c4ed3a0ed859afa5e76d2d438c74bfc23bbe1a3d92
Calling gamble...
Txn Hash: 0x150a3310385da125fc718463d68107fbfc37f87c443bd07c5f21e80e3abb2b7d
Claiming prize...
Txn Hash: 0x83c2d81535b6db2ac8ecf9c40f7b87a6d8ff14e77926688d959892351bc23abb
Error: Transaction was not mined within 750 seconds, please make sure your transaction was properly sent. Be aware that it might still be mined!
    at Object.TransactionError (/home/haxyz/sisyphus-gamble-v1-tests/node_modules/web3-core-helpers/lib/errors.js:87:21)
    at /home/haxyz/sisyphus-gamble-v1-tests/node_modules/web3-core-method/lib/index.js:416:49
    at runMicrotasks (<anonymous>)
    at processTicksAndRejections (internal/process/task_queues.js:95:5) {
  receipt: undefined
}
Done in 875.80s.
```

### Status on Rinkeby: ok

```
haxyz@nervos-workstation:~/sisyphus-gamble-v1-tests$ yarn start
yarn run v1.22.5
$ node -r dotenv/config index.js
Using Rinkeby network with default RPC URL
Checking Balance...
Deploying contract...
Txn Hash: 0xb93dd981189fb0cefa88e9faee9cfe688389815d4e17990227e08982c8a8573d
Sisyphus gamble venues deployed on address: 0xeBB46a6fB12F0e4c637829D56b909A798A9B49cc
Deploying contract...
Txn Hash: 0x4e32e5a3576ebade1be4ef2d9742857d50b5b214b8e9fb3b94cdb7e61d810bd9
TestERC20 on address: 0xE0aFA71dB9E245Bac541844199f796a4F83e9c16
Checking ERC20 Balance...
Approving ERC20 usage...
Txn Hash: 0xf93e9ac7e589db87688f3f2a6c7ef1caccd05fdfeb43cacb3bbf5a12f7fdcb6b
New Sisyphus Gamble...
Txn Hash: 0x64fb34b08ef9383095dc2c1d9c4df1cf0fade7d20d098002bbd9449ef5840819
Getting Sisyphus Gamble Venues...
Sisyphus gamble venues deployed on address: 0xE6a92d18C389aEa0a2B49B31a2A3B89E6421cC73
Approving ERC20 usage...
Txn Hash: 0x824a4eef7b933d5d635abe3fd6754ae29904d0aaedcc580b5535c81ba825ad07
Calling gamble...
Txn Hash: 0x0455cb7afc8ae85645021187642b7ee11af636efe8e63484d38ee7362b45e31b
Claiming prize...
Txn Hash: 0x7730f99dbd7303cf1666e20bebd4195f34b88e8afb928984b7984b493cb3fbe6
Done in 102.97s.
```