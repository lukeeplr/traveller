import React, { Suspense } from 'react'
import Container from '../shared/container'
import Logo from './logo'
import Search from './search'
import UserMenu from './usermenu'
import { User } from '@prisma/client'
import Categories from './categories'
import { SafeUser } from '@/types'

type NavbarProps = {
  currentUser?: SafeUser | null
}

function Navbar({ currentUser }: NavbarProps) {

  return (
    <div className='fixed w-full bg-white z-10 shadow-sm'>
        <div className="py-4 border-b-[1px]">
        <Container>
            <div className="flex items-center justify-between gap-3 md:gap-0">
                <Logo />
                <Suspense fallback={<div>Buscar</div>}>
                <Search />
                </Suspense>
                <UserMenu currentUser={currentUser} />
            </div>
        </Container>
        </div>
        <Suspense fallback={<div>Categorias</div>}>
        <Categories />
        </Suspense>
    </div>
  )
}

export default Navbar