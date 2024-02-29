import React from 'react'
import useCountries from '@/hooks/useCountries'
import Select from 'react-select'

export type CountrySelectValue = {
  flag: string
  label: string
  latlng: number[]
  region: string
  value: string 
}

type CountrySelectProps = {
  value?: CountrySelectValue
  onChange: (value: CountrySelectValue) => void
}

function CountrySelect({value, onChange}: CountrySelectProps) {

  const { getAll } = useCountries()

  return (
    <div>
        <Select   
        placeholder='Selecione um país'
        isClearable
        options={getAll()} 
        value={value}
        onChange={value => onChange(value as CountrySelectValue)}
        formatOptionLabel={(option: any) => (
          <div className='flex flex-row items-center gap-3'>
            <div>{option.flag}</div>
            <div>{option.label}, 
            <span className='text-neutral-500 ml-1'>
            {option.region}
            </span>
            </div>
          </div>
        )}
        classNames={{
          control: () => 'p-3 border-2',
          input: () => 'text-lg',
          option: () => 'text-lg'
        }}
        theme={(theme) => ({
          ...theme,
          borderRadius: 6,
          colors: {
            ...theme.colors,
            primary: 'black',
            primary25: '#f2defa',
            primary50: '#f2defa',
            primary75: '#f2defa',
          }
        })}
        />
    </div>
  )
}

export default CountrySelect