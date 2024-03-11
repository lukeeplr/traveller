'use client'

import React, { Suspense } from 'react'
import Container from '../shared/container'

import { categories } from '@/libs/constants'
import CategoryBox from '../shared/categorybox'
import { usePathname, useSearchParams } from 'next/navigation'

function Categories() {

  const pathname = usePathname()
  const params = useSearchParams()

  if (pathname !== '/' ) {
    return null
  }

  const category = params?.get('category')

  return (
    <Container>
        <div className='pt-4 flex items-center justify-between overflow-x-auto'>
            {categories.map((item) => (
                <Suspense fallback={<div>Categoria</div>}>
                <CategoryBox
                    key={item.label}
                    label={item.label}
                    selected={category === item.label}
                    icon={item.icon}
                />
                </Suspense>
            ))}
        </div>
    </Container>
  )
}

export default Categories