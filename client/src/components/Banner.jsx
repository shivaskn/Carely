import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import {motion} from 'framer-motion'



const Banner = () => {
  const navigate = useNavigate()
  return (
    <motion.div 
    initial={{ y: -100, opacity: 0 }}
    whileInView={{y: 0, opacity: 1}}
  //  animate={{ y: 0, opacity: 1 }}
   transition={{
     delay: 0.2,
     y: { type: "spring", stiffness: 60 },
     opacity: { duration: 1 },
     ease: "easeIn",
     duration: 1,
   }}
    className='flex bg-primary rounded-lg px-6 sm:px-10 md-px-14 lg:px-12 my-20 md:mx-10'> {/*This container has two child container one is for text and another one is for image*/} 
        {/*Left*/}
        <div className='flex-1 py-8 sm:py-10 md:py-16 lg:py-24 lg:pl-5'>
            <div className='text-xl sm:text-2xl md:text-3xl lg:text-5xl font-semibold text-white'>
                <p>Book Appointment</p>
                <p className='mt-4'>With 100+ Trusted Doctors</p>
            </div>
           <button onClick={()=> navigate('/login')} className='bg-white text-sm sm:text-base text-black-600 px-8 py-3 rounded-full mt-6 hover:scale-105 transition-all'>Create Account</button> 
        </div>
        <div className='hidden md:block md:w-1/2 lg:w-[370px] relative'>
        {/*Right*/}
        <img className='w-full lg:w-[110%] absolute bottom-0 right-0 max-w-md' src={assets.appointment_img} alt='image'/>
        </div>
    </motion.div>
  )
}

export default Banner