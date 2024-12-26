import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { registerRoute } from "../utils/APIroutes";
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

  const [firstname,setFirstname] = useState("");
  const [lastname,setLastname] = useState("");
  const [email,setEmail] = useState("");
  const [phone,setPhone] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [role,setRole] = useState("");
  const [password,setPassword] = useState("");
  const [cpassword,setcPassword] = useState("");
  const phoneRegex = /^[6-9]\d{9}$/;

  const handleChange = (e, setter) => {
    setter(e.target.value);
  };

  const handleValidation = () => {
    if(firstname === ""){
      toast.error(
        "Username is required!",
        toastOptions
      );
      return false;
    }
    else if(email === "") {
        toast.error(
            "Email is required",
            toastOptions
        );
        return false; 
    }
    else if(phone === "") {
      toast.error(
          "Phone number is required",
          toastOptions
      );
      return false; 
    }
    else if(!phoneRegex.test(phone)) {
      toast.error(
        "Enter a valid Phone number!",
        toastOptions
      );
      return false;
    }
    else if(selectedCountry === "") {
      toast.error(
          "Location is required!",
          toastOptions
      );
      return false; 
    }
    else if(role === "") {
      toast.error(
          "Role is required!",
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
    else if (password!==cpassword){
      toast.error(
        "Password & confirm password should be same!",
        toastOptions
      );
      return false;
    }
    return true;
  };

  const handleSubmit = async (e)=>{
    e.preventDefault();
    if (handleValidation()) {
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
        if(data.statusCode === 200){
          console.log(data.message)
        }      
        navigate("/login");
      } 
      catch (error) {
        console.log(error);
        toast.error(error.message, toastOptions);
      }
      
    }
  }

  return (
    <div className='bg-[#ad2323] px-6 sm:px-0 w-full h-[100vh] flex flex-col justify-center items-center'>
      <form action="" onSubmit={(event) => handleSubmit(event)} className='bg-white flex flex-col gap-[2rem] rounded-[2rem] px-[3rem] sm:px-[5rem] py-[2rem] sm:py-[3rem]'>
          <div className="flex items-center justify-center">
            <img src={logo}  alt="logo" className='h-[3rem] sm:h-[4rem] rounded-md'/>
            <h1 className='text-3xl sm:text-4xl font-bold ml-4'>Learnify</h1>
          </div>
          <div className="flex gap-4">
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
          </div>
          <div className="flex gap-4">
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
          </div>
          <div className="flex gap-4">
            <LocationDropdown selectedCountry={selectedCountry} setSelectedCountry={setSelectedCountry}></LocationDropdown>
            <select
              id="role"
              value={role}
              onChange={(e) => handleChange(e,setRole)}
              className="bg-transparent p-[1rem] border-[#ad2323] rounded-[0.4rem] border-[0.1rem] w-[100%] text-[1rem] focus:border-[#d94c4c] focus:outline-none"
            >
              <option value="" disabled>
                -- Choose Role --
              </option>
              <option value="mentor">Mentor</option>
              <option value="mentee">Mentee</option>
            </select>
          </div>
          <div className="flex gap-4">
          <input
            className='bg-transparent p-[1rem] border-[#ad2323] rounded-[0.4rem] border-[0.1rem] w-[100%] text-[1rem] focus:border-[#d94c4c] focus:outline-none'
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={(e) => handleChange(e,setPassword)}
          />
          <input
            className='bg-transparent p-[1rem] border-[#ad2323] rounded-[0.4rem] border-[0.1rem] w-[100%] text-[1rem] focus:border-[#d94c4c] focus:outline-none'
            type="password"
            placeholder="Confirm Password"
            name="cpassword"
            value={cpassword}
            onChange={(e) => handleChange(e,setcPassword)}
          />
          </div>
          <button type="submit" className='bg-[#ad2323] text-white px-[3rem] py-[1rem] font-bold cursor-pointer rounded-[0.4rem] text-[1rem] hover:bg-[#0e36ff]'>REGISTER</button>
          <span>
            Already have an Account ? <Link to="/login" className='text-[#ad2323] font-bold'>LOGIN</Link>
          </span>
        </form>
        <ToastContainer />
    </div>
  )
}

export default Register
