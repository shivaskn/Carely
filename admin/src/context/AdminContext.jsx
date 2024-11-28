import { createContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const AdminContext = createContext();

const AdminContextProvider = (props) => {
  const [adminToken, setAdminToken] = useState(
    localStorage.getItem("adminToken") ? localStorage.getItem("adminToken") : ""
  );
  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [dashData,setDashData] = useState(false)

  const getAllDoctors = async () => {
    // If the backend requires certain parameters in the request body (like adminToken) for authentication or role-based authorization, a POST request may be used. GET requests don't support request bodies in HTTP, so using POST is a way to securely include sensitive or structured data.
    try {
      const { data } = await axios.post(
        "http://localhost:8000/api/admin/all-doctors",
        {},
        { headers:{
          Authorization: `Bearer ${adminToken}` 
        } }
      );
      if (data.success) {
        setDoctors(data.doctors);
        console.log(data.doctors);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const changeAvailability = async (docId) => {
    try {
      const { data } = await axios.post(
        "http://localhost:8000/api/admin/change-availability",
        { docId },
        { headers: {
          Authorization: `Bearer ${adminToken}` 
        }  }
      );
      if (data.success) {
        toast.success(data.message);
        getAllDoctors();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log()
      toast.error(error.message);
    }
  };

  const getAllAppointments = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8000/api/admin/appointments",
        { headers: {
          Authorization: `Bearer ${adminToken}` 
        } }
      );
      if (data.success) {
        setAppointments(data.appointments);
        console.log(data.appointments);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const cancelAppointment = async (appointmentId) => {
       try {
        const {data} = await axios.post( "http://localhost:8000/api/admin/cancel-appointment",{appointmentId},{headers:{
          Authorization: `Bearer ${adminToken}` 
        }})
        if(data.success){
          toast.success(data.message)
          getAllAppointments()
        }else{
          toast.error(data.message)
        }
       } catch (error) {
        toast.error(error.message);
       }
  }

  const getDashData = async () => {
    try {
      const {data} = await axios.get("http://localhost:8000/api/admin/dashboard",{headers:{
        Authorization: `Bearer ${adminToken}` 
      }})
      if(data.success){
        setDashData(data.dashData)
        console.log(data.dashData)
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  const value = {
    adminToken,
    setAdminToken,
    doctors,
    getAllDoctors,
    changeAvailability,
    appointments,
    setAppointments,
    getAllAppointments,
    cancelAppointment,
   dashData,setDashData,
    getDashData
  };

  return (
    <AdminContext.Provider value={value}>
      {props.children}
    </AdminContext.Provider>
  );
};

export default AdminContextProvider;
