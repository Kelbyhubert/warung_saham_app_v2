'use client'
import { twMerge } from 'tailwind-merge'
import React, { forwardRef } from 'react'

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement>{
    label?: string
}

const TextArea = forwardRef<HTMLTextAreaElement,TextAreaProps>(({label = null,...props},ref) => {
  return (
    <>
        {label && <label htmlFor={props.name}><h1>{label}</h1></label>}
        <textarea
            ref={ref}
            {...props}
            className={twMerge('border border-primary-400 rounded-md p-2 w-full resize-none',props.className)}
        />
    </>
  )
});

TextArea.displayName = "TextArea"

export default TextArea