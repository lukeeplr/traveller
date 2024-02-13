'use client'

import axios from 'axios'
import { useCallback, useState } from 'react'
import { AiFillGithub } from 'react-icons/ai'
import { FcGoogle } from 'react-icons/fc'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'

import useRegisterModal from '@/hooks/useRegisterModel'
import Modal from './modal'
import Heading from '../shared/heading'
import Input from '../inputs/input'
import toast from 'react-hot-toast'
import Button from '../shared/button'


function RegisterModal() {
  
    const registerModal = useRegisterModal()
    const [isLoading, setIsLoading] = useState(false)

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
                onClick={() => {}}
            />
            <Button
                outline
                label='ou com Github'
                icon={AiFillGithub}
                onClick={() => {}}
            />
            <div className='text-neutral-500 text-center mt-4 font-light'>
                <div className='flex items-center justify-center gap-2'>
                    <div>Já possui uma conta?</div>
                    <div className='text-neutral-800 font-semibold cursor-pointer hover:underline'
                        onClick={registerModal.onClose}
                    >Faça login</div>
                </div>
            </div>
        </div>
    )
  
    return (
    <Modal
        disabled={isLoading}
        isOpen={registerModal.isOpen}
        title="Crie sua conta"
        actionLabel='Continue'
        onClose={registerModal.onClose}
        onSubmit={handleSubmit(onSubmit)}
        body={bodyContent}
        footer={footerContent}
    />
  )
}

export default RegisterModal