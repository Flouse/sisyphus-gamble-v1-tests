"strict mode"

const NETWORK = process.env.SGT_NETWORK;
if (NETWORK !== 'Polyjuice' && NETWORK !== 'Rinkeby') {
    throw "NETWORK environment variable must be either Polyjuice or Rinkeby";
}
console.log(`Using ${NETWORK} network with ${process.env.SGT_RPC_URL ? process.env.SGT_RPC_URL : "default"} RPC URL`);

if (!process.env.SGT_ACCOUNT_PRIVATE_KEY) {
    throw "SGT_ACCOUNT_PRIVATE_KEY environment variable not set"
}

const { web3, DEFAULT_SEND_OPTIONS, account, ACCOUNT_POLY_ADDRESS } = require('./' + NETWORK);

async function checkBalance(amount) {
    console.log(`Checking Balance...`);

    const balance = BigInt(await web3.eth.getBalance(account.address));
    console.log("balance of", account.address, `= ${balance}`);

    if (balance < amount) {
        throw `Insufficient balance. Can't issue a smart contract call. Please deposit funds to your address: ${account.address}`;
    }
}

async function deploy(contractArtifact, arguments) {
    console.log(`Deploying contract...`);
    const tx = new web3.eth.Contract(contractArtifact.abi).deploy({
        data: contractArtifact.bytecode || contractArtifact.data.bytecode.object,
        arguments: arguments,
    }).send(
        {
            ...DEFAULT_SEND_OPTIONS,
            from: account.address,
        }
    );

    tx.on('transactionHash', hash => console.log(`Txn Hash: ${hash}`));

    return tx;
}

async function checkERC20Balance(contract, address, amount) {
    console.log(`Checking ERC20 Balance...`);
    const balance = BigInt(await contract.methods.balanceOf(address).call({
        from: account.address
    }));
    console.log(`ERC20 Balance of ${address}:`, balance);

    if (balance < amount) {
        throw `Insufficient ERC20 balance. Please deposit ERC20 funds to your Ethereum address: ${account.address}`;
    }
}

async function getSisyphusGambleVenues(contract) {
    console.log(`Getting Sisyphus Gamble Venues...`);
    return contract.methods.getSisyphusGambleVenues().call({
        from: account.address
    });
}

async function approve(contract, address, amount) {
    console.log(`Approving ERC20 usage...`);
    const tx = contract.methods.approve(address, amount).send(
        {
            ...DEFAULT_SEND_OPTIONS,
            from: account.address,
        }
    );

    tx.on('transactionHash', hash => console.log(`Txn Hash: ${hash}`));

    return tx;
}

async function newSisyphusGamble(SGVenuesContract, erc20Address, startingPrize, minGamble, weight, gamblingBlocks) {
    console.log(`New Sisyphus Gamble...`);
    const tx = SGVenuesContract.methods.newSisyphusGamble(erc20Address, startingPrize, minGamble, weight, gamblingBlocks).send(
        {
            ...DEFAULT_SEND_OPTIONS,
            from: account.address,
        }
    );

    tx.on('transactionHash', hash => console.log(`Txn Hash: ${hash}`));

    return tx;
}

async function gamble(contract, amount) {
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

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

async function waitForNextBlock() {
    let blockNumber = await web3.eth.getBlockNumber();
    console.log(`blockNumber = ${blockNumber}`);
    while (await web3.eth.getBlockNumber() <= blockNumber) {
        console.log(`  waiting for the next block...`);
        await sleep(6000);
    }
}

(async () => {
    try {
        const SISYPHUSGAMBLEVENUES_ARTIFACT = require("sisyphus-gamble-v1-core/artifacts/SisyphusGambleVenues");
        const SISYPHUSGAMBLE_ARTIFACT = require("sisyphus-gamble-v1-core/artifacts/SisyphusGamble");
        const TESTERC20_ARTIFACT = require("./artifacts/testERC20");

        await checkBalance(1);

        tx = await deploy(SISYPHUSGAMBLEVENUES_ARTIFACT, []);
        const SISYPHUSGAMBLEVENUES_ADDRESS = tx._address;
        console.log(`Sisyphus gamble venues deployed on address: ${SISYPHUSGAMBLEVENUES_ADDRESS}`);
        const SGVenuesContract = new web3.eth.Contract(SISYPHUSGAMBLEVENUES_ARTIFACT.abi, SISYPHUSGAMBLEVENUES_ADDRESS);

        tx = await deploy(TESTERC20_ARTIFACT, []);
        const ERC20_ADDRESS = tx._address;
        console.log(`TestERC20 on address: ${ERC20_ADDRESS}`);
        const ERC20Contract = new web3.eth.Contract(TESTERC20_ARTIFACT.abi, ERC20_ADDRESS);

        await waitForNextBlock();
        await checkERC20Balance(ERC20Contract, ACCOUNT_POLY_ADDRESS, 2);

        await approve(ERC20Contract, SISYPHUSGAMBLEVENUES_ADDRESS, 1);
        await newSisyphusGamble(SGVenuesContract, ERC20_ADDRESS, 1, 1, 1, 1);

        await waitForNextBlock();
        await checkERC20Balance(ERC20Contract, ACCOUNT_POLY_ADDRESS, 2);

        tx = await getSisyphusGambleVenues(SGVenuesContract);
        const SISYPHUSGAMBLE_ADDRESS = tx[0].sisyphusGamble;
        console.log(`Sisyphus gamble venues deployed on address: ${SISYPHUSGAMBLE_ADDRESS}`);

        const SGContract = new web3.eth.Contract(SISYPHUSGAMBLE_ARTIFACT.abi, SISYPHUSGAMBLE_ADDRESS);

        await approve(ERC20Contract, SISYPHUSGAMBLE_ADDRESS, 1);
        await gamble(SGContract, 1);

        await waitForNextBlock();
        await checkERC20Balance(ERC20Contract, ACCOUNT_POLY_ADDRESS, 2);

        await waitForNextBlock();
        await claimPrize(SGContract);
        await checkERC20Balance(ERC20Contract, ACCOUNT_POLY_ADDRESS, 2);
    } catch (error) {
        console.log(error);
    }
})();