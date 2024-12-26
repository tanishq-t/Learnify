import React from 'react'
import { useState } from 'react'
import logo from '../assets/Learnify (1).png'
import userIcon from '../assets/user-icon.png'
import { Link,NavLink,useLocation } from 'react-router-dom'
import arrowIcon from '../assets/arrowIcon.svg'
import notification from '../assets/notifications.svg'
import { logoutRoute } from '../utils/APIroutes'
import axios from "axios";
import { useNavigate } from 'react-router-dom'

function Header({vcard,setvcard,notifications,setNotification}) {
    const navigate=useNavigate();

    const handleClick=()=>{
        setvcard(!vcard);
    }

    const handleClick2=()=>{
        setNotification(!notifications);
    }

    axios.defaults.withCredentials = true
    const handleClick3= async ()=>{
        try {
            await axios.post(logoutRoute);
            navigate('/login');
          } 
        catch (error) {
            console.error('Error during logout:', error.response?.data || error.message);
          }
    }

  return (
    <div className='w-full h-20 border-b-2 flex items-center px-10 justify-between fixed top-0 bg-white'>
        <Link to="/">
            <div className='flex justify-center items-center gap-5'>
                <img src={logo} className='w-12 h-12 rounded-md'></img>
                <span className='text-red-600 text-3xl font-semibold'>Learnify</span>
            </div>
        </Link>

        <div className='flex justify-center items-center gap-10'>
            <img src={notification} className='w-8 h-8 cursor-pointer' onClick={handleClick2}></img>
            <Link to="/help"><div className='bg-green-500 px-6 py-2 rounded-md text-xl font-semibold cursor-pointer hover:opacity-80 active:bg-opacity-60 text-white'>Help</div></Link>
            <div onClick={handleClick} className='cursor-pointer'>
                <img src={userIcon} className='w-12 h-12 rounded-full border-2 border-black'></img>
            </div>
        </div>

        {notifications &&
        <div className='absolute border-black border-[1px] top-[85px] right-56 flex flex-col px-4 py-3 rounded-md gap-3 cursor-pointer w-60'>

        </div>
        }

        { vcard && 
        <div className='absolute border-black border-[1px] top-[85px] right-10 flex flex-col px-4 py-3 rounded-md gap-2 cursor-pointer font-semibold'>
            <Link to="/profile">
            <div className='flex justify-center items-center gap-2'>
                <span className='hover:text-red-600'>View Profile</span>
                <img src={arrowIcon} className='w-4 h-4'></img>
            </div>
            </Link>
            <div onClick={handleClick3} className='flex justify-center items-center gap-3'>
                <span className='hover:text-red-600'>Logout</span>
                <img src={arrowIcon} className='w-4 h-4'></img>
            </div>
        </div>
        }
        
    </div>
  )
}

export default Header
