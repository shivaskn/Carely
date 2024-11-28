import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
const Footer = () => {

    const navigate = useNavigate();

  return (
    <div className='md:mx-3'>
        <div className='flex flex-col sm:grid grid-cols-[4fr_1fr_1fr_1fr] gap-14 my-10 mt-40 md:mx-3 text-sm'> {/* This section has three child container */}

            {/*Left* *This section includes logo and description of company*/}

            <div>
               <img className='mb-5 w-40' src={assets.logo} alt="Logo" />
               <p className='w-full md:w-2/3 md:ps-3 text-black leading-6'>Carely is a user-friendly platform designed to simplify appointment booking for healthcare services. Patients can quickly search for healthcare providers, view doctor profiles, check availability, and book appointments directly through the app.</p>
            </div>

              {/*Center* *This section includes link to connect webpages*/}
              <div>
                <p className='text-xl font-medium mb-5'>Company</p>
                <ul className='flex flex-col gap-2 text-black'>
                    <li onClick={()=>{navigate('/'), scroll(0,0)}} className='cursor-pointer'>Home</li>
                    <li onClick={()=>{navigate('/about'), scroll(0,0)}} className='cursor-pointer'>About us</li>
                    <li onClick={()=>{navigate('/contact'), scroll(0,0)}} className='cursor-pointer'>Contact us</li>
                    <li>Privacy policy</li>
                </ul>
                </div>
                
                 {/*Right* *This section includes social media platforms and phone numbers*/}
              <div>
                <p className='text-xl font-medium mb-5'> DEVELOPED BY
                </p>
                <ul className='flex flex-col gap-2 text-black'>
                    <li>SHIVAKUMAR N</li>
                    <li>shivaskn299@gmail.com</li>
                    <li>+91 7358654328</li>
                </ul>
                </div>

                <div>
                <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
                <ul className='flex flex-col gap-2 text-black'>
                    <li>+91 333 333 221</li>
                    <li>carely2024@gmail.com</li>
                    <li><img className=' mt-1 w-28' src={assets.sponser} alt="Logo" /></li>
                </ul>
                </div>
        </div>
       
        {/*Copyright section*/}
        
        <div>
        
             <hr className='border-black'/>
              <p className='py-5 text-sm text-center'>Copyright 2024 @ Doctors.dev - All Right Reserved.</p>
        </div>
       
            </div>
  )
}

export default Footer