import React from 'react'
import Container from '../shared/container'
import Logo from './logo'
import Search from './search'
import UserMenu from './usermenu'

function Navbar() {
  return (
    <div className='fixed w-full bg-white z-10 shadow-sm'>
        <div className="py-4 border-b-[1px]">
        <Container>
            <div className="flex items-center justify-between gap-3 md:gap-0">
                <Logo />
                <Search />
                <UserMenu />
            </div>
        </Container>
        </div>
    </div>
  )
}

export default Navbar