import React, { useState,useContext } from 'react'
import { AppContext } from '../context/AppContext'
import {assets} from '../assets/assets'
import { toast } from 'react-toastify'
import axios from 'axios';
import {motion} from 'framer-motion'

const MyProfile = () => {

  {/*Initial state for users data*/}

   const {userData , setUserData , token ,loadUserProfileData}= useContext(AppContext)

  {/* Purpose of this state is that is user can edit their profile whenever they want*/}
  const [isEdit,setIsEdit] = useState(false);
  const [image,setImage] = useState(false);

  const updateUserProfileData = async () => {
       try {
        const formData = new FormData()

        formData.append('name',userData.name)
        formData.append('phone',userData.phone)
        formData.append('address',JSON.stringify(userData.address))
        formData.append('gender',userData.gender)
        formData.append('dob',userData.dob)
        image && formData.append('image',image)

        const {data} = await axios.post('http://localhost:8000/api/user/update-profile',formData,{headers:{
          Authorization: `Bearer ${token}`
       }})
        if(data.success){
          toast.success(data.message)
          await loadUserProfileData()
          setIsEdit(false)
          setImage(false)
        } else {
          toast.error(data.message)
        }
       } catch (error) {
        console.log(error);
      toast.error(error.message);
       }
  }

  return userData && (
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
    className=' flex flex-col lg:flex-row justify-center items-center gap-2 text-sm relative top-14'>
    
      {
        isEdit
        ? <label htmlFor='image'>
          <div className='inline-block relative cursor-pointer'>
            <img className='w-36 rounded opacity-75' src={image ? URL.createObjectURL(image) : userData.image} alt="" />
            <img className='w-10 absolute bottom-12 right-12' src={image ? '' : assets.upload_icon } alt="" />
          </div>
          <input onChange={(e) => setImage(e.target.files[0])} type="file" id='image' hidden/>
        </label>
        : <img className="rounded shadow-2xl w-[50%] md:w-[25%]" src={userData.image} alt="image" />

      }
     
      {/* This conditional rendering for Username (User can change the name)*/}
          
    
    
      <hr className='bg-zinc-400 h-[1px]'/>
      

      <div className='p-3 md:p-10 shadow-2xl '>
      {
        isEdit
        ? <input className='bg-gray-300 text-2xl ps-2 text-center relative left-[10%] md:relative md:left-[2%] font-medium max-w-60 mt-4' type='text' value={userData.name} onChange={e => setUserData(previousData => ({...previousData, name:e.target.value}))} />
        : <p className='font-medium text-3xl text-center text-primary'>{userData.name}</p>
      }
        <div>
        <p className='text-black underline mt-3 text-center pb-2'>CONTACT INFORMATION</p>
        <div className='grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 ps-[14%]'>
          <p clabg-whitessName='font-medium'>Email:</p>
          <p className='text-primary'>{userData.email}</p>
          <p className='font-medium'>Phone:</p>   

      {/* This conditional rendering for Phonenumber (User can change the phonenumber)*/}     
      {
        isEdit
        ? <input type='text' className='w-[50%] ps-1' value={userData.phone} onChange={e => setUserData(previousData => ({...previousData, phone:e.target.value}))} />
       : <p className='text-primary'>{userData.phone}</p>
      }

          <p className='font-medium'>Address:</p>
          {/* This conditional rendering for Address(User can change the address)*/}
          {
            isEdit
            ?<p>
              <input type="text" className='me-2 ps-1 ' value={userData.address.line1} onChange={(e) => setUserData((previousData)=> ({...previousData,address:{...previousData.address, line1: e.target.value}}))} />
              <input type="text" className='ps-1 mt-1.5' value={userData.address.line2} onChange={(e) => setUserData((previousData)=> ({...previousData,address:{...previousData.address, line2: e.target.value}}))} />
            </p>
            :<p className='text-primary'>
              {userData.address.line1}
              <br/>
              {userData.address.line2}
            </p>
          }
        </div>
      </div>
      <div>
        <p className='text-black underline mt-3 text-center pt-2 pb-2'>BASIC INFORMATION</p>
        <div className='grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 ps-[14%] '>
          <p className='font-medium'>Gender:</p>
          {/* This conditional rendering for gender by using select method(options) (User can change the gender)*/}
          {
            isEdit
            ? <select className='max-w-20 ' onChange={(e) => setUserData(previousData => ({...previousData, gender: e.target.value}))} value={userData.gender}>
              <option>Male</option>
              <option>Female</option>
            </select>
            : <p className='text-primary flex ps-2'>{userData.gender}</p>
          }
          
          <p className='font-medium'>Birthday:</p>
          {/* This conditional rendering for Date (User can change the their date of birth)*/}
          {
            isEdit 
            ? <input type='date' className='ps-1' onChange={(e) => setUserData(previousData => ({...previousData, dob: e.target.value}))} value={userData.dob}/>
            : <p className='text-primary flex  ps-2'>{userData.dob}</p>
          }
        </div>
      </div>

      <div className='mt-10 text-center'>
        {/*isEdit ?  Epa user vanthu edit section ulla iruka na avanuku save information nu oru buttom kammikum ethuku na avan edit pannathuku aparam save panna  :  Intha condition ethuku na epa user vanthu normal ha avan profile ha pakkura na avanuku vanthu kila edit button kammikum suppose avan edit button click panna avanuku edit profile varum*/}
        {
          isEdit
          ? <button className='border border-primary px-8 py-2 rounded-full hover:bg-primary hover:text-white transition-all duration-300' onClick={updateUserProfileData}>Save information</button>
          : <button className='border border-primary px-8 py-2 rounded-full hover:bg-primary hover:text-white transition-all duration-300' onClick={()=>setIsEdit(true)}>Edit</button>
        }
      </div>
      </div>
    </motion.div>
  )
}

export default MyProfile