import React from 'react'
import CreateForm from '../Components/CreateForm'

const page = () => {
  return (
    <div className='flex h-full items-center justify-center flex-col pt-10'>
        <p className='max-w-xl font-semibold text-[30px] text-center'>
            Deploy your token to the blockchain and add to your metamask <span className='text-green-700'>instantly.</span>
        </p>
        <div className='mt-8 max-w-xl'>
            <CreateForm />
        </div>
    </div>
  )
}

export default page