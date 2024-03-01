'use client'

import { useRouter } from "next/navigation"

import React from 'react'

function Logo() {

  const router = useRouter()

  return (
    <div 
    className="hidden md:block cursor-pointer text-purple-500 font-bold text-2xl"
    onClick={() => router.push('/')}
    >
        traveller
    </div>
  )
}

export default Logo