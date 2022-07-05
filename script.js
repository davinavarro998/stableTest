//Web3
var web3 = new Web3(ethereum);
//Contract's ABIs and addresses
var abi = [
    {
        "inputs": [],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "stateMutability": "payable",
        "type": "fallback",
        "payable": true
    },
    {
        "inputs": [],
        "name": "getLatestPrice",
        "outputs": [
        {
            "internalType": "int256",
            "name": "",
            "type": "int256"
        }
        ],
        "stateMutability": "view",
        "type": "function",
        "constant": true
    },
    {
        "inputs": [],
        "name": "owner",
        "outputs": [
        {
            "internalType": "address",
            "name": "",
            "type": "address"
        }
        ],
        "stateMutability": "view",
        "type": "function",
        "constant": true
    },
    {
        "inputs": [],
        "name": "price",
        "outputs": [
        {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
        }
        ],
        "stateMutability": "view",
        "type": "function",
        "constant": true
    },
    {
        "inputs": [],
        "name": "stableCoin",
        "outputs": [
        {
            "internalType": "contract StableCoin",
            "name": "",
            "type": "address"
        }
        ],
        "stateMutability": "view",
        "type": "function",
        "constant": true
    },
    {
        "stateMutability": "payable",
        "type": "receive",
        "payable": true
    },
    {
        "inputs": [
        {
            "internalType": "address",
            "name": "_stableCoinAddress",
            "type": "address"
        }
        ],
        "name": "setStableCoinAddress",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "buyTokens",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function",
        "payable": true
    },
    {
        "inputs": [],
        "name": "recoverEther",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
];

var vaultAddress = '0xee9E10EcC6cAB4D5D0F7f4c897C741AD4899DcE5';
var stableCoinAddress = '0x708fEcd05d496E05EF335E52915754A32D8b963c';




document.getElementById('stable_coin_address').innerHTML = stableCoinAddress;
document.getElementById('vault_address').innerHTML = vaultAddress;


async function init() {
    if (window.ethereum){
        var web3 = new Web3(window.ethereum);
        try {
            let accounts = await window.ethereum.request({method:   'eth_requestAccounts'});
            let account = accounts[0];
            return account;
        } catch(error) {

        }
    } else{
        alert("Please, install your wallet!");
    }
}

document.getElementById('connect_btn').addEventListener('click', ()=>{
    init().then((res)=>{alert(res)});
});

async function getLatestPrice(){
    if (window.ethereum){
        var web3 = new Web3(window.ethereum);
        try {
            let myContract = new web3.eth.Contract(abi, vaultAddress);
            let sendCall = await myContract.methods.getLatestPrice().call();
            return sendCall;
        } catch(error) {
            alert(error);
        }
    } else{
        alert("Please, install your wallet!");
    }
}

getLatestPrice().then((response) => {
    document.getElementById('amount_of_dollars').innerHTML = (Number(response) / (10 ** 8)).toFixed(2);
});


async function buyTokens(amount){
    if (window.ethereum){
        var web3 = new Web3(window.ethereum);
        try {
            let accounts = await web3.eth.getAccounts();
            let account = accounts[0];
            let myContract = new web3.eth.Contract(abi, vaultAddress);
            let sendCall = await myContract.methods.buyTokens().send({from:account, value:amount});
            return sendCall;
        } catch(error) {
            alert(error);
        }
    } else{
        alert("Please, install your wallet!");
    }
}


document.getElementById('buy_btn').addEventListener('click', ()=>{
    alert('ok')
    let inputValue = Number(document.getElementById('stc_input').value) * (10 ** 18);
    getLatestPrice().then((response1) => {
        buyTokens(inputValue).then((response2)=>{
            console.log(response2);
        });
    });
});









