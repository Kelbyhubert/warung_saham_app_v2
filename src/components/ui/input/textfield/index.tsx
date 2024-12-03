'use client'
import { twMerge } from 'tailwind-merge'
import React, { forwardRef } from 'react'

interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement>{
    label?: string
}

const TextField = forwardRef<HTMLInputElement,TextFieldProps>(({label = null,...props},ref) => {
  return (
    <>
        {label && <label htmlFor={props.name}><h1>{label}</h1></label>}
        <input 
            ref={ref}
            {...props}
            className={twMerge('border border-primary-400 rounded-md p-2 w-full ',props.className)}
        />
    </>
  )
});

TextField.displayName = "TextField"

export default TextField
