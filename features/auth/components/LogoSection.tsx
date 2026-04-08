"use client"
import React from 'react'
import Image from 'next/image'

function LogoSection() {
  return (
    <div className='flex items-center justify-center gap-3 text-white font-poppins py-6 md:py-0 bg-PrimaryBg md:bg-transparen w-full'>
        <Image src="/auth/authLogo.svg" alt="logo" width={64} height={64} className='object-cover'/>
        <div className="flex flex-col">
            <h2 className="text-[32px] font-bold">NexLearn</h2>
            <h3 className="text-[13px] -mt-[6px] font-medium">futuristic learning</h3>
          </div>
    </div>
  )
}

export default LogoSection