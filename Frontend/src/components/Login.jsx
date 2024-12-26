import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loginRoute } from "../utils/APIroutes";
import logo from '../assets/Learnify (1).png';

function Login() {
  const navigate = useNavigate()

  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const handleChange = (e, setter) => {
    setter(e.target.value);
  };

  const handleValidation = () => {
    if(email === ""){
      toast.error(
        "Email is required!",
        toastOptions
      );
      return false;
    }
    else if (password === "") {
      toast.error(
        "Password is required!",
        toastOptions
      );
      return false;
    }
    return true;
  };

  axios.defaults.withCredentials = true
  const handleSubmit = async (e)=>{
    e.preventDefault();
    if (handleValidation()) {
      try {
        const data  = await axios.post(loginRoute, {email,password});
        console.log(data);
        navigate("/")        
      } 
      catch (error) {
        toast.error(error.message, toastOptions);
      }
      
    }
  }

  return (
    <div className='bg-[#ad2323] px-6 sm:px-0 w-full h-[100vh] flex flex-col justify-center gap-[1rem] items-center'>
      <form action="" onSubmit={(event) => handleSubmit(event)} className='bg-white flex flex-col gap-[2rem] rounded-[2rem] px-[3rem] sm:px-[5rem] py-[2rem] sm:py-[3rem]'>
          <div className="flex items-center justify-center">
            <img src={logo}  alt="logo" className='h-[3rem] sm:h-[4rem] rounded-md'/>
            <h1 className='text-3xl sm:text-4xl font-bold ml-4'>Learnify</h1>
          </div>
          <input
            className='bg-transparent p-[1rem] border-[#ad2323] rounded-[0.4rem] border-[0.1rem] w-[100%] text-[1rem] focus:border-[#d94c4c] focus:outline-none'
            type="text"
            placeholder="Email"
            name="email"
            value={email}
            onChange={(e) => handleChange(e,setEmail)}
          />
          <div className="flex flex-col gap-1">
            <input
              className='bg-transparent p-[1rem] border-[#ad2323] rounded-[0.4rem] border-[0.1rem] w-[100%] text-[1rem] focus:border-[#d94c4c] focus:outline-none'
              type="password"
              placeholder="Password"
              name="password"
              value={password}
              onChange={(e) => handleChange(e,setPassword)}
            />
            <Link to="/account-recovery"><span className="hover:text-[#ad2323] cursor-pointer">Forgot Password?</span></Link>
          </div>
          <button type="submit" className='bg-[#ad2323] text-white px-[3rem] py-[1rem] font-bold cursor-pointer rounded-[0.4rem] text-[1rem] hover:bg-[#0e36ff]'>LOGIN</button>
          <span className=''>
            Don't have an Account ? <Link to="/register" className='text-[#ad2323] font-bold'>REGISTER</Link>
          </span>
        </form>
        <ToastContainer />
    </div>
  )
}

export default Login
