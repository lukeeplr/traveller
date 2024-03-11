'use client'

import { categories } from '@/libs/constants'
import { Listing, Reservation, User } from '@prisma/client'
import React, { useCallback, useEffect, useMemo } from 'react'
import Container from '../shared/container'
import ListingHead from './listinghead'
import ListingInfo from './listinginfo'
import useLoginModal from '@/hooks/useLoginModal'
import { useRouter } from 'next/navigation'
import { differenceInCalendarDays, eachDayOfInterval } from 'date-fns'
import axios from 'axios'
import toast from 'react-hot-toast'
import ListingReservation from './listingreservation'
import { Range } from 'react-date-range'
import { SafeListing, SafeReservation, SafeUser } from '@/types'

const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: 'selection'
}


type ListingClientProps = {
  reservations?: SafeReservation[]
    listing: SafeListing & {
      user: SafeUser
    }
    currentUser?: SafeUser | null
}

function ListingClient({listing, currentUser, reservations = []}: ListingClientProps) {

  const loginModal = useLoginModal()
  const router = useRouter()

  const disabledDates = useMemo(() => {
    let dates: Date[] = []

    reservations.forEach((reservation) => {
      const range = eachDayOfInterval({
        start: new Date(reservation.startDate),
        end: new Date(reservation.endDate)
      })

      dates = [...dates, ...range]

    })

    return dates
  }, [reservations])

  const [isLoading, setIsLoading] = React.useState(false)
  const [totalPrice, setTotalPrice] = React.useState(listing.price)
  const [dateRange, setDateRange] = React.useState<Range>(initialDateRange)

  const onCreateReservation = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen()
    }

    setIsLoading(true)

    axios.post('/api/reservations', {
      totalPrice,
      startDate: dateRange.startDate,
      endDate: dateRange.endDate,
      listingId: listing?.id
    })
    .then(() => {
      toast.success('Reserva feita com sucesso')
      setDateRange(initialDateRange)
      router.push('/trips')
      router.refresh()
    })
    .catch(() => {
      toast.error('Algo deu errado')
    })
    .finally(() => {
      setIsLoading(false)
    })

  }, [currentUser, dateRange, listing?.id, loginModal, router, totalPrice])


  useEffect(() => {
    if (dateRange.startDate && dateRange.endDate) {
      const dayCount = differenceInCalendarDays(
        dateRange.endDate, dateRange.startDate
      )

      if (dayCount && listing.price) {
        setTotalPrice(dayCount * listing.price)
      } else {
        setTotalPrice(listing.price)
      }
    }
  }, [listing.price, dateRange])
 

  const category = useMemo(() => {
    return categories.find((item) => item.label === listing.category)
  }, 
  [listing.category])

  return (
    <Container>
       <div className='max-w-screen-lg mx-auto'>
          <div className="flex flex-col gap-6">
            <ListingHead 
              title={listing.title}
              imageSrc={listing.imageSrc}
              locationValue={listing.locationValue}
              id={listing.id}
              currentUser={currentUser}
            />
            <div className='grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6'>
                <ListingInfo 
                  user={listing.user}
                  category={category}
                  description={listing.description}
                  roomCount={listing.roomCount}
                  guestCount={listing.guestCount}
                  bathroomCount={listing.bathroomCount}
                  locationValue={listing.locationValue}
                />
                <div className='order-first mb-9 md:order-last md:col-span-3'>
                    <ListingReservation 
                      price={listing.price}
                      totalPrice={totalPrice}
                      onChangeDate={(value) => setDateRange(value)}
                      dateRange={dateRange}
                      onSubmit={onCreateReservation}
                      disabled={isLoading}
                      disabledDates={disabledDates}
                    />
                </div>
            </div>
          </div>
       </div>
    </Container>
  )
}

export default ListingClient