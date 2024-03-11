'use client'

import useCountries from '@/hooks/useCountries'
import { User } from '@prisma/client'
import React from 'react'
import { IconType } from 'react-icons'
import Avatar from '../shared/avatar'
import ListingCategory from './listingcategory'
import dynamic from 'next/dynamic'
import { SafeUser } from '@/types'

type ListingInfoProps = {
    user: SafeUser
    category: {
        label: string
        icon: IconType
        description: string
    } | undefined
    description: string
    roomCount: number
    guestCount: number
    bathroomCount: number
    locationValue: string
}

const Map = dynamic(() => import('../shared/map'), {
    ssr: false
})

function ListingInfo({user, description, roomCount, guestCount, bathroomCount, locationValue, category}: ListingInfoProps) {

    const { getByValue } = useCountries()
    const coordinates = getByValue(locationValue)?.latlng

  return (
    <div className='col-span-4 flex flex-col gap-8'>
        <div className='flex flex-col gap-2'>
            <div className='text-xl font-semibold flex items-center gap-2'>
                <div>Anunciado por <span className=' font-bold'>{user?.name}</span></div>
                <Avatar src={user?.image} />
            </div>
            <div>
                <span className='flex items-center gap-4 font-light text-neutral-500'>
                    <div>{guestCount} hóspedes</div>
                    <div>{roomCount} quartos</div>
                    <div>{bathroomCount} banheiros</div>
                </span>
            </div>
        </div>
        <hr />
        {category && (
            <ListingCategory
                icon={category.icon}
                label={category.label}
                description={category.description}
            />
        )}
        <hr />
        <div className='text-lg font-light text-neutral-500'>
            {description}
        </div>
        <hr />
        <Map center={coordinates} />
    </div>
  )
}

export default ListingInfo