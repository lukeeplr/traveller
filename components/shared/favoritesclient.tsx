import React from 'react'
import Container from './container'
import { SafeListing, SafeUser } from '@/types'
import Heading from './heading'
import ListingCard from '../listings/listingcard'

type FavoritesClientProps = {
    listings: SafeListing[]
    currentUser?: SafeUser | null
}

function FavoritesClient({
  listings,
  currentUser
}: FavoritesClientProps) {
  return (
    <Container>
        <Heading 
            title='Favoritos'
            subtitle='Lista de lugares que ganharam seu coração'	
        />
        <div className='mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8'>
            {listings.map((listing) => (
                <ListingCard     
                    key={listing.id}
                    data={listing}
                    currentUser={currentUser}                    
                />
            ))}
        </div>
    </Container>
  )
}

export default FavoritesClient