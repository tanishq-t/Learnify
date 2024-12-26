import React from 'react'
import { useState } from 'react'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import { Outlet } from 'react-router-dom'
import { useLocation } from 'react-router-dom'

function Layout() {
    const location = useLocation();
    const noHeaderRoutes = ['/login','/register'];
    const [vcard,setvcard] = useState(false);
    const [notifications,setNotification]=useState(false);

    const handleClick=()=>{
        if(vcard===true) setvcard(false);
        if(notifications===true) setNotification(false);
    }
  return (
    <div onClick={handleClick} className='flex flex-col justify-center items-center relative'>
      {!noHeaderRoutes.includes(location.pathname) && <Header vcard={vcard} setvcard={setvcard} notifications={notifications} setNotification={setNotification}/>}
      <div className='w-full h-full flex'>
        {!noHeaderRoutes.includes(location.pathname) && <Sidebar/>}
        <Outlet></Outlet>
      </div>
    </div>
  )
}

export default Layout