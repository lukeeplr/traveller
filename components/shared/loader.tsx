'use client'

import { PuffLoader } from "react-spinners"

import React from 'react'

function Loader() {
  return (
    <div className="h-[70vh] flex flex-col justify-center items-center">
        <PuffLoader color="purple" size={100} />
    </div>
  )
}

export default Loader