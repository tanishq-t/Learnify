import React from 'react'
import photo from '../assets/2c80ydc.jpg'
import linkedin from '../assets/linked-in-icon.png'
import Personal from  './FormComponents/Personal'
import Objective from './FormComponents/Objective'
import Education from './FormComponents/Education'
import Skills from './FormComponents/Skills'

function Overview({user}) {
  return (
    <div className='border-2 w-[90%] px-6 py-6 rounded-md flex flex-col gap-8'>
        <div className='flex justify-left gap-10'>
            <img src={photo} className='w-32 h-32 rounded-full border-2'></img>
            <div className='flex flex-col gap-2 w-full justify-center'>
                <h1 className='text-2xl font-bold'>{user.firstname.toUpperCase()} {user.lastname.toUpperCase()} <span className='text-gray-400 font-semibold'>(He/Him)</span></h1>
                <h2 className='text-xl font-semibold text-gray-600'>Open to Teach</h2>
            </div>
            <div className='w-full flex justify-end items-start gap-4'>
                <img src={linkedin} className='w-10 hover:opacity-80 cursor-pointer'></img>
                <button className='px-2 py-2 bg-green-400 rounded-md text-white hover:opacity-80 active:opacity-60 font-semibold'>Download CV</button>
            </div>
        </div>
        <Objective></Objective>
        <Personal user={user}></Personal>
        <Education></Education>
        <Skills></Skills>
    </div>
  )
}

export default Overview
