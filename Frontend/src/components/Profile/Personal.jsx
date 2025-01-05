import React, { useState } from 'react';
import userIcon from '../../assets/user-icon.png'

function Personal({ user, onSave,viewProfilePic,setViewProfilePic }) {
  const [formData, setFormData] = useState({
    firstname: user.firstname || '',
    lastname: user.lastname || '',
    phone: user.phone || '',
    // Add other personal fields
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    onSave(formData); // Call onSave function passed from the parent to save data
  };

  return (
    <div className="w-[80%] border-2 flex justify-center flex-col items-center rounded-lg py-4 px-12 gap-8">
      {
        viewProfilePic && 
        <div className='w-full h-[60vh] justify-center flex px-4 py-4 bg-white'>
            <img src={userIcon}></img>
        </div>
      }
      {
        !viewProfilePic && 
      <>
        <h2 className="text-2xl font-semibold text-gray-700">Personal Information</h2>
        <div className='flex justify-between w-full'>
          <div className='flex flex-col justify-center items-center gap-3'>
            <img src={userIcon} onClick={()=>{setViewProfilePic(!viewProfilePic)}} className='w-36 h-36 rounded-full border-[1px] border-black cursor-pointer hover:opacity-80'></img>
            <button  className='border-2 border-black text-xl font-semibold px-3 py-2 rounded-md'>Upload a new photo</button>
          </div>
          <div className='flex flex-col items-center justify-center gap-8'>
            <div className='flex justify-between items-center w-full gap-16'>
              <div className='flex flex-col'>
                <label htmlFor='firstname'>First Name</label>
                <input
                  type="text"
                  name="firstname"
                  value={formData.firstname}
                  onChange={handleChange}
                  placeholder="First Name"
                  className="px-4 py-1 rounded-md bg-[#ffef94] text-xl"
                />
              </div>
              <div className='flex flex-col'>
                <label htmlFor='lastname'>Last Name</label>
                <input
                  type="text"
                  name="lastname"
                  value={formData.lastname}
                  onChange={handleChange}
                  placeholder="Last Name"
                  className="px-4 py-1 rounded-md bg-[#ffef94] text-xl"
                />
              </div>
            </div>
            <div className='flex justify-between items-center w-full gap-16'>
              <div className='flex flex-col'>
                <label htmlFor='email'>Email</label>
                <input
                  type="text"
                  name="email"
                  value={formData.email}
                  disabled
                  onChange={handleChange}
                  placeholder="Email"
                  className="px-4 py-1 rounded-md bg-[#ffef94] text-xl"
                />
              </div>
              <div className='flex flex-col'>
                <label htmlFor='Phone'>Phone</label>
                <input
                  type="text"
                  name="Phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Phone"
                  className="px-4 py-1 rounded-md bg-[#ffef94] text-xl"
                />
              </div>
            </div>
          </div>
        </div>
        <div className='flex justify-between items-center w-full'>
          <div className='flex flex-col'>
            <label htmlFor='firstname'>First Name</label>
            <input
              type="text"
              name="firstname"
              value={formData.firstname}
              onChange={handleChange}
              placeholder="First Name"
              className="px-4 py-1 rounded-md bg-[#ffef94] text-xl"
            />
          </div>
          <div className='flex flex-col'>
            <label htmlFor='lastname'>Last Name</label>
            <input
              type="text"
              name="lastname"
              value={formData.lastname}
              onChange={handleChange}
              placeholder="Last Name"
              className="px-4 py-1 rounded-md bg-[#ffef94] text-xl"
            />
          </div>
          <div className='flex flex-col'>
            <label htmlFor='phone'>Phone</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone"
              className="px-4 py-1 rounded-md bg-[#ffef94] text-xl"
            />
          </div>
        </div>
        <div className='flex justify-between items-center w-full'>
          <div className='flex flex-col'>
            <label htmlFor='firstname'>Email</label>
            <input
              type="text"
              name="email"
              disabled
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="px-4 py-1 rounded-md bg-[#ffef94] text-xl"
            />
          </div>
          <div className='flex flex-col'>
            <label htmlFor='location'>Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Location"
              className="px-4 py-1 rounded-md bg-[#ffef94] text-xl"
            />
          </div>
          <div className='flex flex-col'>
            <label htmlFor='phone'>Phone</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              disabled
              placeholder="Phone"
              className="px-4 py-1 rounded-md bg-[#ffef94] text-xl"
            />
          </div>
        </div>
        
        <button
          onClick={handleSubmit}
          className="px-4 py-2 bg-blue-500 text-white rounded-md mt-4"
        >
          Save
        </button>
      </>
  }
    </div>
  );
}

export default Personal;
