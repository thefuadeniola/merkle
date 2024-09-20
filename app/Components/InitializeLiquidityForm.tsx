'use client'

import { useState, useEffect } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import Image from 'next/image'
import { createTokenLiquidityPool } from '@/Context/constants'
import { useAccount } from 'wagmi'
import { wrapEth } from '@/Context/constants'

type prop = {
    address: string | null
}

export default function InitializeLiquidityForm({address}: prop) {
  const [initialPrice, setInitialPrice] = useState('')
  const [ethAmount, setEthAmount] = useState('')
  const [tokenAmount, setTokenAmount] = useState('')

  const {address: userAddress} = useAccount()
  const genericToken = process.env.NEXT_PUBLIC_WETH_ADDRESS;

  const handleSubmit = async () => {
    if(address && genericToken) {
      try {
        const data = await createTokenLiquidityPool(address, genericToken, tokenAmount, ethAmount, userAddress);
        console.log(data)
      } catch (error) {
        console.log(error)
      }
    }
  }

  const calculateInitialPrice = (tokenValue: string, ethValue: string) => {
    if (!ethValue || !tokenValue) return ''
    const tokenAmount = parseFloat(tokenValue)
    const ethAmount = parseFloat(ethValue)
    const ethToUSD = ethAmount * 2400
    return (ethToUSD/tokenAmount).toFixed(10)
  }


  useEffect(() => {
    setInitialPrice(calculateInitialPrice(tokenAmount, ethAmount))
  }, [tokenAmount, ethAmount])
 
  return (
    <div className="max-w-md mt-[-14px] mx-auto p-6 bg-white rounded-lg">
      <div className="space-y-4">
        <div>
          <Label htmlFor="initial-price">Initial Token Price (USD)</Label>
          <Input
            id="initial-price"
            type="number"
            placeholder="Enter initial price in USD"
            value={initialPrice}
            //onChange={(e) => setInitialPrice(e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="token-amount">Custom Token Amount</Label>
          <Input
            id="token-amount"
            type="number"
            placeholder="Enter token amount"
            value={tokenAmount}
            onChange={(e) => setTokenAmount(e.target.value)}
          />
        </div>
        <div className="text-sm text-gray-600">
          <p>{address}</p>
        </div>
        <div>
          <Label htmlFor="eth-amount">ETH Amount</Label>
          <div className="relative">
            <Input
              id="eth-amount"
              type="number"
              placeholder="Enter ETH amount"
              value={ethAmount}
              className="pl-10"
              onChange={(e) => setEthAmount(e.target.value)}
            />
            <Image alt='Eth' src='/images/ethereum.png' className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" height={20} width={20} />
          </div>
        </div>

        <Button className='bg-green-700 w-full' onClick={handleSubmit}>Create Pool</Button>
      </div>
    </div>
  )
}