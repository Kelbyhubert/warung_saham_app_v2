'use client'
import { twMerge } from 'tailwind-merge'
import React, { forwardRef } from 'react'
import { FieldError } from 'react-hook-form'

interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement>{
    label?: string
    error? : FieldError
}

const TextField = forwardRef<HTMLInputElement,TextFieldProps>(({label = null , error ,...props},ref) => {
  return (
    <div className='w-full'>
        {label && <label htmlFor={props.name}><h1>{label}</h1></label>}
        <div>
          <input 
              ref={ref}
              {...props}
              className={
                twMerge(
                  'border border-primary-400 rounded-md p-2 w-full ',
                  props.className,
                )}
          />
          {(error) && <span className='text-error-500 text-xs'><p>{error.message || "-"}</p></span>}
        </div>
    </div>
  )
});

TextField.displayName = "TextField"

export default TextField
