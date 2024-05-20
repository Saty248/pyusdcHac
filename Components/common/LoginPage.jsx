import Signup from '@/pages/auth/join'
import React from 'react'

export default function LoginPage() {
  return (
    <div className='fixed  w-screen h-full z-40 flex items-center justify-center z-50'>
      <div className='w-[25%] h-[85%]  flex justify-center items-center rounded-xl overflow-clip bg-white'>
        <Signup/>
      </div>
    </div>
  )
}
