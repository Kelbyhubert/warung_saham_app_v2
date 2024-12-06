'use client'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import React, { type ElementRef, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'

interface ModalProps {
    children: React.ReactNode
}

export const Modal = ({children} : ModalProps) => {
  // butuh state mount untuk tunggu render dari server (html) sudah ada di browser
  // set ke false untuk tidak render modal nya kalau html masih belum tersedia browser
  const [isMounted, setIsMounted] = React.useState(false);

  // untuk tunggu html sudah di browser (karena useEffect hanya bisa jalan browser)
  useEffect(() => {
    // untuk kasih sinyal kalau html sudah bisa pakai dom (karena sudah di browser)
    setIsMounted(true);

    // proses cleaning , untuk pastiin untuk tidak render kalau component sudah tidak dipakai/ ganti halaman
    // simple nya reset state nya
    return () => setIsMounted(false)
  }, []);


  const modalContent = (
    <div className='backdrop-brightness-50 fixed w-full h-full top-0 z-50 flex items-center justify-center'>
      {children}
    </div>
  )

  return isMounted ? createPortal(
    modalContent,
    document.getElementById('modal-root') as HTMLElement
  ): null
}


