'use client'

import axios from 'axios'
import { useCallback, useState } from 'react'
import { AiFillGithub } from 'react-icons/ai'
import { FcGoogle } from 'react-icons/fc'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'

import useRegisterModal from '@/hooks/useRegisterModal'
import Modal from './modal'
import Heading from '../shared/heading'
import Input from '../inputs/input'
import toast from 'react-hot-toast'
import Button from '../shared/button'
import { signIn } from 'next-auth/react'
import useLoginModal from '@/hooks/useLoginModal'


function RegisterModal() {
  
    const registerModal = useRegisterModal()
    const loginModal = useLoginModal()
    const [isLoading, setIsLoading] = useState(false)

    const toggle = useCallback(() => {
        registerModal.onClose()
        loginModal.onOpen()
    }, [loginModal, registerModal])

    const {
        register,
        handleSubmit, 
        formState: {
            errors,
        }
    } = useForm<FieldValues>({
        defaultValues: {
            name: '',
            email: '',
            password: ''
        }
    })

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true)

        axios.post('/api/register', data)
            .then(() => {
                registerModal.onClose()
                loginModal.onOpen()
            })
            .catch((error) => {
                toast.error('Algo deu errado!')
            })
            .finally(() => {
                setIsLoading(false)
            })
    }

    const bodyContent = (
        <div className='flex flex-col gap-4'>
            <Heading 
                title='Bem vindo ao Traveller'
                subtitle='Crie sua conta aqui!'
            />
            <Input 
                id='name'
                label='Nome'
                disabled={isLoading}
                register={register}
                errors={errors}
                required  
            />
            <Input 
                id='email'
                label='E-mail'
                disabled={isLoading}
                register={register}
                errors={errors}
                required  
            />
            <Input 
                id='password'
                label='Senha'
                disabled={isLoading}
                register={register}
                errors={errors}
                required
                type='password'
            />
        </div>
    )

    const footerContent = (
        <div className='flex flex-col gap-4 mt-3'>
            <hr />
            <Button
                outline
                label='Continue com Google'
                icon={FcGoogle}
                onClick={() => signIn('google')}
            />
            <Button
                outline
                label='ou com Github'
                icon={AiFillGithub}
                onClick={() => signIn('github')}
            />
            <div className='text-neutral-500 text-center mt-4 font-light'>
                <div className='flex items-center justify-center gap-2'>
                    <div>Já possui uma conta?</div>
                    <div className='text-neutral-800 font-semibold cursor-pointer hover:underline'
                        onClick={toggle}
                    >Faça login</div>
                </div>
            </div>
        </div>
    )
  
    return (
    <Modal
        disabled={isLoading}
        isOpen={registerModal.isOpen}
        title="Registre-se"
        actionLabel='Continue'
        onClose={registerModal.onClose}
        onSubmit={handleSubmit(onSubmit)}
        body={bodyContent}
        footer={footerContent}
    />
  )
}

export default RegisterModal