'use client'

import { useCallback, useState } from 'react'
import { AiFillGithub } from 'react-icons/ai'
import { FcGoogle } from 'react-icons/fc'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'

import useLoginModal from '@/hooks/useLoginModal'
import Modal from './modal'
import Heading from '../shared/heading'
import Input from '../inputs/input'
import toast from 'react-hot-toast'
import Button from '../shared/button'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'


function LoginModal() {
  

    const router = useRouter()
    const loginModal = useLoginModal()
    const [isLoading, setIsLoading] = useState(false)

    const {
        register,
        handleSubmit, 
        formState: {
            errors,
        }
    } = useForm<FieldValues>({
        defaultValues: {
            email: '',
            password: ''
        }
    })

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true)

        signIn('credentials', {
            ...data,
            redirect: false
        })
        .then((callback) => {
            setIsLoading(false)

            if (callback?.ok) {
                toast.success('Sucesso!')
                router.refresh()
                loginModal.onClose()
            }

            if (callback?.error) {
                toast.error(callback.error)
            }
        })
    }

    const bodyContent = (
        <div className='flex flex-col gap-4'>
            <Heading 
                title='Bom te ver por aqui!'
                subtitle='Entre na sua conta'
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
                    <div>Ainda não tem uma conta?</div>
                    <div className='text-neutral-800 font-semibold cursor-pointer hover:underline'
                        onClick={loginModal.onClose}
                    >Cadastre-se</div>
                </div>
            </div>
        </div>
    )
  
    return (
    <Modal
        disabled={isLoading}
        isOpen={loginModal.isOpen}
        title="Entre"
        actionLabel='Entrar'
        onClose={loginModal.onClose}
        onSubmit={handleSubmit(onSubmit)}
        body={bodyContent}
        footer={footerContent}
    />
  )
}

export default LoginModal