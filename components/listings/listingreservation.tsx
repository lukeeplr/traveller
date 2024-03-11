'use client'

import React from 'react'
import { Range } from 'react-date-range'
import Calendar from '../inputs/calendar'
import Button from '../shared/button'

type ListingReservationProps = {
    price: number
    totalPrice: number
    onChangeDate: (value: Range) => void
    dateRange: Range
    onSubmit: () => void
    disabled?: boolean
    disabledDates: Date[]

}

function ListingReservation({price, totalPrice, onChangeDate, dateRange, onSubmit, disabled, disabledDates}: ListingReservationProps) {
  return (
    <div className='bg-white rounded-xl border-[1px] border-neutral-200 overflow-hidden'>
        <div className='flex items-center gap-1 p-4'>
            <div className='text-2xl font-semibold'>
                $ {price}
            </div>
            <div className='font-light text-neutral-600'>
                por noite
            </div>
        </div>
        <hr />
        <Calendar 
            value={dateRange}
            disabledDates={disabledDates}
            onChange={(value) => onChangeDate(value.selection)}
        />
        <hr />
        <div className='p-4'>
            <Button disabled={disabled} label='Reservar' onClick={onSubmit} />
        </div>
        <div className='p-4 flex items-center justify-between font-semibold text-lg'>
            <div>Total:</div>
            <div>$ {totalPrice}</div>
        </div>
    </div>
  )
}

export default ListingReservation