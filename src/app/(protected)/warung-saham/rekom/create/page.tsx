import RekomForm from '@/components/warung-saham/rekom/RekomForm'
import React from 'react'

const CreateInsightPage = () => {
  return (
    <div className='p-2 m-2'>
      <div className='w-full p-2'>
        <h2 className='text-3xl'>Create New Recommendation</h2>
      </div>
      <div className='p-4'>
        <RekomForm />
      </div>
    </div>
  )
}

export default CreateInsightPage
