import React from 'react'
import pin from '../../assets/pin.svg'

function Education() {
  return (
    <div className='flex flex-col gap-4'>
        <h1 className='text-2xl font-semibold'>Education</h1>
        <div className='w-full border-b-2 border-gray-500'></div>
        <div className='flex flex-col gap-3'>
            <div className='flex gap-3'>
                <img src={pin} className='w-6 h-6'></img>
                <div>
                    <h1 className='font-medium'>Degree: <span className='font-normal ml-4'>10th GRADE</span></h1>
                    <h1 className='font-medium'>Institution: <span className='font-normal ml-4'>Air Force School</span></h1>
                    <h1 className='font-medium'>GPA/Percentage: <span className='font-normal ml-4'>96%</span></h1> 
                </div>
            </div>
        </div>
    </div>
  )
}

export default Education
