'use client'
import React, { PropsWithChildren, ReactNode } from 'react'
import clsx from 'clsx';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface dropDownProps extends PropsWithChildren {
    name: string | null
    activeDropDownHandler: (name: string) => void;
    activeDropDown: string
}

const DropDownMenu : React.FC<dropDownProps> = ({name,activeDropDown,activeDropDownHandler,children}) : React.ReactNode => {
  
    const dropDownHandler = () => {
      if(activeDropDown === name){
        activeDropDownHandler('');
      }else{
        activeDropDownHandler(name || '');
      }
    }

  return (
    <div className={clsx('pb-1', {'border-2 border-primary rounded':(name === activeDropDown)})}>
          <button 
              type='button' 
              className={clsx("flex p-2 justify-between rounded w-full text-base text-font-primary transition duration-75 group border-2 border-white hover:border-primary", {"rounded-none border-0 border-primary ": name === activeDropDown})}
              aria-controls="warung-saham-dropdown" 
              data-collapse-toggle="warung-saham-dropdown"
              onClick={dropDownHandler}
          >
              <div className='flex justify-center'>
                <span className='text-font-primary'>{name}</span>
              </div>
              {(name !== activeDropDown) ? <ChevronUp/> : <ChevronDown/>}
          </button>
        <ul id='warung-saham-dropdown' className={clsx('',{'hidden':(name !== activeDropDown)})}>
            {children}
        </ul>
    </div>
  )
}

export default DropDownMenu;
