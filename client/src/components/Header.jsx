import React from "react";
import {motion} from 'framer-motion'
import { assets } from "../assets/assets";

const Header = () => {
  return (

    <div className="flex flex-col md:flex-row flex-wrap bg-primary px-6 md:px-10 lg:px-20">    {/* This line only gives a background color(div) if you don't know this please go through tailwind documentation*/}

      {/*In this we have one parent container and two child container for left side and right side*/}

      {/*Left*  left side section*/}
      <motion.div 
       initial={{x:-100,opacity:0}}
      //  whileInView={{x: 0, opacity: 1}} 
      animate={{x: 0, opacity: 1}} 
       transition={{delay:0.2, x:{type:"spring", stiffness:60}, opacity:{duration:1}, ease:"easeIn", duration:1}}
      className="md:w-1/2 flex flex-col items-start justify-center gap-4 py-10 m-auto md:py-[10vw] md:mb-[-30px]">
        <p className="text-3xl md:text-4xl lg:text-5xl text-white font-semibold leading-tight md:leading-tight lg:leading-tight ">
          Book Appointment
          <br />
        </p>
        <div className="flex flex-col md:flex-row items-center gap-3 text-white text-sm font-light">
          <img className="w-28" src={assets.group_profiles} alt="profile"/>
          <p>
            Simply browse through our extensive list of trusted doctors,
            <br className="hidden sm:block" /> schedule your appointment hassie-free.
          </p>
        </div>
        <a href="/doctors" className="flex items-center gap-2  bg-white px-8 py-3 rounded-full text-gray-600 text-sm m-auto md:m-0 hover:scale-105 translate-all duration-300">
          Book appointment <img className="w-3" src={assets.arrow_icon} alt="book now" />
        </a>
      </motion.div>
      
      {/* Right*  right side section*/}
      <div className="md:w-[45%] relative">
        <motion.img 
        initial={{x:-100,opacity:0}}
            // whileInView={{x: 0, opacity: 1}} 
      animate={{x: 0, opacity: 1}} 
        transition={{delay:0.2, x:{type:"spring", stiffness:60}, opacity:{duration:1}, ease:"easeIn", duration:1}}
        className="w-full md:absolute bottom-0 h-auto rounded-lg" src={assets.header_img} alt="doctor"  />
      </div>
    </div>
  ); 
};

export default Header;
