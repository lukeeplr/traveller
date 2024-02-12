'use client'

import React from 'react'
import { BiSearch } from 'react-icons/bi'

function Search() {
  return (
    <div className='border-[1px] w-full md:w-auto py-2 rounded-full shadow-sm hover:shadow-md transition cursor-pointer'>
        <div className='flex items-center justify-between'>
            <div className='text-sm font-semibold px-6'>
                Onde
            </div>
            <div className='hidden sm:block text-sm font-semibold px-6 border-x-[1px] flex-1 text-center'>
                Quando
            </div>
            <div className='text-sm pl-6 pr-2 text-gray-600 flex items-center gap-3'
            >
                <div className='hidden sm:block'>
                    Hóspedes
                </div>
                <div className='p-2 bg-purple-500 rounded-full text-white'>
                    <BiSearch size={18} />
                </div>
            </div>
        </div>
    </div>
  )
}

export default Search