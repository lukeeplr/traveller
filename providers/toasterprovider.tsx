'use client'

import { Toaster } from 'react-hot-toast'

import React from 'react'

function ToasterProvider() {
  return (
    <Toaster 
      position='bottom-right'
    />
  )
}

export default ToasterProvider