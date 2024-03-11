import getCurrentUser from '@/actions/getCurrentUser'
import getFavorites from '@/actions/getFavorites'
import EmptyState from '@/components/shared/emptystate'
import FavoritesClient from '@/components/shared/favoritesclient'
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

  const listings = await getFavorites()

  if (listings.length === 0) {
    return (
      <EmptyState
        title='Nenhum favorito'
        subtitle='Parece que você ainda não marcou nenhum espaço como favorito'
        showReset
        ResetLabel='Ver espaços'
      />
    )
  }

  return (
    <FavoritesClient 
      listings={listings}
      currentUser={currentUser}
    />
  )
}

export default Page