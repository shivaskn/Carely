import React, { useContext, useEffect, useState } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { AppContext } from "../../context/AppContext";
import axios from 'axios'
import { toast } from "react-toastify";


const DoctorProfile = () => {
  const { dToken, profileData, setProfileData, getProfileData } =
    useContext(DoctorContext);
  const { currency } = useContext(AppContext);
  const [isEdit, setIsEdit] = useState(false)

  const updateProfile = async () => {
    try {
      const updateData = {
        address: profileData.address,
        fees: profileData.fees,
        available:profileData.available
      }

      const {data} = await axios.post('http://localhost:8000/api/doctor/update-profile',updateData,{headers:{
        Authorization: `Bearer ${dToken}` 
      }})
      if(data.success){
        toast.success(data.message)
        setIsEdit(false)
        getProfileData()
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
      console.log(error)
    }
  }
 
  useEffect(() => {
    if (dToken) {
      getProfileData();
    }
  }, [dToken]);

  return (
    profileData && (
      <div className="w-full">
        <div className="flex flex-col md:flex-row gap-4 m-5 ">
          <div className="mt-5">
            <img
              className="bg-primary/80 rounded-lg shadow-xl"
              src={profileData.image}
              alt=""
            />
          </div>

          <div className=" border mt-5 shadow-xl rounded-lg p-8 py-3 ">
            {/*Doc info : name,degree,experience*/}
            <p className="flex items-center gap-2 text-3xl font-medium text-primary">
              {profileData.name}
            </p>
            <div>
              <p className="flex items-center gap-2 mt-1 text-gray-600">
                {profileData.degree} - {profileData.speciality}
              </p>
              <button className="py-0.5 px-2 border border-primary text-xs rounded-full">
                {profileData.experience}
              </button>
            </div>

            {/*Doc about*/}
            <div>
              <p className="flex items-center gap-1 text-sm font-medium text-neutral-800 mt-3">
                About:
              </p>
              <p className="text-sm text-gray-600 max-w-[700px] mt-1">
                {profileData.about}
              </p>
            </div>
            <p className="text-gray-600 font-medium mt-4">
              Appointment fee:
              <span className="text-gray-800">
                {currency} {isEdit ? <input type="number" onChange={(e)=>setProfileData(prev => ({...prev, fees: e.target.value}))} value={profileData.fees}/> : profileData.fees}
              </span>
            </p>

            <div className="flex gap-2 py-2">
              <p>Address:</p>
              <p className="text-sm">
                {isEdit? <input type="text" onChange={(e)=>setProfileData(prev=>({...prev,address:{...prev.address,line1:e.target.value}}))} value={profileData.address.line1}/>:profileData.address.line1}
                <br />
                {isEdit ? <input type="text" onChange={(e)=>setProfileData(prev=>({...prev,address:{...prev.address,line2:e.target.value}}))} value={profileData.address.line2}/> :profileData.address.line2}
              </p>
            </div>

            <div className="flex gap-1 pt-2">
              <input onChange={()=>isEdit && setProfileData(prev=>({...prev,available: !prev.available}))} checked={profileData.available} type="checkbox" />
              <label htmlFor="">Available</label>
            </div>
            {
              isEdit
              ?<button onClick={updateProfile} className="px-4 py-1 border border-primary text-sm rounded-full mt-5 hover:bg-primary hover:text-white transition-all duration-300 ">Save</button>
              :<button onClick={()=>setIsEdit(true)} className="px-4 py-1 border border-primary text-sm rounded-full mt-5 hover:bg-primary hover:text-white transition-all duration-300 ">Edit</button>
            }
          </div>
        </div>
      </div>
    )
  );
};

export default DoctorProfile;
