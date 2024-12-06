import { X } from 'lucide-react';
import React from 'react'

interface DialogHeaderProps {
    children : React.ReactNode
    closeHandler: () => void;
}

const DialogHeader : React.FC<DialogHeaderProps> = ({children,closeHandler}) => {
  return (
    <div className='flex justify-between p-2'>
        {children}
        <button onClick={closeHandler} className="close-button"><X/></button>
    </div>
  )
}

export default DialogHeader
