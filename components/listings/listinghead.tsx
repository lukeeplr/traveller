'use client'

import useCountries from '@/hooks/useCountries'
import { User } from '@prisma/client'
import React from 'react'
import Heading from '../shared/heading'
import Image from 'next/image'
import HeartButton from '../shared/heartbutton'
import { SafeUser } from '@/types'

type ListingHeadProps = {
    title: string
    imageSrc: string
    locationValue: string
    id: string
    currentUser?: SafeUser | null
}

function ListingHead({title, imageSrc, locationValue, id, currentUser}: ListingHeadProps) {

    const { getByValue } = useCountries()
    const location = getByValue(locationValue)

  return (
    <div>
        <>
            <Heading 
                title={title}
                subtitle={`${location?.region}, ${location?.label}`}
            />
            <div className='w-full h-[60vh] overflow-hidden rounded-xl relative'>
                <Image 
                    alt={title}
                    src={imageSrc}
                    fill
                    className='object-cover w-full'
                />
                <div className='absolute top-5 right-5'>
                    <HeartButton currentUser={currentUser} listingId={id} />
                </div>
            </div>
        </>
    </div>
  )
}

export default ListingHead