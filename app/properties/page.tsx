import getCurrentUser from '@/actions/getCurrentUser'
import getListings from '@/actions/getListings'
import EmptyState from '@/components/shared/emptystate'
import PropertiesClient from '@/components/shared/propertiesclient'
import React from 'react'

async function Page() {

  const currentUser = await getCurrentUser()

  if (!currentUser) {
    return (
      <EmptyState 
      title='Sem autorização'
      subtitle='Por favor, faça login para ver seus espaços favoritos'
      />
    )
  }

  const listings = await getListings({ userId: currentUser.id })

  if (listings.length === 0) {
    return (
      <EmptyState
        title='Nenhum espaço encontrado'
        subtitle='Parece que você ainda não anunciou nenhum espaco'
      />
    )
  }

  return (
    <PropertiesClient 
      currentUser={currentUser}
      listings={listings}
    />
  )
}

export default Page