"strict mode"

const args = process.argv.slice(2);

if (args[0] !== 'Polyjuice' && args[0] !== 'Rinkeby') {
    throw "First argument must be either Polyjuice or Rinkeby";
}

const {web3, DEFAULT_SEND_OPTIONS, account, ACCOUNT_POLY_ADDRESS, SISYPHUSGAMBLEVENUES_ADDRESS, ERC20_ADDRESS} = require('./'+args[0]);
const {SISYPHUSGAMBLEVENUES_ABI, SISYPHUSGAMBLE_ABI, IERC20_ABI} = require('./ABI');

async function checkBalance(amount) {
    console.log(`Checking Balance...`);

    const balance = BigInt(await web3.eth.getBalance(account.address));

    if (balance < amount) {
        throw `Insufficient balance. Can't issue a smart contract call. Please deposit funds to your Ethereum address: ${account.address}`;
    }
}

async function checkWETHBalance(contract, address, amount) {
    console.log(`Checking WETH Balance...`);
    const balance = BigInt(await contract.methods.balanceOf(address).call({
        from: account.address
    }));

    if (balance < amount) {
        throw `Insufficient WETH balance. Please deposit WETH funds to your Ethereum address: ${account.address}`;
    }
}

async function getSisyphusGambleVenues(contract) {
    console.log(`Getting Sisyphus Gamble Venues...`);
    return contract.methods.getSisyphusGambleVenues().call({
        from: account.address
    });
}

async function approve(contract,address,amount) {
    console.log(`Approving WETH usage...`);
    const tx = contract.methods.approve(address,amount).send(
        {
            ...DEFAULT_SEND_OPTIONS,
            from: account.address,
        }
    );

    tx.on('transactionHash', hash => console.log(`Txn Hash: ${hash}`));

    return tx;
}

async function newSisyphusGamble(SGVenuesContract, erc20Address, startingPrize, minGamble, weight, gamblingBlocks) {
    console.log(`new Sisyphus Gamble...`);
    const tx = SGVenuesContract.methods.newSisyphusGamble(erc20Address, startingPrize, minGamble, weight, gamblingBlocks).send(
        {
            ...DEFAULT_SEND_OPTIONS,
            from: account.address,
        }
    );

    tx.on('transactionHash', hash => console.log(`Txn Hash: ${hash}`));

    return tx;
}

async function gamble(contract,amount) {
    console.log(`Calling gamble...`);
    const tx = contract.methods.gamble(amount).send(
        {
            ...DEFAULT_SEND_OPTIONS,
            from: account.address,
        }
    );

    tx.on('transactionHash', hash => console.log(`Txn Hash: ${hash}`));

    return tx;
}

async function claimPrize(contract) {
    console.log(`Claiming prize...`);
    const tx = contract.methods.claimPrize().send(
        {
            ...DEFAULT_SEND_OPTIONS,
            from: account.address,
        }
    );

    tx.on('transactionHash', hash => console.log(`Txn Hash: ${hash}`));

    return tx;
}

(async () => {
    try {
        console.log(`Using ${args[0]} network`);
        const SGVenuesContract  = new web3.eth.Contract(SISYPHUSGAMBLEVENUES_ABI, SISYPHUSGAMBLEVENUES_ADDRESS);
        const WETHContract = new web3.eth.Contract(IERC20_ABI, ERC20_ADDRESS);

        await checkBalance(1);
        await checkWETHBalance(WETHContract,ACCOUNT_POLY_ADDRESS,2);

        await approve(WETHContract,SISYPHUSGAMBLEVENUES_ADDRESS,1);
        await newSisyphusGamble(SGVenuesContract, ERC20_ADDRESS, 1, 1, 1, 1);
        tx = await getSisyphusGambleVenues(SGVenuesContract);

        const SISYPHUSGAMBLE_ADDRESS = tx[0].sisyphusGamble;
        const SGContract  = new web3.eth.Contract(SISYPHUSGAMBLE_ABI, SISYPHUSGAMBLE_ADDRESS);

        await approve(WETHContract,SISYPHUSGAMBLE_ADDRESS,1);
        await gamble(SGContract,1);
        await claimPrize(SGContract);        
    } catch (error) {
        console.log(error);
    }
})();