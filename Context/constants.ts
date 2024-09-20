import TokenFactoryABI from './TokenFactory.json'
import LiquidityPoolABI from './LiquidityPool.json'
import MyTokenABI from './MyToken.json'
import IWETHABI from './WETH9.json'
import Web3 from 'web3'
import { string } from 'zod'

const TOKEN_FACTORY_ADDRESS = process.env.NEXT_PUBLIC_TOKEN_FACTORY_ADDRESS;
const LIQUIDITY_CREATION_ADDRESS = process.env.NEXT_PUBLIC_LIQUIDITY_POOL_ADDRESS;
const WETH_CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_WETH_ADDRESS

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

type CreateTokenType = {
    customToken: string,
    genericToken: string
    amount0: number
    amount1: number
    owner: string
}

export const getWeb3 = async () => {
    let web3;
    if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
        // We are in the browser and metamask is running.
        window.ethereum.request({ method: "eth_requestAccounts" });
        web3 = new Web3(window.ethereum);
        return web3;
    } else {
        const provider = new Web3.providers.HttpProvider(
            `https://eth-sepolia.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}`
        );
        web3 = new Web3(provider);
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
    } else {
        web3 = await getWeb3();
        const instance = new web3.eth.Contract(TokenFactoryABI.abi, TOKEN_FACTORY_ADDRESS)
        return instance
    }
}

export const liquidityTokenContract = async () => {
    let web3;
    if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
        // We are in the browser and metamask is running.
        window.ethereum.request({ method: "eth_requestAccounts" });
        web3 = new Web3(window.ethereum);
        const instance = new web3.eth.Contract(LiquidityPoolABI.abi, LIQUIDITY_CREATION_ADDRESS)
        return instance
    }

}

export const wrapEthContract = async () => {
    let web3;
    if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
        // We are in the browser and metamask is running.
        window.ethereum.request({ method: "eth_requestAccounts" });
        web3 = new Web3(window.ethereum);
        const instance = new web3.eth.Contract(IWETHABI.abi, WETH_CONTRACT_ADDRESS)
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

export const createTokenLiquidityPool = async(customToken, genericToken, amount0, amount1, owner) => {
    const web3 = await getWeb3()
    try {
        const contract = await liquidityTokenContract();
        const data = await contract?.methods.mintNewPosition(customToken, genericToken, amount0, web3.utils.toWei(amount1, 'ether'), owner).send({ from: owner })
        if(data) return data
    } catch (error) {
        console.log("Error minting new position:", error)
    }
}

export const wrapEth = async(amount: number, address: string) => {
    const web3 = await getWeb3()
    try {
        const contract = await wrapEthContract();
        const data = await contract?.methods.deposit().send({from: address, value: web3.utils.toWei(amount, 'ether')})
        if(data) return data
    } catch (error) {
        console.log("Error minting new position:", error)
    }
}