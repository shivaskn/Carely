import React from 'react'
import {assets} from '../assets/assets'
const About = () => {
  return (
    <div>
      <div className='text-center text-2xl pt-10 text-black font-medium'>
        <p>ABOUT <span className='text-primary font-semibold'>CARELY</span></p>
      </div>

      <div className='my-10 flex flex-col md:flex-row gap-12 justify-center'>
        <img className='w-full md:max-w-[360px] rounded-xl' src={assets.about_image} alt='image'/>
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-sm  text-black'>
          <p>Welcome to Carely, your trusted partner in managing your healthcare needs conveniently and efficiently. At Carely, we understand the challenges individuals face when it comes to scheduling doctor appointments and managing their health records.</p>
          <p>Carely is committed to excellence in healthcare technology. We continuously strive to enhance our platform, integrating the latest advancements to improve user experience and deliver superior service. Whether you're booking your first appointment or managing ongoing care, Carely is here to support you every step of the way.</p>
          <b>Our Vision</b>
          <p>Our vision at Carely is to create a seamless healthcare experience for every user. We aim to bridge the gap between patients and healthcare providers, making it easier for you to access the care you need, when you need it.</p>
        </div>
      </div>

      <div className='flex flex-col justify-center md:flex md:flex-row items-center gap-4 py-5 mb-5 md:py-16 text-gray-800 w-full md:mt-3' id='speciality'> {/* Inside this div i have stored two elements which is hi and p tag and i have styled using tailwind. this speciality menu (categories) In this user can select the categories*/}
          <div className="text-center md:text-start md:relative left-[9%] ">
            <h1 className='text-2xl  font-medium '>Make video call and <span className='text-primary font-medium'>clarify your doubts</span> </h1>
          <p className='md:w-[80%] mt-3 text-center md:text-start text-sm'>Simply browse through our extensive list of trusted doctors, schedule your appointment hassle-free.</p>
          <img src={assets.apps} alt="Apps" className="md:w-[30%] md:relative right-3" />
            </div>
               <img src={assets.video} className="w-[60%] ms-10 md:ms-0 md:relative right-[5%] md:w-[25%]"/>
          </div>

      <div className='text-2xl my-4 mb-6 text-center text-black font-medium'>
       <p className='font-semibold'>WHY TO CHOOSE <span className='text-primary font-semibold'>CARELY</span></p>
      </div>

      <div className='flex flex-col md:flex-row mb-20 border border-stone-400 md:mx-10 shadow-xl rounded-xl '>

        <div className=' px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-6 text-[15px] bg-primary text-white  transition-all duration-300'>
          <b className='text-center text-xl'>EFFICIENCY</b>
          <img src={assets.efficacy} className='w-20 self-center'/>
          <p className='text-center '>Streamlined appointment scheduling that fits into your busy lifestyle.</p>
        </div>

        <div className=' px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-6 text-[15px] bg-primary text-white  transition-all duration-300'>
        <b className='text-center text-xl '>CONVENIENCE</b>
        <img src={assets.convenience} className='w-20 self-center'/>
        <p className='text-center'>Access to a network of trusted healthcare professionals in your area.</p>
        </div>

        <div className=' px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-6 text-[15px] bg-primary text-white transition-all duration-300'>
        <b className='text-center text-xl '>PERSONALIZATION:</b>
        <img src={assets.personalization} className='w-20 self-center'/>
        <p className='text-center'>Tailored recommendations and reminders to help you stay on top of your health.</p>
        </div>

      </div>
    </div>
  )
}

export default About