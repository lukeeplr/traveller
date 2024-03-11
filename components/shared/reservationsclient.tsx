'use client'

import { SafeReservation, SafeUser } from '@/types'
import React, { useCallback, useState } from 'react'
import Container from './container'
import Heading from './heading'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import toast from 'react-hot-toast'
import ListingCard from '../listings/listingcard'

type ReservationsClientProps = {
    reservations: SafeReservation[]
    currentUser: SafeUser | null
}

function ReservationsClient({reservations, currentUser}: ReservationsClientProps) {

    const router = useRouter()
    const [deletingId, setDeletingId] = useState('')

    const onCancel = useCallback((id: string) => {
        setDeletingId(id)
       
        axios.delete(`/api/reservations/${id}`)
        .then(() => {
            toast.success('Reserva cancelada')
            router.refresh()
        })
        .catch(() => {
            toast.error('Algo deu errado...')
        })
        .finally(() => {
            setDeletingId('')
        })
    }, [router])

  return (
    <Container>
        <Heading
            title='Reservas'
            subtitle='Reservas feitas nos seus espaços'
        />
        <div className='mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8'>
            {reservations.map((reservation) => (
                <ListingCard 
                    key={reservation.id} 
                    data={reservation.listing}
                    reservation={reservation}
                    actionId={reservation.id}
                    onAction={onCancel}
                    disabled={deletingId === reservation.id}
                    actionLabel='Cancelar reserva de hóspede'
                    currentUser={currentUser}
                />
            ))}
        </div>
    </Container>
  )
}

export default ReservationsClient