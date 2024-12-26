import React, { useEffect, useState } from 'react'
import StatusBar from './StatusBar'
import Overview from './Overview'
import axios from "axios";
import { getUserRoute } from '../utils/APIroutes';
import { data, useNavigate } from 'react-router-dom'

function Home() {
  const navigate=useNavigate();

  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await axios.get(getUserRoute, { withCredentials: true });
        if (!response.data) {
          navigate('/login');
          return;
        }
        setUser(response.data.data);
      } catch (error) {
        console.error("Error fetching user:", error);
        navigate('/login');
      }
    };
    
    getUser();
  }, []);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className='flex flex-col gap-10 w-full pr-20 pb-12 pt-28 pl-48'>
      <div>
        <h1 className='text-red-600 text-4xl font-bold mb-2'>Welcome {user.firstname}!</h1>
        <span className='text-xl font-semibold italic'>Unlock Your Potential. Learn, Grow, and Succeed with Learnify.</span>
      </div>
      <StatusBar user={user}></StatusBar>
      <h1 className='text-2xl font-semibold mt-2'>Overview of your Profile</h1>
      <Overview user={user}></Overview>
    </div>
  )
}

export default Home
