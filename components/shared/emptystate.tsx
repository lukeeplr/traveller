'use client'

import { useRouter } from 'next/navigation'
import React from 'react'
import Heading from './heading'
import Button from './button'

type EmptyStateProps = {
    title?: string
    subtitle?: string
    showReset?: boolean
    ResetLabel?: string
}

function EmptyState({
    title='Parece que não tem nada por aqui', 
    subtitle='Tente mudar ou remover alguns filtros', 
    showReset,
    ResetLabel='Remover filtros'  
}: EmptyStateProps) {

    const router = useRouter()

  return (
    <div className='h-[60vh] flex flex-col gap-2 justify-center items-center'>
        <Heading center title={title} subtitle={subtitle} />
        <div className='w-48 mt-4'>
            {showReset && (
                <Button
                    outline
                    label={ResetLabel}
                    onClick={() => router.push('/')}
                />
            )}
        </div>
    </div>
  )
}

export default EmptyState