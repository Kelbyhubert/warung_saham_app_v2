'use client'
import { useUser } from '@/context/User.context'
import { CircleUserRound } from 'lucide-react'
import React from 'react'

const Profile = () => {

  const {user} = useUser();

  return (
    <div className='mb-2 flex items-center'>
        <div className=' p-2'>
            <CircleUserRound size={50} color='black'/>
        </div>
        <div className='w-full'>
            <h4>{user?.username}</h4>
            <small>Super Admin</small>
        </div>
    </div>
  )
}

export default Profile
