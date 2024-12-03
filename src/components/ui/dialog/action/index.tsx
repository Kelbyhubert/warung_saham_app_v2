import React from 'react'

interface DialogActionProps {
    children : React.ReactNode
}

const DialogAction : React.FC<DialogActionProps> = ({children}) => {
  return (
    <div className='flex p-2 w-full'>
        {children}
    </div>
  )
}

export default DialogAction
