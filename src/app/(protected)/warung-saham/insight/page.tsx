import { Button } from '@/components/common/button';
import InsightFilterDialog from '@/components/warung-saham/insight/components/InsightFilterDialog'
import InsightTable from '@/components/warung-saham/insight/components/InsightTable'
import { SearchParams } from '@/types/common';
import Link from 'next/link'

import React from 'react'

interface InsightPageProps{
  searchParams: SearchParams;
}

const InsightPage = async ({searchParams}: InsightPageProps) => {

  const queryParams = await searchParams;

  const currentPage = Number(queryParams.index) || 1;
  const limit = Number(queryParams.limit) || 5;
  const filterModal = Boolean(queryParams.filterModal) || false;

  return (
    <>
    <div className='p-2 m-2'>
      <div className='flex justify-between items-center w-full p-2'>
        <h2 className='text-3xl'>INSIGHT</h2>
        <div className='flex gap-2'>
            <Button size='lg' variant='outline' asChild>
              <Link
                href={{
                  query: {
                    ...queryParams,
                    filterModal: true
                  }
              }}>
                Filter
              </Link>
            </Button>
            <Button size='lg' asChild>
              <Link
                href={{
                  pathname: "insight/create"
                }}>
                  Create
              </Link>
            </Button>
        </div>

      </div>  
        <div className='pt-4'>
            <InsightTable 
              currentIndex={currentPage}
              currentLimit={limit}
              />
        </div>
    </div>
        {filterModal && <InsightFilterDialog/>}
    </>
  )
}


export default InsightPage
