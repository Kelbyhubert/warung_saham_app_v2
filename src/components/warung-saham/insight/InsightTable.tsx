'use client'

import Column from '@/components/ui/column'
import LinkButton from '@/components/ui/LinkButton'
import Pagination from '@/components/ui/pagination'
import Table from '@/components/table'
import { InsightTableData } from '@/types/Insight'
import { dateFormatV1 } from '@/utils/DateFormat'
import { Pencil, Trash2 } from 'lucide-react'
import { usePathname, useSearchParams,useRouter } from 'next/navigation'
import React, { useEffect } from 'react'


const actionTemplate = (data: InsightTableData, index: number | undefined) => (
    <div className='flex justify-center items-center'>
        <LinkButton name="Edit" url={`/warung-saham/insight/${data.id}/update`}>
            <Pencil className='hover:text-primary-400'/>
        </LinkButton>
        <LinkButton name="Delete" url={`/warung-saham/insight/${data.id}`}>
            <Trash2 className='hover:text-primary-400'/>
        </LinkButton>
    </div>
);  

interface InsightTableProps {
  currentIndex: number
  currentLimit: number
}

const InsightTable : React.FC<InsightTableProps> = ({currentIndex,currentLimit}) => {

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const title = searchParams.get('title') || '';
  const createBy = searchParams.get('createby') || '';
  const startDate = searchParams.get('startdate') || '';
  const endDate = searchParams.get('endDate') || '';

  const [insights, setInsights] = React.useState<InsightTableData[]>([]);
  const [totalPage, setTotalPage] = React.useState<number>(0);

  const onPageChange = (pageIndex: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('index',pageIndex.toString());
    router.replace(`${pathname}?${params.toString()}`)
  };

  const onLimitChange = (limit: string) => {
    const params = new URLSearchParams(searchParams);
    params.set('limit',limit);
    router.replace(`${pathname}?${params.toString()}`)
  };

  useEffect(() => {
    const fetchInsightData = async() => {
      try {
        const response = await fetch(`http://localhost:5173/api/insight?index=${currentIndex}&limit=${currentLimit}&title=${title}&createby=${createBy}&startdate=${startDate}&enddate=${endDate}`, {
          method: 'GET',
          credentials: 'include'
        });

        if(response.ok){
          const result = await response.json();
          setInsights(result.data.data.content);
          setTotalPage(result.data.data.totalPages);
        }else{ 
          setInsights([]);
          setTotalPage(0);
        }
    
      } catch (error: any) {
        setInsights([]);
        setTotalPage(0);
      }
    }
    fetchInsightData();

    if((currentIndex > totalPage) && totalPage !== 0){
      onPageChange(totalPage);
    }
  },[currentIndex, currentLimit,totalPage,title,createBy,startDate,endDate]);


  return (
    <div>
      <Table<InsightTableData> data={insights} totalData={1}>
          <Column body={(_,index = 1) => ((currentIndex - 1) * currentLimit) + index + 1} header="NO" />
          <Column field="title" header="Title"/>
          <Column field="createBy" header="Create By"/>
          <Column body={(data) => dateFormatV1(data.createDate)} header='Create At'/>
          <Column field="updateBy" header="Update By"/>
          <Column body={(data) => dateFormatV1(data.updateDate)} header='Update At'/>
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

export default InsightTable
