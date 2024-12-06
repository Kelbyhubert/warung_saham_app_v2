import React from 'react'

interface DialogContentProps{
    children: React.ReactNode
}

const DialogContent : React.FC<DialogContentProps> = ({children}) => {
  return (
    <div className='p-2'>
      {children}
    </div>
  )
}

export default DialogContent
