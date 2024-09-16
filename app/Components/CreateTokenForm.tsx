'use client'
import { createToken, fetchCreatedTokens, addTokenToMetaMask } from '@/Context/constants';
import React, { useState, FormEvent } from 'react'
import { getWeb3 } from '@/Context/constants';

const CreateTokenForm = () => {
  const [name, setName] = useState('');
  const [symbol, setSymbol] = useState('');
  const [initialSupply, setInitialSupply] = useState(0)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
        const web3 = await getWeb3()
        const accounts: string[] = await web3?.eth.getAccounts() || []
        const address: string = accounts[0]
        if (address) {
            const data = await createToken({name, symbol, initialSupply, address })
            const deployedTokenAddress:string = data?.logs[0].address || ''
            await addTokenToMetaMask({address: deployedTokenAddress, tokenSymbol: symbol})
            console.log(data)
        } else console.log('No address detected')
    } catch (error) {
        console.log('Unable to create token')
    }
    
  }  

  return (
    <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
        <label htmlFor='name'>Name</label>
        <input value={name} name='name' onChange={(e) => setName(e.target.value)} />

        <label htmlFor='symbol'>Symbol</label>
        <input value={symbol} name='symbol' onChange={(e) => setSymbol(e.target.value)} />

        <label htmlFor='initialSupply'>Initial Supply</label>
        <input value={initialSupply} name='initialSupply' onChange={(e) => setInitialSupply(parseInt(e.target.value))} />
        <button type='submit' className='bg-black text-white rounded-sm w-[120px] h-[40px] flex items-center justify-center'>Create</button>
    </form> 
)
}

export default CreateTokenForm