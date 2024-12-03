import LoginForm from '@/components/auth/loginform'
import React from 'react'

const Login = () => {
  return (
    <div className='flex h-screen'>
      <div className='w-2/3 bg-primary-400'>
      </div>
      <div className='flex w-1/3 justify-center items-center'>
        <LoginForm />
      </div>
    </div>
  )
}

export default Login
