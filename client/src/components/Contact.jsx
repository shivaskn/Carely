import React from 'react'
import { assets } from '../assets/assets'

const ContactBar = () => {
  return (
    <div className='hidden md:flex bg-primary py-2 text-white'>
     <div className='flex w-full md:gap-2 lg:gap-6  ms-3 py-1'>
        <img src={assets.flag1} className='w-8' />
        <p className='text-sm mt-[2px]'>+91 7368594871</p>
        <img src={assets.flag2} className='w-8' />
        <p className='text-sm mt-[2px]'>+6583650238</p>
        <img src={assets.flag3} className='w-8' />
        <p className='text-sm mt-[2px]'>+971-565-554-826</p>
     </div>
     <div className='mx-3 flex justify-end gap-3 '>
        <img src={assets.sponser2} className='w-28' />
     </div>
    </div>
  )
}

export default ContactBar