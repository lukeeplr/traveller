import getCurrentUser from '@/actions/getCurrentUser'
import getListingById from '@/actions/getListingById'
import getReservations from '@/actions/getReservations'
import ListingClient from '@/components/listings/listingclient'
import Container from '@/components/shared/container'
import EmptyState from '@/components/shared/emptystate'
import React from 'react'

async function Page({ params }: { params: {listingId: string }}) {

    const listing = await getListingById(params)
    const currentUser = await getCurrentUser()
    const reservations = await getReservations(params)

    if (!listing) {
        return (
          <Container>
            <EmptyState 
                showReset 
                title='Espaço não encontrado' 
                subtitle='Algo deu errado e este espaço não está mais disponível'
                ResetLabel='Voltar para o início'
                />
          </Container>
        )
    }

  return (
    <Container>
        <ListingClient 
            listing={listing}
            reservations={reservations}
            currentUser={currentUser}
        />
    </Container>
  )
}

export default Page