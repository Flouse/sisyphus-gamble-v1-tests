# Sisyphus gamble v1 tests

This tests require an account with:
- funds to send transactions
- ERC20 token funds to test the contract 

### Status on Polyjuice: error

```
haxyz@nervos-workstation:~/sisyphus-gamble-v1-tests$ node index.js Polyjuice
Using Polyjuice network
Checking Balance...
Checking WETH Balance...
Approving WETH usage...
Txn Hash: 0x3a231dc9c56b3035955361e937740eb41f1d83a6b7f5c4c5a95ba6a17a01dd3b
new Sisyphus Gamble...
Txn Hash: 0x6f1347259b24f932be7a0db8722f8a5d0f74ad16a2eb67d731395c1f424cfd4d
Error: Transaction was not mined within 750 seconds, please make sure your transaction was properly sent. Be aware that it might still be mined!
    at Object.TransactionError (/home/haxyz/sisyphus-gamble-v1-tests/node_modules/web3-core-helpers/lib/errors.js:87:21)
    at /home/haxyz/sisyphus-gamble-v1-tests/node_modules/web3-core-method/lib/index.js:416:49
    at runMicrotasks (<anonymous>)
    at processTicksAndRejections (internal/process/task_queues.js:95:5) {
  receipt: undefined
}
```

### Status on Rinkeby: ok

```
haxyz@nervos-workstation:~/sisyphus-gamble-v1-tests$ node index.js Rinkeby
Using Rinkeby network
Checking Balance...
Checking WETH Balance...
Approving WETH usage...
Txn Hash: 0x1988cb483325f7bb02a799d0dcae8208cc81ec6bb1f167a285e2ec5c85cc2a60
new Sisyphus Gamble...
Txn Hash: 0x1397b58390992c4d7ac74ecee785c5492d21bf94e9d3464ff4bf82a2c987fa66
Getting Sisyphus Gamble Venues...
Approving WETH usage...
Txn Hash: 0x8a090b1aa792c5b65004fea2341f95eb701ab0937aa3a90be86b7b8805c1bece
Calling gamble...
Txn Hash: 0xf5e0bf3412f4e837ac04e985e5a1b802ff5ecd26a723023f0f612531f9e951c2
Claiming prize...
Txn Hash: 0x72c5f29a5e11d37539c9ac2eb41fb048ba37fb6f36dceb38bccc9cdcc2affd13
```