import React from 'react'
import Image from 'next/image'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import '@rainbow-me/rainbowkit/styles.css'
import Link from 'next/link'

const Navbar = () => {
  return (
    <nav className='flex flex-row items-center  w-full py-4 px-[2.5%] justify-between'>
        <h2 className="logo">merkle.</h2>
        <div className="flex flex-row gap-8">
            <Link href='/' className=''>About</Link>
            <Link href='/' className=''>Fund</Link>
            <Link href='/' className=''>Start Project</Link>
            <Link href='/create-token' className=''>New Token</Link>

        </div>
        <ConnectButton chainStatus='none'/>
    </nav>
  )
}

export default Navbar