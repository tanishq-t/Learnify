import React from 'react'
import home from '../assets/homeIcon.svg'
import profile from '../assets/user-icon.png'
import message from '../assets/messageIcon.svg'
import { Link,NavLink,useLocation } from 'react-router-dom'
import discover from '../assets/Discover.png'

function Sidebar() {
    const location=useLocation();
  return (
    <div className='border-r-2 w-28 flex flex-col pt-10 gap-8 pr-2 fixed top-20 left-0 h-[100vh] bg-white'>
        <Link to="/">
        <div className={`flex flex-col justify-center items-center rounded-r-lg hover:bg-blue-100 ${location.pathname==='/' ? "bg-blue-100" : "bg-transparent"} py-3 cursor-pointer`}>
            <img src={home} className='w-8 h-8'></img>
            <span className='text-[18px]'>Home</span>
        </div>
        </Link>
        <Link to="/profile">
        <div className={`flex flex-col justify-center items-center rounded-r-lg hover:bg-blue-100 ${location.pathname==='/profile' ? "bg-blue-100" : "bg-transparent"} py-3 cursor-pointer`}>
            <img src={profile} className='w-8 h-8'></img>
            <span className='text-[18px]'>Profile</span>
        </div>
        </Link>
        <Link to="/explore">
        <div className={`flex flex-col justify-center items-center rounded-r-lg hover:bg-blue-100 ${location.pathname==='/explore' ? "bg-blue-100" : "bg-transparent"} py-3 cursor-pointer`}>
            <img src={discover} className='w-10 h-10'></img>
            <span className='text-[18px]'>Discover</span>
        </div>
        </Link>
        <Link to="/status">
        <div className={`flex flex-col justify-center items-center rounded-r-lg hover:bg-blue-100 ${location.pathname==='/status' ? "bg-blue-100" : "bg-transparent"} py-3 cursor-pointer`}>
            <img src={message} className='w-8 h-8'></img>
            <span className='text-[18px]'>Status</span>
        </div>
        </Link>
    </div>
  )
}

export default Sidebar
