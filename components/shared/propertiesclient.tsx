'use client'

import { SafeListing, SafeUser } from '@/types'
import React, { useCallback, useState } from 'react'
import Container from './container'
import ListingCard from '../listings/listingcard'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import toast from 'react-hot-toast'
import Heading from './heading'

type PropertiesClientProps = {
    listings: SafeListing[]
    currentUser?: SafeUser | null
}

function PropertiesClient({
  listings,
  currentUser
}: PropertiesClientProps) {

    const router = useRouter()
    const [deletingId, setDeletingId] = useState('')

    const onCancel = useCallback((id: string) => {
        setDeletingId(id)

        axios.delete(`/api/listings/${id}`).then(() => {
            toast.success('Anúncio removido')
            router.refresh()
        })
        .catch((error) => {
            toast.error(error?.response?.data?.error)
        })
        .finally(() => {
            setDeletingId('')
        })
    }, [router])

  return (
    <Container>
        <Heading
            title='Propriedades'
            subtitle='Listagem de todos os seus espaços ativos para reserva'
        />
        <div className="pt-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
            {listings.map((listing) => (
                <ListingCard
                    key={listing.id}
                    data={listing}
                    currentUser={currentUser}
                    actionId={listing.id}
                    onAction={onCancel}
                    disabled={deletingId === listing.id}
                    actionLabel='Remover anúncio'
                /> 
            ))}
        </div>
    </Container>
  )
}

export default PropertiesClient