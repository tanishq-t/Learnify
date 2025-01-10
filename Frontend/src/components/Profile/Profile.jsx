import {React,useState,useEffect}from 'react'
import axios from "axios";
import { getUserRoute } from '../../utils/APIroutes';
import {useNavigate } from 'react-router-dom'
import loader from '../../assets/Hourglass.gif'
import Education from './Education'
import Personal from './Personal'
import Skills from './Skills'
import Experience from './Experience'
import { useOutletContext } from 'react-router-dom';
import { updationRoute } from '../../utils/APIroutes';

function Profile() {
    const {viewProfilePic,setViewProfilePic} = useOutletContext();
    const navigate=useNavigate();
    const [user, setUser] = useState(null);
    const [step, setStep] = useState(1);

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
          return(
          <div className='z-50 w-full h-[100vh] bg-white flex flex-col justify-center items-center'>
            <img src={loader} className='w-24'></img>
            <h1 className='font-semibold'>Loading...</h1>
          </div>
          );
        }


    const handleNext=()=>{
        setStep(prevStep=>prevStep+1);
    };

    const handlePrevious = () => {
        setStep(prevStep=>prevStep-1);
    };

  return (
    <div className="flex flex-col gap-10 w-full pr-20 pb-12 pt-28 pl-48">
      <h1 className="text-3xl font-semibold">Complete Your Profile</h1>

      {/* Render the current step */}
      {step === 1 && (
        <Personal user={user}  viewProfilePic={viewProfilePic} setViewProfilePic={setViewProfilePic}/>
      )}
      {step === 2 && (
        <Education user={user} />
      )}
      {step === 3 && (
        <Experience user={user} />
      )}
      {step === 4 && (
        <Skills user={user} />
      )}

      <div className="flex justify-center gap-6 mt-2 w-[75%]">
        {step > 1 && (
          <button
            className="px-6 py-2 text-[18px] bg-gray-500 text-white rounded-md"
            onClick={handlePrevious}
          >
            Previous
          </button>
        )}
        {step < 9 && (
          <button
            className="px-6 py-2 text-[18px] bg-blue-500 text-white rounded-md"
            onClick={handleNext}
          >
            Next
          </button>
        )}
        {step === 9 && (
          <button
            className="px-4 py-2 bg-green-500 text-white rounded-md"
            onClick={() => alert('Profile Completed!')}
          >
            Complete
          </button>
        )}
      </div>
    </div>
  )
}

export default Profile
