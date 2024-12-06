'use client'

import { ChevronLeft, ChevronRight } from 'lucide-react'
import React from 'react'

interface PaginationProps{
  currentPage: number
  currentLimit: string
  totalPage: number
  limits: number[]
  onChangePage: (pageIndex: number) => void
  onChangePageLimit: (limit: string) => void
}

const Pagination : React.FC<PaginationProps> = ({currentPage,currentLimit,totalPage,limits,onChangePage,onChangePageLimit}) => {

  const prevHandler = () => {
    onChangePage(currentPage - 1);
  }

  const nextHandler = () => {
    onChangePage(currentPage + 1);
  }

  const limitHandler = (value: string) => {
    onChangePageLimit(value);
  }

  return (
    <div className='flex border border-primary-400 bg-primary-400 p-2 justify-end w-full'>
      <button onClick={prevHandler} disabled={currentPage <=1} className='mx-2'>
        <ChevronLeft color='white'/>
      </button>
      <p className='mx-2 text-white'>{currentPage} - {totalPage}</p>
      <select className='mx-2 border rounded-md border-primary-400 bg-slate-200' name="limit" id="limit" value={currentLimit} onChange={e => limitHandler(e.target.value)}>
        {limits.map(limit => <option key={'limit-'+limit} value={limit}>{limit}</option>)}
      </select>
      <button className='mx-2' onClick={nextHandler} disabled={currentPage >= totalPage}>
        <ChevronRight color='white'/>
      </button>
    </div>
  )
}

export default Pagination
