import InsightForm from '@/components/warung-saham/insight/InsightForm'
import React from 'react'

type Params = Promise<{id : string}>

interface UpdateInsightPageProps {
    params : Params
}

const UpdateInsightPage : React.FC<UpdateInsightPageProps> = async ({params}) => {
  const {id} = await params;
  
  return (
    <div className='p-2 m-2'>
      <div className='w-full p-2'>
        <h2 className='text-3xl'>Update Insight</h2>
      </div>
      <div className='p-4'>
        <InsightForm id={id}/>
      </div>
    </div>
  )
}

export default UpdateInsightPage
