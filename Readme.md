# Sisyphus gamble v1 tests

This tests require an account with funds create contracts to send transactions.

Usage:
- `yarn install`
- define a `.env` file for example:
    ```
    SGT_ACCOUNT_PRIVATE_KEY=<YOUR-ETHEREUM-PRIVATE-KEY>
    SGT_NETWORK=Polyjuice
    SGT_RPC_URL=http://localhost:8024
    ```
- `yarn start`


### Status on Polyjuice

```log
$ node -r dotenv/config index.js
Using Polyjuice network with http://imagos:8024 RPC URL
Checking Balance...
balance of 0x44D6226d5d7c2b42523cf28A4EFC9E471e62Bb07 = 159983752328
balance of 0xD43ceeDb05Cb260123E9D683Db67D5306868b9E8 =  280000000000n
Deploying contract...
Txn Hash: 0x24ff0044f3cb8c8e004f4e623bb395f14d1d3b4790627b65b388a7a4a29b8eb9
Sisyphus gamble venues deployed on address: 0xfB9a83b9800b4d5cb6b981bee1435De9379c50cC
Deploying contract...
Txn Hash: 0x7ba4d543d778b2a35615eef28412939e34525a1fb5fdf4892a6e2e83d2491050
TestERC20 on address: 0x9e740B8a9Ca8E6C5F035D1c61B09ff7f1f4a070E
blockNumber = 8375
  waiting for the next block
  waiting for the next block
  waiting for the next block
  waiting for the next block
  waiting for the next block
  waiting for the next block
  waiting for the next block
Checking ERC20 Balance...
ERC20 Balance of 0x315a2160b5cbf24ee4f7aab0fb31926e1fb758de: 115792089237316195423570985008687907853269984665640564039457584007913129639935n
Approving ERC20 usage...
Txn Hash: 0xb526e3024abaa41fb79ce53c92303d54cdacac05b0ee25cd064b63c67937ac7f
New Sisyphus Gamble...
Txn Hash: 0xa6115767d567f85a99ca63722b81e386736277a0758c1f029848c40aba41cba6
blockNumber = 8376
  waiting for the next block
  waiting for the next block
  waiting for the next block
  waiting for the next block
Checking ERC20 Balance...
ERC20 Balance of 0x315a2160b5cbf24ee4f7aab0fb31926e1fb758de: 115792089237316195423570985008687907853269984665640564039457584007913129639934n
Getting Sisyphus Gamble Venues...
Sisyphus gamble venues deployed on address: 0x9920c79c976aB017b0510BCe4B797b8ebfAAA7Fd
Approving ERC20 usage...
Txn Hash: 0xfc7afffb684972271cbbefc1b99225812e1e4a3991b2824c0a81cf56c7c63223
Calling gamble...
Txn Hash: 0x2b36d3ba66ad54a1529206cf29240cc9c3bcc40884d91389d7bcd92c912155ce
blockNumber = 8377
  waiting for the next block
  waiting for the next block
  waiting for the next block
  waiting for the next block
Checking ERC20 Balance...
ERC20 Balance of 0x315a2160b5cbf24ee4f7aab0fb31926e1fb758de: 115792089237316195423570985008687907853269984665640564039457584007913129639933n
blockNumber = 8378
  waiting for the next block
  waiting for the next block
  waiting for the next block
  waiting for the next block
Claiming prize...
Txn Hash: 0x5c35a7bb29f485b05a3f1ad511b01ad584f766fecd2151d8e0c03d7f25d5e69d
Checking ERC20 Balance...
ERC20 Balance of 0x315a2160b5cbf24ee4f7aab0fb31926e1fb758de: 115792089237316195423570985008687907853269984665640564039457584007913129639935n
Done in 135.98s.
```

### Status on Rinkeby

```log
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