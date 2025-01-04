import React from 'react'
import profile from '../assets/user-icon.png'
import { Link } from 'react-router-dom'


function StatusBar({user,completed}) {
  const formatDate = (dateString) => {
    if (!dateString) return 'Not available';
    return dateString.substring(0, 10);
  };
  return (
    <div className='flex flex-col gap-4 w-[72%]'>
        <span className='font-semibold'>Profile last updated on: <span className='font-bold ml-2'>{formatDate(user?.updatedAt)}</span></span>
        <div className='border-2 h-24 rounded-t-md flex flex-col'>
            <div className='flex gap-1'>
              <div className={`h-3 w-full ${completed >= 1 ? 'bg-green-600' : 'bg-gray-300'} rounded-tl-md`}></div>
              <div className={`h-3 w-full ${completed >= 2 ? 'bg-green-600' : 'bg-gray-300'}`}></div>
              <div className={`h-3 w-full ${completed >= 3 ? 'bg-green-600' : 'bg-gray-300'}`}></div>
              <div className={`h-3 w-full ${completed >= 4 ? 'bg-green-600' : 'bg-gray-300'}`}></div>
              <div className={`h-3 w-full ${completed >= 5 ? 'bg-green-600' : 'bg-gray-300'}`}></div>
              <div className={`h-3 w-full ${completed >= 6 ? 'bg-green-600' : 'bg-gray-300'}`}></div>
              <div className={`h-3 w-full ${completed >= 7 ? 'bg-green-600' : 'bg-gray-300'}`}></div>
              <div className={`h-3 w-full ${completed >= 8 ? 'bg-green-600' : 'bg-gray-300'}`}></div>
              <div className={`h-3 w-full ${completed >= 9 ? 'bg-green-600' : 'bg-gray-300'} rounded-tr-md`}></div>
            </div>
            <div className='h-full w-full flex items-center px-4 gap-4'>
                <img src={profile} className='w-8 h-8'></img>
                <span className='font-semibold'>Your profile can’t be found by mentees because it’s missing key information</span>
                <Link to="/profile"><span className='ml-20 text-gray-500 hover:text-blue-500 hover:underline cursor-pointer'>8 Steps to complete</span></Link>
            </div>
        </div>
    </div>
  )
}

export default StatusBar
