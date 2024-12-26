import React from 'react'

function Personal({user}) {
  return (
    <div className='flex flex-col gap-4'>
        <h1 className='text-2xl font-semibold'>Personal Information</h1>
        <div className='w-full border-b-2 border-gray-500'></div>
        <div className='flex justify-left gap-36 w-full'>
            <div className='flex flex-col gap-4'>
                <h1 className='font-medium'>First Name: <span className='font-normal ml-4'>{user.firstname}</span></h1>
                <h1 className='font-medium'>Email: <span className='font-normal ml-4'>{user.email}</span></h1>
                <h1 className='font-medium'>Location: <span className='font-normal ml-4'>{user.location}</span></h1>
            </div>
            <div className='flex flex-col gap-4'>
                <h1 className='font-medium'>Last Name: <span className='font-normal ml-4'>{user.lastname}</span></h1>
                <h1 className='font-medium'>Mobile: <span className='font-normal ml-4'>+91 {user.phone}</span></h1>
                <h1 className='font-medium'>Role: <span className='font-normal ml-4'>{user.role.toUpperCase()}</span></h1>
            </div>
            <div className='flex flex-col gap-4'>
                <h1 className='font-medium'>Gender: <span className='font-normal ml-4'>Male</span></h1>
                <h1 className='font-medium'>Country: <span className='font-normal ml-4'>India</span></h1>
                <h1 className='font-medium'>Member Since: <span className='font-normal ml-4'>2005</span></h1>
            </div>
        </div>
    </div>
  )
}

export default Personal
