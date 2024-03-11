'use client'

import EmptyState from "@/components/shared/emptystate"
import { useEffect } from "react"

type ErrorStateProps = {
    error: Error
}

function ErrorState({error}: ErrorStateProps) {

    useEffect(() => {
        console.error(error)
    }, [error])

  return (
    <EmptyState 
        title="Oops"
        subtitle="Algo deu errado"
        showReset
    />
  )
}

export default ErrorState