'use client'

import clsx from 'clsx';
import Link from 'next/link'
import React from 'react'

interface LinkButtonProps extends React.PropsWithChildren {
  url : string | null;
  name: string | null;
  className?: string | object
}

const LinkButton : React.FC<LinkButtonProps> = ({url,name,className,children}) : React.ReactNode => {

  return (
    <Link href={url === null ? "#": url}>
        <button 
            type='button' 
            className={clsx('px-2 py-3 flex items-center w-full m-0 text-base text-font-primary transition duration-75 group',{className})}
        >
            {children}
        </button>
    </Link>
  )
}

export default LinkButton;
