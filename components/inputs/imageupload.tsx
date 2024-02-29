'use client'

import React, { useCallback } from 'react'
import { CldUploadWidget } from 'next-cloudinary'
import { TbPhotoPlus } from 'react-icons/tb'
import Image from 'next/image'

declare global {
    var cloudinary: any
}

const uploadPreset = 'y7fupf6j'

type ImageUploadProps = {
    onChange: (value: string) => void
    value: string
}

function ImageUpload({onChange, value}: ImageUploadProps) {

    const handleUpload = useCallback((result: any) => {
        onChange(result.info.secure_url)
    }, [])


  return (
    <div>
        <CldUploadWidget 
            onUpload={handleUpload}
            uploadPreset='y7fupf6j'
            options={{maxFiles: 1}}
        >
            {({open}) => {
                return (
                    <div
                        onClick={() => open?.()}
                        className='relative cursor-pointer hover:opacity-70 trasition border-dashed border-2 p-20 border-neutral-300 flex flex-col justify-center items-center gap-4 text-neutral-400'
                    >
                        <TbPhotoPlus size={50}/>
                        <div className='font-semibold text-lg'>Clique para enviar</div>
                        {value && (
                            <div className='absolute inset-0 w-full h-full'>
                                <Image
                                    alt='imagem enviada'
                                    fill
                                    className='object-cover' 
                                    src={value} 
                                />   
                            </div>
                        )}
                    </div>
                )
            }}
        </CldUploadWidget>
    </div>
  )
}

export default ImageUpload