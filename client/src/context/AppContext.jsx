import { createContext, useEffect, useState } from "react";
// import { doctors } from "../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const currency = "₹";
  const [doctors, setDoctors] = useState([]);
  const [token, setToken] = useState(
    localStorage.getItem("token") ? localStorage.getItem("token") : false
  );
  const [userData, setUserData] = useState(false)


  const getDoctorsData = async () => {
    try {
      const { data } = await axios.get("https://carely-23w9.onrender.com/api/doctor/list");
        setDoctors(data.doctors);
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };


  const loadUserProfileData = async () => {
    try {
      const {data} = await axios.get(
        'https://carely-23w9.onrender.com/api/user/get-profile',
        {headers:{
          Authorization: `Bearer ${token}` 
        }}
      );
      if (data.success) {
        setUserData(data.userData);
        console.log(data.userData)
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };


  const value = {
    doctors,getDoctorsData,
    currency,
    token,
    setToken,
    userData,setUserData,
    loadUserProfileData,
  };

  useEffect(() => {
    getDoctorsData();
  }, []);

  useEffect(() =>{
   if(token){
    loadUserProfileData()
   }else{
    setUserData(false)
   }
  },[token])

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default AppContextProvider;
