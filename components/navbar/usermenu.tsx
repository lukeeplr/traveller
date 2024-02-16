'use client'

import React, { useCallback, useState } from 'react'
import { AiOutlineMenu } from 'react-icons/ai'
import Avatar from '../shared/avatar'
import MenuItem from './menuitem'
import useRegisterModal from '@/hooks/useRegisterModal'
import useLoginModal from '@/hooks/useLoginModal'
import { User } from '@prisma/client'
import { signOut } from 'next-auth/react'
import useRentModal from '@/hooks/useRentModal'

type UserMenuProps = {
    currentUser?: User | null
}

function UserMenu({ currentUser }: UserMenuProps) {

    const registerModal = useRegisterModal()
    const loginModal = useLoginModal()
    const rentModal = useRentModal()
    const [isOpen, setIsOpen] = useState(false)
    const toggleOpen = useCallback(() => {
        setIsOpen((value) => !value)
    }, [])

    const onRent = useCallback(() => {

        if (!currentUser) {
            return loginModal.onOpen()
        }

        rentModal.onOpen()

    }, [currentUser, loginModal, rentModal])


  return (
    <div className='relative'>
        <div className='flex items-center gap-3'>
            <div
            onClick={onRent}
            className='hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer'
            >
                Anunciar meu espaço
            </div>
            <div
            onClick={toggleOpen}
            className='p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition'
            >
                <AiOutlineMenu />
                <div className='hidden sm:block'>
                    <Avatar src={currentUser?.image}/>
                </div>
            </div>
        </div>
        {isOpen && (
            <div className='absolute rounded-xl shadow-md w-[40vh] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm'>
                {currentUser ? (
                    <>
                    <MenuItem 
                        onClick={() => {}}
                        label='Minhas viagens'
                    />
                    <MenuItem 
                        onClick={() => {}}
                        label='Meus favoritos'
                    />
                    <MenuItem 
                        onClick={() => {}}
                        label='Minhas reservas'
                    />
                    <MenuItem 
                        onClick={() => {}}
                        label='Minhas propriedades'
                    />
                    <MenuItem 
                        onClick={rentModal.onOpen}
                        label='Anunciar meu espaço'
                    />
                    <hr />
                    <MenuItem
                     onClick={signOut}
                     label='Sair'
                     />
                    </> 
                 ) : (
                    <>
                <MenuItem
                 onClick={loginModal.onOpen}
                 label='Entrar'
                 />
                 <MenuItem
                 onClick={registerModal.onOpen}
                 label='Registre-se'
                 />
                 
                </>
                 )}
            </div>
        )}
    </div>
  )
}

export default UserMenu