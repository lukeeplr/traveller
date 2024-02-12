'use client'

import React from 'react'
import { IconType } from 'react-icons'

type ButtonProps = {
    label: string
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void
    disabled?: boolean
    outline?: boolean
    small?: boolean
    icon?: IconType
}

function Button({label, onClick, disabled, outline, small, icon: Icon}: ButtonProps) {
  return (
    <button className={`relative disabled:opacity-70 disabled:cursor-not-allowed rounded-lg hover:opacity-90 transition w-full
    ${outline ? 'bg-white border-black text-black' : 'bg-purple-500 border-purple-500 text-white'}
    ${small ? 'py-1 text-sm font-light border-[1px]' : 'py-3 text-md font-semibold border-2'}`}
    onClick={onClick}
    disabled={disabled}
    >
        {Icon && (
            <Icon size={24} className='absolute left-4 top-3' />
        )}
        {label}
    </button>
  )
}

export default Button