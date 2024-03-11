import React from 'react'
import getCurrentUser from '@/actions/getCurrentUser'
import getReservations from '@/actions/getReservations'
import EmptyState from '@/components/shared/emptystate'
import ReservationsClient from '@/components/shared/reservationsclient'


const Page = async () => {

    const currentUser = await getCurrentUser()

    if (!currentUser) {
        return (
            <EmptyState 
                title='Sem autorização'
                subtitle='Por favor, faça login para ver suas reservas'
            />
        )
    }

    const reservations = await getReservations({ authorId: currentUser.id })

    if (reservations.length === 0) {
        return (
            <EmptyState 
                title='Nenhuma reserva encontrada'
                subtitle='Parece que você ainda não reservou nenhum espaço'
            />
        )
    }

  return (
    <ReservationsClient 
        reservations={reservations}
        currentUser={currentUser}
    />
  )
}

export default Page