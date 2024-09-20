import React, {useState} from 'react';
import Image from "next/image";
import { getWeb3 } from '@/Context/constants';
import { createToken } from '@/Context/constants';
import CreatedTokenList from './Components/CreatedTokenList';

export default async function Home()  {
  return (
    <div className="font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <div className="w-full flex flex-col gap-8 items-center justify-center p-10 md:px-20">
          <p className='max-w-2xl font-semibold text-[30px] text-center'>
            View upcoming ERC20 projects and contribute <span className='text-green-700'>directly to the liquidity pool.</span>
          </p>

          <CreatedTokenList />
        </div>
      </main>
    </div>


  );
}
