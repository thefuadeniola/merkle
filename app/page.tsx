import React, {useState} from 'react';
import Image from "next/image";
import { getWeb3 } from '@/Context/constants';
import { createToken } from '@/Context/constants';
import CreateTokenForm from './Components/CreateTokenForm';
import CreatedTokenList from './Components/CreatedTokenList';

export default async function Home()  {
  return (
    <div className="font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <CreatedTokenList />
        <div className="w-full flex items-center justify-center p-6">
          <CreateTokenForm />
        </div>
      </main>
    </div>


  );
}
