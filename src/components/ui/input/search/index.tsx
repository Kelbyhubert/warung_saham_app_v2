'use client'
import React from 'react'
import { Search as SearchIcon } from 'lucide-react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

interface SearchProps {
  queryKey: string
}

const Search = ({queryKey}: SearchProps) => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    //pake debounce
    const handleSearch = (value: string) : void => {
        const params = new URLSearchParams(searchParams);
        if(value){
          params.set(queryKey,value);
        }else{
          params.delete(queryKey)
        }
        router.replace(`${pathname}?${params.toString()}`);
    }
    
  return (
    <div className="group relative">
    <div className='p-2 absolute inset-y-0 start-0 flex items-center group-focus-within:text-primary-600'>
      <SearchIcon size={16}/>
    </div>
    <input className='p-2 ps-10 h-full border border-font-primary rounded-md focus:outline-none focus:border-2 focus:border-primary-600' type="text" placeholder='Search...' onChange={(e) => handleSearch(e.target.value)} value={searchParams.get(queryKey) || ''}/>
  </div>
  )
}

export default Search
