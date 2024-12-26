import React from 'react'
import profile from '../assets/user-icon.png'

function StatusBar({user}) {
  const formatDate = (dateString) => {
    if (!dateString) return 'Not available';
    return dateString.substring(0, 10);
  };
  return (
    <div className='flex flex-col gap-4 w-[72%]'>
        <span className='font-semibold'>Profile last updated on: <span className='font-bold ml-2'>{formatDate(user?.updatedAt)}</span></span>
        <div className='border-2 h-24 rounded-t-md flex flex-col'>
            <div className='flex gap-1'>
                <div className='bg-green-600 w-full h-3 rounded-tl-md'></div>
                <div className='bg-gray-300 w-full h-3'></div>
                <div className='bg-gray-300 w-full h-3'></div>
                <div className='bg-gray-300 w-full h-3'></div>
                <div className='bg-gray-300 w-full h-3'></div>
                <div className='bg-gray-300 w-full h-3'></div>
                <div className='bg-gray-300 w-full h-3'></div>
                <div className='bg-gray-300 w-full h-3'></div>
                <div className='bg-gray-300 w-full h-3 rounded-tr-md'></div>
            </div>
            <div className='h-full w-full flex items-center px-4 gap-4'>
                <img src={profile} className='w-8 h-8'></img>
                <span className='font-semibold'>Your profile can’t be found by mentees because it’s missing key information</span>
                <span className='ml-20 text-gray-500 hover:text-blue-500 hover:underline cursor-pointer'>8 Steps to complete</span>
            </div>
        </div>
    </div>
  )
}

export default StatusBar
