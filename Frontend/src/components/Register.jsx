import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { registerRoute,sendVerificationRoute } from "../utils/APIroutes";
import logo from '../assets/Learnify (1).png';
import LocationDropdown from "./LocationDropdown";

function Register() {
  const navigate = useNavigate()

  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const [step, setStep] = useState(1);
  const [firstname,setFirstname] = useState("");
  const [lastname,setLastname] = useState("");
  const [email,setEmail] = useState("");
  const [phone,setPhone] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [enteredCode, setEnteredCode] = useState("");
  const [disable,setDisable] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [role,setRole] = useState("");
  const [password,setPassword] = useState("");
  const [cpassword,setcPassword] = useState("");
  const phoneRegex = /^[6-9]\d{9}$/;

  const handleChange = (e, setter) => {
    setter(e.target.value);
  };


  const handleNext = async (e) => {
    e.preventDefault();
    if (!firstname || !email || !phone) {
      toast.error("All fields are required!", toastOptions);
      return
    }
    setDisable(true);
    try {
      const { data } = await axios.post(sendVerificationRoute, { email });
      if (data.statusCode == 200) {
        toast.success("Verification code sent on email!", toastOptions);
        setVerificationCode(data.data)
        setDisable(false);
        setStep(2);
      } 
      else {
        toast.error("Please try after some time!", toastOptions);
      }
    } 
    catch (error) {
      if(error.status==409){
        toast.error("User already exists with this email!", toastOptions);
      }
      else {
        toast.error("Failed to send verification code.", toastOptions);
      }
    }
    setDisable(false);
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    if (!enteredCode) {
      toast.error("Please enter the verification code!", toastOptions);
      return;
    }
    setDisable(true);
    if(enteredCode==verificationCode){
      toast.success("Verification done successfully!",toastOptions);
      setStep(3);
    }
    else{
      toast.error("Please enter a valid code!",toastOptions);
    }
    setDisable(false);
    return;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedCountry || !role || !password || password !== cpassword) {
      toast.error("Please fill all fields correctly!", toastOptions);
      return;
    }
    try {
      const { data } = await axios.post(registerRoute, {
        firstname,
        lastname,
        email,
        phone,
        selectedCountry,
        role,
        password,
      });
      if (data.statusCode === 200) {
        toast.success("Registered successfully!", toastOptions);
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } 
      else {
        toast.error("Please try again later", toastOptions);
      }
    } 
    catch (error) {
      if(error.status==409){
        toast.error("User already exists with this email!", toastOptions);
      }
      else{
        toast.error("Internal Server error!", toastOptions);
      }
    }
  };

  return (
    <div className='bg-[#ad2323] px-6 sm:px-0 w-full h-[100vh] flex flex-col justify-center items-center'>
      <form className='bg-white flex flex-col gap-[2rem] rounded-[2rem] px-[3rem] sm:px-[5rem] py-[2rem] sm:py-[3rem] items-center'>
          <div className="flex items-center justify-center">
            <img src={logo}  alt="logo" className='h-[3rem] sm:h-[4rem] rounded-md'/>
            <h1 className='text-3xl sm:text-4xl font-bold ml-4'>Learnify</h1>
          </div>
          { step==1 && 
            <div className="flex flex-col gap-6">
              <input
                className='bg-transparent p-[1rem] border-[#ad2323] rounded-[0.4rem] border-[0.1rem] w-[100%] text-[1rem] focus:border-[#d94c4c] focus:outline-none'
                type="text"
                placeholder="First name"
                name="firstname"
                value={firstname}
                onChange={(e) => handleChange(e,setFirstname)}
              />
              <input
                className='bg-transparent p-[1rem] border-[#ad2323] rounded-[0.4rem] border-[0.1rem] w-[100%] text-[1rem] focus:border-[#d94c4c] focus:outline-none'
                type="text"
                placeholder="Last name"
                name="lastname"
                value={lastname}
                onChange={(e) => handleChange(e,setLastname)}
              />
              <input
                className='bg-transparent p-[1rem] border-[#ad2323] rounded-[0.4rem] border-[0.1rem] w-[100%] text-[1rem] focus:border-[#d94c4c] focus:outline-none'
                type="text"
                placeholder="Email"
                name="email"
                value={email}
                onChange={(e) => handleChange(e,setEmail)}
              />
              <input
                className='bg-transparent p-[1rem] border-[#ad2323] rounded-[0.4rem] border-[0.1rem] w-[100%] text-[1rem] focus:border-[#d94c4c] focus:outline-none'
                type="tel"
                placeholder="Phone"
                name="phone"
                value={phone}
                onChange={(e) => handleChange(e,setPhone)}
              />
              <button onClick={(e) => handleNext(e)} disabled={disable} className='bg-[#ad2323] text-white px-[7rem] py-[1rem] font-bold cursor-pointer rounded-[0.4rem] text-[1rem] hover:bg-[#0e36ff]'>{disable ? 'WAIT...' : 'NEXT' }</button>
            </div>
          }

          {step==2 && 
            <div className="flex flex-col gap-6">
              <h1 className="text-xl">Enter the 6-digit code</h1>
              <input
                className='bg-transparent p-[1rem] border-[#ad2323] rounded-[0.4rem] border-[0.1rem] w-[100%] text-[1rem] focus:border-[#d94c4c] focus:outline-none'
                type="password"
                placeholder="6-digit Code"
                name="code"
                value={enteredCode}
                onChange={(e) => handleChange(e,setEnteredCode)}
              />
              <button onClick={(e) => handleVerify(e)} disabled={disable} className='bg-[#ad2323] text-white px-[3rem] py-[1rem] font-bold cursor-pointer rounded-[0.4rem] text-[1rem] hover:bg-[#0e36ff]'>{disable ? 'WAIT' : 'VERIFY' }</button>
            </div>
          }
          {step==3 &&
            <div className="flex flex-col gap-6 w-[70%]">
              <LocationDropdown selectedCountry={selectedCountry} setSelectedCountry={setSelectedCountry}></LocationDropdown>
              <select
                id="role"
                value={role}
                onChange={(e) => handleChange(e,setRole)}
                className="bg-transparent p-[1rem] border-[#ad2323] rounded-[0.4rem] border-[0.1rem] text-[1rem] focus:border-[#d94c4c] focus:outline-none"
              >
                <option value="" disabled>
                  Choose Role
                </option>
                <option value="mentor">Mentor</option>
                <option value="mentee">Mentee</option>
              </select>
              <input
                className='bg-transparent p-[1rem] border-[#ad2323] rounded-[0.4rem] border-[0.1rem] text-[1rem] focus:border-[#d94c4c] focus:outline-none'
                type="password"
                placeholder="Password"
                name="password"
                value={password}
                onChange={(e) => handleChange(e,setPassword)}
              />
              <input
                className='bg-transparent p-[1rem] border-[#ad2323] rounded-[0.4rem] border-[0.1rem] text-[1rem] focus:border-[#d94c4c] focus:outline-none'
                type="password"
                placeholder="Confirm Password"
                name="cpassword"
                value={cpassword}
                onChange={(e) => handleChange(e,setcPassword)}
              />
              <button onClick={(e) => handleSubmit(e)} disabled={disable} className='bg-[#ad2323] text-white px-[3rem] py-[1rem] font-bold cursor-pointer rounded-[0.4rem] text-[1rem] hover:bg-[#0e36ff]'>{disable ? 'WAIT' : 'COMPLETE' }</button>
            </div>
          }
          <span>
            Already have an Account ? <Link to="/login" className='text-[#ad2323] font-bold'>LOGIN</Link>
          </span>
        </form>
        <ToastContainer />
    </div>
  )
}

export default Register
