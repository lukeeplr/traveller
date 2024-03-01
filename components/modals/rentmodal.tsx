'use client'
 
import React, { useMemo, useState } from 'react'
import Modal from './modal'
import useRentModal from '@/hooks/useRentModal'
import Heading from '../shared/heading'
import { categories } from '@/libs/constants'
import CategoryInput from '../inputs/categoryinput'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import CountrySelect from '../inputs/countryselect'
import dynamic from 'next/dynamic'
import Counter from '../inputs/counter'
import ImageUpload from '../inputs/imageupload'
import Input from '../inputs/input'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'


enum STEPS {
    CATEGORY = 0,
    LOCATION = 1,
    INFO = 2,
    IMAGES = 3,
    DESCRIPTION = 4,
    PRICE = 5
}

function RentModal() {

    const { register, handleSubmit, setValue, watch, formState: { errors }, reset } = useForm<FieldValues>({
        defaultValues: {
            category: '',
            location: null,
            guestCount: 1,
            roomCount: 1,
            bathroomCount: 1,
            imageSrc: '',
            price: 1,
            title: '',
            description: '' 
        }
    })

    const category = watch('category')
    const location = watch('location')
    const guestCount = watch('guestCount')
    const roomCount = watch('roomCount')
    const bathroomCount = watch('bathroomCount')
    const imageSrc = watch('imageSrc')

    const Map = useMemo(() => 
        dynamic(() => import('../shared/map'), {
            ssr: false
        }), [location])

    const setCustomValue = (id: string, value: any) => {
        setValue(id, value, {
            shouldValidate: true,
            shouldDirty: true,
            shouldTouch: true
        })
    }

    const rentModal = useRentModal()
    const router = useRouter()

    const [step, setStep] = useState(STEPS.CATEGORY)
    const [isLoading, setIsLoading] = useState(false)

    const onBack = () => {
        setStep((value) => value - 1)
    }

    const onNext = () => {
        setStep((value) => value + 1)
    }

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        if (step !== STEPS.PRICE) {
            return onNext()
        }

        setIsLoading(true)

        axios.post('/api/listings', data)
            .then(() => {
                toast.success('Anúncio criado!')
                router.refresh()
                reset()
                setStep(STEPS.CATEGORY)
                rentModal.onClose()
            })
            .catch(() => {
                toast.error('Algo de errado aconteceu.')
            })
            .finally(() => {
                setIsLoading(false)
            })
    }

    const actionLabel = useMemo(() => {
        if (step === STEPS.PRICE) {
            return 'Anunciar'
        }
        
        return 'Próximo'
    }, [step])


    const secondaryActionLabel = useMemo(() => {
        if (step === STEPS.CATEGORY) {
            return undefined
        }

        return 'Voltar'
    }, [step])

    let bodyContent = (
        <div className='flex flex-col gap-8'>
            <Heading
            title='Qual dessas categorias descreve melhor o seu espaço?'
            subtitle='Selecione uma categoria'
            />
            <div className='grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto'>
                {categories.map((item) => (
                    <div 
                    key={item.label}
                    className='col-span-1'
                    >
                        <CategoryInput 
                            onClick={(category) => setCustomValue('category', category)}
                            selected={category === item.label}
                            label={item.label}
                            icon={item.icon}
                        />
                    </div>
                ))}
            </div>
        </div>
    )

    if (step === STEPS.LOCATION) {
        bodyContent = (
            <div className='flex flex-col gap-8'>
                <Heading 
                    title='Onde fica seu espaço?'
                    subtitle='Ajude os hóspedes a te encontrar' 
                />
                <CountrySelect
                    onChange={(value) => setCustomValue('location', value)}
                    value={location}
                />
                <Map center={location?.latlng}/>
            </div>
        )
    }

    if (step === STEPS.INFO) {
        bodyContent = (
            <div className='flex flex-col gap-8'>
                <Heading
                    title='Conte um pouco sobre o seu espaço'
                    subtitle='Quais as características dele?' 
                />
                <Counter 
                    title='Hóspedes' 
                    subtitle='Quantos hóspedes o seu espaço suporta?'
                    value={guestCount}
                    onChange={(value) => setCustomValue('guestCount', value)}
                />
                <hr />
                <Counter 
                    title='Quartos' 
                    subtitle='Quantos quartos tem o seu espaço?'
                    value={roomCount}
                    onChange={(value) => setCustomValue('roomCount', value)}
                />
                <hr />
                <Counter 
                    title='Banheiros' 
                    subtitle='Quantos banheiros seu espaço tem?'
                    value={bathroomCount}
                    onChange={(value) => setCustomValue('bathroomCount', value)}
                />
            </div>
        )
    }

    if (step === STEPS.IMAGES) {
        bodyContent = (
           <div className='flex flex-col gap-8'>
                <Heading 
                    title='Adicione uma foto do seu espaço'
                    subtitle='Mostre aos hóspedes como é o ambiente'
                />
                <ImageUpload
                    value={imageSrc}
                    onChange={(value) => setCustomValue('imageSrc', value)}
                />
           </div> 
        )
    }

    if (step === STEPS.DESCRIPTION) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading 
                    title='Como você descreveria seu espaço?'
                    subtitle='Adicione algumas informações ao seu anúncio'
                />
                <Input 
                    id='title'
                    label='Título'
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                />
                <hr />
                <Input
                    id='description'
                    label='Descrição'
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                />
            </div>
        )
    }

    if (step === STEPS.PRICE) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title='Por fim, informe o valor'
                    subtitle='Quanto você cobra por noite no seu espaço?'
                />
                <Input
                    id='price'
                    label='Preço'
                    formatPrice
                    type='number'
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required 
                />
            </div>
        )
    }

  return (
    <Modal
        isOpen={rentModal.isOpen}
        onClose={rentModal.onClose}
        onSubmit={handleSubmit(onSubmit)}
        title='Anuncie seu espaço'
        actionLabel={actionLabel}
        secondaryActionLabel={secondaryActionLabel}
        secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
        body={bodyContent}
        >

    </Modal>
  )
}

export default RentModal