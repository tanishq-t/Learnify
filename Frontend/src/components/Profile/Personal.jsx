import React, { useState } from 'react';
import userIcon from '../../assets/user-icon.png'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios';
import {uploadRoute} from '../../utils/APIroutes'
import { updationRoute } from '../../utils/APIroutes';

function Personal({ user,viewProfilePic,setViewProfilePic }) {
  const [formData, setFormData] = useState({
    firstname: user.firstname || '',
    lastname: user.lastname || '',
    phone: user.phone || '',
    location: user.location || '',
    email: user.email || '',
    coverImage: user.coverImage || userIcon,
    dob: user.dob || '',
    gender: user.gender || '',
    city: user.city || '',
    pincode: user.pincode || '',
    address: user.address || '',
  });

  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading,setUploading] = useState(false);
  const [saving,setSaving] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    setSaving(true);
    const { coverImage, ...dataToSend } = formData;
    console.log(dataToSend)
    try {
      const response = await axios.post(updationRoute,dataToSend, { withCredentials: true });
      if(response.status===200){
        toast.success("User updated successfully!",toastOptions)
        setSaving(false);
        setTimeout(() => {
          window.location.reload()
        }, 1000);
      }
      else{
        toast.error("Error updating user",toastOptions)
        setSaving(false);
      }
    } 
    catch (error) {
      console.error("Error updating section:", error);
      toast.error("Error updating user",toastOptions)
      setSaving(false);
    }
  };
  

  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const fmData = new FormData();
  fmData.append("profileImage", selectedFile);

  axios.defaults.withCredentials = true
  const handleUpload = async () => {
    if (!selectedFile) {
      toast.error("No file chosen!!",toastOptions)
      return;
    }
    setUploading(true);
    try {
      const response = await axios.post(uploadRoute,fmData,{headers: {"Content-Type": "multipart/form-data",}});

      if(!response){
        setUploading(false);
        toast.error("An Issue Occured please try again later!",toastOptions);
        return
      }
      setUploading(false);
      toast.success("Cover Image updated successfully!!",toastOptions)
      console.log(response);
      setTimeout(() => {
        window.location.reload()
      }, 1000);
      return
    } 
    catch (error) {
      toast.error("An Issue Occured please try again later!",toastOptions);
      setUploading(false);
      return
    }
  };

  return (
    <div className="w-[80%] border-2 flex justify-center flex-col items-center rounded-lg py-4 px-12 gap-8">
      {
        viewProfilePic && 
        <div className='w-full h-[60vh] justify-center flex px-4 py-4 bg-white'>
            <img src={formData.coverImage}></img>
        </div>
      }
      {
        !viewProfilePic && 
      <>
        <h2 className="text-2xl font-semibold text-gray-700">Personal Information</h2>
        <div className='flex justify-between w-full'>
          <div className='flex flex-col justify-center items-center gap-4 ml-12'>
            <img src={formData.coverImage} onClick={()=>{setViewProfilePic(!viewProfilePic)}} className='w-36 h-36 rounded-full border-[1px] border-black cursor-pointer hover:opacity-80'></img>
            <input
              type="file"
              accept="image/*"
              id="file-upload"
              className="hidden"
              onChange={handleFileChange}
            />
            <label
              htmlFor="file-upload"
              className="px-3 py-2 mt-2 text-lg font-semibold text-white bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg shadow-md cursor-pointer hover:opacity-90 focus:ring-4 focus:ring-blue-300"
            >
              Choose an Image
            </label>
            <button onClick={handleUpload}  className='bg-green-600 text-white font-semibold px-5 py-2 rounded-md hover:bg-white hover:text-green-600 hover:border-green-600 hover:border-[1px] active:opacity-75'>{uploading? "Uploading.." : "Upload"}</button>
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
            <div className='flex justify-between items-center w-full gap-16'>
              <div className="flex flex-col w-full">
                <label htmlFor="dob">Date of Birth</label>
                <input
                  type="date"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                  placeholder="Date of Birth"
                  className="px-4 py-1 rounded-md bg-[#ffef94] text-xl"
                />
              </div>
              <div className="flex flex-col w-full">
                <label htmlFor="gender">Gender</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="px-4 py-1 rounded-md bg-[#ffef94] text-xl"
                >
                  <option value="" disabled className='bg-white'>
                    Select Gender
                  </option>
                  <option value="Male" className='bg-white'>Male</option>
                  <option value="Female" className='bg-white'>Female</option>
                  <option value="Others" className='bg-white'>Others</option>
                  <option value="Prefer not to say" className='bg-white'>Prefer not to say</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <div className='flex justify-between items-center w-full gap-16'>
          <div className='flex flex-col w-full'>
              <label htmlFor='location'>Country</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Location"
                className="px-4 py-1 rounded-md bg-[#ffef94] text-xl"
              />
          </div>
          <div className='flex flex-col w-full'>
            <label htmlFor='city'>City</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="City"
              className="px-4 py-1 rounded-md bg-[#ffef94] text-xl"
            />
          </div>
          <div className='flex flex-col w-full'>
            <label htmlFor='pincode'>Pincode</label>
            <input
              type="text"
              name="pincode"
              value={formData.pincode}
              onChange={handleChange}
              placeholder="Pincode"
              className="px-4 py-1 rounded-md bg-[#ffef94] text-xl"
            />
          </div>
        </div>
        <div className='flex justify-between items-center w-full gap-32'>
          <div className='flex flex-col w-full'>
            <label htmlFor='address'>Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Address"
              className="px-4 py-2 rounded-md bg-[#ffef94] text-xl"
            />
          </div>
          <div className=' flex justify-end'>
          <button onClick={handleSubmit} className="px-6 py-2 text-[18px] hover:opacity-85 active:opacity-60 bg-blue-500 text-white rounded-md mt-4">
            {saving?"Saving.." : "Save"}
          </button>
        </div>
        </div>
      </>
  }
  <ToastContainer />
    </div>
  );
}

export default Personal;
