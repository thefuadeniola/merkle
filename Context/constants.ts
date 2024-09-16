import TokenFactoryABI from './TokenFactory.json'
import MyTokenABI from './MyToken.json'
import Web3 from 'web3'

const TOKEN_FACTORY_ADDRESS = process.env.NEXT_PUBLIC_TOKEN_FACTORY_ADDRESS;

type TokenParams = {
    name: string
    symbol: string
    initialSupply: number | string
    address: string
}

type TokenAdded = {
    address: string
    tokenSymbol: string
}

export const getWeb3 = async () => {
    let web3;
    if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
        // We are in the browser and metamask is running.
        window.ethereum.request({ method: "eth_requestAccounts" });
        web3 = new Web3(window.ethereum);
        return web3;
    }

}

export const createTokenContract = async () => {
    let web3;
    if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
        // We are in the browser and metamask is running.
        window.ethereum.request({ method: "eth_requestAccounts" });
        web3 = new Web3(window.ethereum);
        const instance = new web3.eth.Contract(TokenFactoryABI.abi, TOKEN_FACTORY_ADDRESS)
        return instance
    }
}

export const createToken = async({ name, symbol, initialSupply, address } : TokenParams) => {
    try {
        const contract = await createTokenContract();
        const newToken = await contract?.methods.createToken(name, symbol, parseInt(initialSupply), address).send({ from: address })
        return newToken
    } catch (error) {
        console.log('Unable to create token:', error)
    }
}

export const fetchCreatedTokens = async() => {
    try {
        const contract = await createTokenContract();
        const createdTokens = await contract?.methods.getTokens().call()
        return createdTokens;
    } catch (error) {
        console.log('Error fetching tokens:', error)
    }
}

 export const addTokenToMetaMask = async({address, tokenSymbol}: TokenAdded) => {
    if(window.ethereum){
        try {
            const wasAdded = await window.ethereum.request({
                method: "wallet_watchAsset",
                params: {
                    type: "ERC20",
                    options: {
                        address: address,
                        symbol: tokenSymbol,
                        decimals: 18,
                    }
                }
            })

            if(wasAdded) {
                console.log("Token added");
            } else {
                console.log("Failed to add token")
            }
        } catch (error) {
            console.log("Failed to add token")
        }
    } else {
        console.log("Metamask is not installed")
    }
}

// 0x0228B80ca54C8053f6BB85cF6E618e6c69804dee
// Refactor code
// Automatically add to metamask
// Image?