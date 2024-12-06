'use client'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import React, { type ElementRef, useEffect, useRef } from 'react'
import { Modal } from '../modal'

interface DialogProps {
    children: React.ReactNode
    onClose: () => void
}

export const Dialog : React.FC<DialogProps> = ({children,onClose}) => {
  const dialogRef = useRef<ElementRef<'dialog'>>(null);

  useEffect(() => {
    if (dialogRef.current && !dialogRef.current.open) {
      dialogRef.current.showModal();
    }
  }, []);


  return (
    <Modal>
        <dialog 
          ref={dialogRef} 
          className="flex flex-col justify-between border border-primary-400 min-w-96 min-h-64 rounded-md" 
          onClose={onClose}
        >
          {children}
        </dialog>
    </Modal>
  )
}