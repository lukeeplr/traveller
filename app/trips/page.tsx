import React from 'react'
import EmptyState from '@/components/shared/emptystate'

import getCurrentUser from '@/actions/getCurrentUser'
import getReservations from '@/actions/getReservations'
import TripsClient from '@/components/shared/tripsclient'

const Page = async () => {

    const currentUser = await getCurrentUser()

    if (!currentUser) {
        return (
            <EmptyState 
                title='Sem autorização'
                subtitle='Por favor, faça login para ver suas viagens'
            />
        )
    }

    const reservations = await getReservations({ userId: currentUser.id })

    if (reservations.length === 0) {
        return (
            <EmptyState 
                title='Nenhuma viagem encontrada'
                subtitle='Parece que você ainda não reservou nenhum espaço'
            />
        )
    }

  return (
    <TripsClient 
        reservations={reservations}
        currentUser={currentUser}
    />
  )
}

export default Page