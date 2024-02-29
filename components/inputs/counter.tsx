import React, { useCallback } from 'react'
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai'

type CounterProps = {
    title: string
    subtitle: string
    value: number
    onChange: (value: number) => void 
}

function Counter({title, subtitle, value, onChange}: CounterProps) {
    
    const onAdd = useCallback(() => {
        onChange(value + 1)
    }, [onChange, value])

    const onReduce = useCallback(() => {
        
        if (value === 1) {
            return
        }

        onChange(value - 1)
    }, [onChange, value])
  
    return (
    <div
    className='flex items-center justify-between'>
        <div className="flex flex-col">
            <div className='font-medium'>{title}</div>
            <div className='font-light text-gray-600'>{subtitle}</div>
        </div>
        <div className='flex items-center gap-4'>
            <div className='size-10 rounded-full border-[1px] border-neutral-400 flex items-center justify-center text-neutral-600 cursor-pointer hover:opacity-80 hover:shadow-md transition'
            onClick={onReduce}>
                <AiOutlineMinus size={10}/>
            </div>
            <div className='font-light text-neutral-600 text-xl'>{value}</div>
            <div className='size-10 rounded-full border-[1px] border-neutral-400 flex items-center justify-center text-neutral-600 cursor-pointer hover:opacity-80 hover:shadow-md transition'
            onClick={onAdd}>
                <AiOutlinePlus size={10}/>
            </div>
        </div>
    </div>
  )
}

export default Counter