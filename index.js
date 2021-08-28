"strict mode"

const args = process.argv.slice(2);

if (args[0] !== 'Polyjuice' && args[0] !== 'Rinkeby') {
    throw "First argument must be either Polyjuice or Rinkeby";
}
if (args[0] == 'Rinkeby') {
    throw "Rinkeby not implemented yet";
}

const {web3, DEFAULT_SEND_OPTIONS, account, POLY_ADDRESS, SISYPHUSGAMBLEVENUES_ADDRESS, ERC20_ADDRESS} = require('./'+args[0]);
const {SISYPHUSGAMBLEVENUES_ABI, IERC20_ABI} = require('./ABI');

async function checkBalance(amount) {
    console.log(`Checking Balance...`);

    const balance = BigInt(await web3.eth.getBalance(account.address));

    if (balance < amount) {
        throw `Insufficient balance. Can't issue a smart contract call. Please deposit funds to your Ethereum address: ${account.address}`;
    }
}

async function checkWETHBalance(contract,amount) {
    console.log(`Checking WETH Balance...`);
    const balance = BigInt(await contract.methods.balanceOf(POLY_ADDRESS).call({
        from: account.address
    }));

    if (balance < amount) {
        throw `Insufficient WETH balance. Please deposit WETH funds to your Ethereum address: ${account.address}`;
    }
}

async function approve(tokenContract,address,amount) {
    console.log(`Approving WETH usage...`);
    const tx = tokenContract.methods.approve(address,amount).send(
        {
            ...DEFAULT_SEND_OPTIONS,
            from: account.address,
        }
    );

    tx.on('transactionHash', hash => console.log(`Approve call transaction hash: ${hash}`));

    const receipt = await tx;

    console.log('Approve call transaction receipt: ', receipt);
}

(async () => {
    try {
        console.log(`Using ${args[0]} network`);
        const SGVenuesContract  = new web3.eth.Contract(SISYPHUSGAMBLEVENUES_ABI, SISYPHUSGAMBLEVENUES_ADDRESS);
        const WETHContract = new web3.eth.Contract(IERC20_ABI, ERC20_ADDRESS);

        await checkBalance(1);
        await checkWETHBalance(WETHContract,2);
        await approve(WETHContract,SISYPHUSGAMBLEVENUES_ADDRESS,1);
    } catch (error) {
        console.log(error);
    }
})();