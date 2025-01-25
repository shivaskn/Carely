import { createContext, useState } from "react";
import {useParams} from 'react-router-dom'

import axios from "axios";
import { toast } from "react-toastify";

export const DoctorContext = createContext();

const DoctorContextProvider = (props) => {

  const [dToken, setDToken] = useState(localStorage.getItem("dToken") ? localStorage.getItem("dToken") : "");
  const [appointments,setAppointments] = useState([])
  const [dashData, setDashData] = useState([])
  const [profileData,setProfileData] = useState(false)


  const getAppointments = async()=> {
    try {
      const {data} = await axios.get(`https://carely-k6jk.onrender.com/api/doctor/appointments`, {headers:{
        Authorization: `Bearer ${dToken}` 
      }})
       if(data.success){
        setAppointments(data.appointments)
       }else {
        toast.error(data.message)
       }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }
 
  const completeAppointment = async (appointmentId) => {
    try {
      const {data} = await axios.post('https://carely-k6jk.onrender.com/api/doctor/complete-appointment', {appointmentId}, {headers:{
        Authorization: `Bearer ${dToken}` 
      }})
      if (data.success){
        toast.success(data.message)
        getAppointments()
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  const cancelAppointment = async (appointmentId) => {
    try {
      const {data} = await axios.post('https://carely-k6jk.onrender.com/api/doctor/cancel-appointment', {appointmentId}, {headers:{
        Authorization: `Bearer ${dToken}` 
      }})
      if (data.success){
        toast.success(data.message)
        getAppointments()
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  const getDashData = async () => {
    try {
      const {data} = await axios.get(`https://carely-k6jk.onrender.com/api/doctor/dashboard`,{headers:{
        Authorization: `Bearer ${dToken}` 
      }})
      if(data.success){
        setDashData(data.dashData)
        console.log(data.dashData)
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  const getProfileData = async () => {
    try {
      const {data} = await axios.get(`https://carely-23w9.onrender.com/api/doctor/profile`,{headers:{
        Authorization: `Bearer ${dToken}` 
      }})
      if(data.success){
        setProfileData(data.profileData)
        console.log(data.profileData)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  const value = {
    dToken,
    setDToken,
    appointments,setAppointments,
    getAppointments,
    completeAppointment,
    cancelAppointment,
    dashData,setDashData,
    getDashData,
    profileData,setProfileData,
    getProfileData
  };

  return (
    <DoctorContext.Provider value={value}>
      {props.children}
    </DoctorContext.Provider>
  );
};

export default DoctorContextProvider;
