'use client'
import React from 'react'
import TextField from '../ui/input/textfield'
import DateInput from '../ui/input/date'
import { Button } from '../ui/button'

interface UserFormProps {
    id? : string
}

const UserForm : React.FC<UserFormProps> = ({id = null}) => {
  return (
    <>      
      {id && <p>Update User : {id}</p>}
      <TextField label='Username' key='username' type='text' className='w-1/2'/>
      <TextField label='Email' key='email' type='email' className='w-1/2'/>
      <TextField label='Name' key='name' type='text' className='w-1/2'/>
      <TextField label='Phone Number' key='phoneNumber' type='tel' className='w-1/2'/>
      <DateInput label='Date Of Birth' dateValue='20-11-2000' onChangeDateValue={() => {}}/>
      <TextField label='Role' key='Role' className='w-1/2'/>
      
      <div className='flex p-2 justify-end items-end gap-2'>
        <Button variant='outline' size='lg'>Back</Button>
        <Button size='lg'>Submit</Button>
      </div>
    </>
  )
}

export default UserForm
