import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { verificationRoute,changePassRoute } from "../utils/APIroutes";
import logo from '../assets/Learnify (1).png';

function Forgot() {
  const navigate = useNavigate();

  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const [user, setUser] = useState("");
  const [success, setSuccess] = useState(false);
  const [code, setCode] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [change,setChange] = useState(false);
  const [password,setPassword] = useState("");
  const [confirmPassword,setConfirmPassword] = useState("");
  const [otp,setOtp] = useState(null);
  

  const handleChange = (e, setter) => {
    setter(e.target.value);
  };

  const handleValidation = () => {
    if (user === "") {
      toast.error("Email is required!", toastOptions);
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (handleValidation()) {
      setIsSubmitting(true);
      try {
        const { data } = await axios.post(verificationRoute,{ email: user });
        if (data.statusCode === 200) {
          setOtp(data.data.otp);
          setSuccess(true);
          setIsSubmitting(false);
        }
      } 
      catch (error) {
        toast.error(error.message, toastOptions);
        setIsSubmitting(false);
      }
    }
  };

  const handleVerificationSubmit = async (e) => {
    e.preventDefault();
    if(code.length!=6){
        toast.error("Please enter 6 digit verification code!",toastOptions)
        return
    }
    setIsSubmitting(true);
    if(code!=otp){
      toast.error("Incorrect Verification code! Please try again",toastOptions)
      return
    }
    setChange(true);
    setIsSubmitting(false);
  };

  const handlePassChange = async(e)=>{
    e.preventDefault();
    if(password.length<8){
        toast.error("Minimum Length of password should be 8 characters!!",toastOptions)
        return
    }
    if(confirmPassword!=password){
        toast.error("Password and Confirm Password should be same!",toastOptions)
        return
    }
    setIsSubmitting(true);
    try{
        const {result} = await axios.post(changePassRoute,{email: user,password: password});
        setIsSubmitting(false);
        toast.success("Password Changed!!",toastOptions);
        setTimeout(() => {
          navigate("/login");
        }, 2000);
    }
    catch (error) {
        toast.error(error.message, toastOptions);
        setIsSubmitting(false);
    }
  }


  return (
    <div className="w-full h-[100vh] bg-[#ad2323] text-white flex flex-col items-center">
      <h1 className="text-5xl mt-16 mb-6">
        Getting back into your Learnify account
      </h1>
      <h2 className="text-2xl">Tell us some information about your account.</h2>
      <form
        action=""
        onSubmit={success ? change ? handlePassChange : handleVerificationSubmit : handleSubmit}
        className="bg-white text-black flex flex-col gap-[2rem] rounded-[2rem] px-[3rem] py-[2rem] mt-16 w-[420px]"
      >
        <div className="flex items-center justify-center">
            <img src={logo}  alt="logo" className='h-[3rem] sm:h-[4rem] rounded-md'/>
            <h1 className='text-3xl sm:text-4xl font-bold ml-4'>Learnify</h1>
        </div>
        <div>
            {!success && !change && (
                <div>
                    <label htmlFor="username" className="text-xl">
                        Enter your email:
                    </label>
                    <input
                        className="mt-2 mb-2 bg-transparent p-[1rem] border-[#ad2323] rounded-[0.4rem] border-[0.1rem] w-[100%] text-[1rem] focus:border-[#d94c4c] focus:outline-none"
                        type="text"
                        placeholder="Email"
                        name="username"
                        value={user}
                        onChange={(e) => handleChange(e, setUser)}
                        disabled={success}
                    />
                </div>                
            )}
          {success && !change && (
            <div>
              <label htmlFor="code" className="text-xl">
                Enter Verification Code
              </label>
              <input
                className="mt-2 bg-transparent p-[1rem] border-[#ad2323] rounded-[0.4rem] border-[0.1rem] w-[100%] text-[1rem] focus:border-[#d94c4c] focus:outline-none"
                type="number"
                placeholder="6-digit Code"
                name="code"
                value={code}
                onChange={(e) => handleChange(e, setCode)}
              />
              <span className="block mt-2 text-red-700">
                Verification code sent to your email!
              </span>
            </div>
          )}
          {success && change && (
            <div className="flex flex-col items-center">
                <h1 className="text-3xl font-semibold mb-4">Change Password</h1>
                <input
                className="mt-2 bg-transparent p-[1rem] border-[#ad2323] rounded-[0.4rem] border-[0.1rem] w-[100%] text-[1rem] focus:border-[#d94c4c] focus:outline-none"
                type="text"
                placeholder="New Password"
                name="password"
                value={password}
                onChange={(e) => handleChange(e, setPassword)}
                />
                <input
                className="mt-2 bg-transparent p-[1rem] border-[#ad2323] rounded-[0.4rem] border-[0.1rem] w-[100%] text-[1rem] focus:border-[#d94c4c] focus:outline-none"
                type="text"
                placeholder="Confirm Password"
                name="password"
                value={confirmPassword}
                onChange={(e) => handleChange(e, setConfirmPassword)}
                />
            </div>
          )}
        </div>
        <button
          type="submit"
          className={`bg-[#ad2323] text-white px-[3rem] py-[1rem] font-semibold cursor-pointer rounded-[0.4rem] text-xl hover:bg-[#4e0eff] active:bg-[#ad2323] ${
            isSubmitting ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={isSubmitting}
        >
          {success ? change ? "Change Password" : "Submit Verification Code" : "Send Verification Code"}
        </button>
      </form>
      <ToastContainer />
    </div>
  );
}

export default Forgot;
