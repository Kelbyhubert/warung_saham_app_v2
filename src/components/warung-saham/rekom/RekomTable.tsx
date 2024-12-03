'use client'

import Column from '@/components/ui/column';
import LinkButton from '@/components/ui/LinkButton';
import Pagination from '@/components/ui/pagination';
import Table from '@/components/table';
import { RekomTableData } from '@/types/Rekom';
import { dateFormatV1 } from '@/utils/DateFormat';
import { Edit2, Trash2 } from 'lucide-react';
import React from 'react'
import useFetchRekoms from './RekomTable.hook';

interface RekomTableProps{
  currentIndex : number
  currentLimit: number
}

const RekomTable : React.FC<RekomTableProps> = ({currentIndex,currentLimit}) => {

  const {rekoms,totalPage,onLimitChange,onPageChange} = useFetchRekoms({currentIndex})

  const actionTemplate = (data: RekomTableData, index: number | undefined) => (
      <div className='flex justify-center items-center'>
          <LinkButton name="Delete" url={`/warung-saham/rekom/${data.id}/edit`}>
              <Edit2 className='hover:text-primary-400'/>
          </LinkButton>
          <LinkButton name="Delete" url={`/warung-saham/rekom/${data.id}`}>
              <Trash2 className='hover:text-primary-400'/>
          </LinkButton>
      </div>
  ); 

  return (
    <div>
      <Table<RekomTableData> data={rekoms} totalData={1}>
          <Column body={(_,index = 1) => ((currentIndex - 1) * currentLimit) + index + 1} header="NO" />
          <Column field="stockCode" header="Code"/>
          <Column body={(data) => dateFormatV1(data.rekomDate)} header='Rekom Date'/>
          <Column body={(data) => <p>{data.entryFrom} - {data.entryTo} </p>} header='Entry'/>
          <Column field="target" header="Target"/>
          <Column field="stopLoss" header="SL"/>
          <Column field="rekomRype" header="Type"/>
          <Column field="createBy" header="Create By"/>
          <Column body={(data,index) => actionTemplate(data,index)} header='Action'/>
      </Table>
      <Pagination 
        currentPage={currentIndex} 
        currentLimit={currentLimit.toString()}
        limits={[5,10,25]} 
        totalPage={totalPage} 
        onChangePage={onPageChange}
        onChangePageLimit={onLimitChange}
      />
    </div>
  )
}

export default RekomTable
