import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const MyAppointment = () => {
  const { token ,getDoctorsData } = useContext(AppContext);

  const [appointments, setAppointments] = useState([]);

  const navigate = useNavigate()

  const getUserAppointments = async () => {
    try {
      const { data } = await axios.get(
        "https://carely-23w9.onrender.com/api/user/appointments",
        { headers: {
          Authorization: `Bearer ${token}` 
        } }
      );

      if (data.success) {
        setAppointments(data.appointments.reverse());
        console.log(data.appointments);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        "https://carely-23w9.onrender.com/api/user/cancel-appointment",
        { appointmentId },
        { headers: {
          Authorization: `Bearer ${token}` 
         }}
      );
      if (data.success) {
        toast.success(data.message);
        getUserAppointments();
        getDoctorsData(); // to reset the doctor data
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  

  const pay = (order) => {
     const options = {
      key:import.meta.env.RAZORPAY_KEY_ID,
      amount: order.amount,
      currency:order.currency,
      name:'Appointment Payment',
      description:'Appointment Payment',
      order_id: order.id,
      receipt:order.receipt,
      handler: async (response) => {
        console.log(response)

        try {
          const {data} = await axios.post('https://carely-23w9.onrender.com/api/user/verify',response,{headers:{
            Authorization: `Bearer ${token}` 
          }})
          if(data.success){
            getUserAppointments()
            navigate('/my-appointments')
          }
        } catch (error) {
          console.log(error)
          toast.error(error.message)
        }
      }
     }
     const rzp = new window.Razorpay(options)
     rzp.open()
  }

  const appointmentRazorpay = async (appointmentId) => {
      try {
        const {data} = await axios.post("https://carely-23w9.onrender.com/api/user/payment",{appointmentId},{headers:{
          Authorization: `Bearer ${token}` 
      }})
        if(data.success){
          pay(data.order)
        }
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
  }

  useEffect(() => {
    if (token) {
      getUserAppointments();
    }
  }, [token]);

  return (
    <div className="md:mx-6">
      <p className="pb-3 mt-12 font-semibold text-primary border-b border-black">
        My Appointment
      </p>
      <div>
        {appointments.slice(0, 3).map((item, index) => (
          <div
            className="grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b border-black"
            key={index}
          >
            <div>
              <img
                className="w-32 bg-primary shadow-xl"
                src={item.docData.image}
                alt="image"
              />
            </div>
            <div className="flex-1 text-sm text-black">
              <p className="text-primary font-semibold">{item.docData.name}</p>
              <p>{item.docData.speciality}</p>
              <p className="text-black font-semibold mt-1">Address:</p>
              <p className="text-xs">{item.docData.address.line1}</p>
              <p className="text-xs">{item.docData.address.line2}</p>
              <p className="text-xs mt-1">
                <span className="text-sm text-black font-semibold">
                  Date & Time:
                </span>{" "}
                {item.slotDate} | {item.slotTime}
              </p>
            </div>
            <div></div>
           <div className="flex flex-col gap-2 justify-center">
             {
              !item.cancelled && item.payment && !item.isCompleted && <button className="sm:min-w-48 py-2 border rounded text-white cursor-text bg-green-500">Paid</button>
             }
             {!item.cancelled && !item.payment && !item.isCompleted &&  <button onClick={()=>appointmentRazorpay(item._id)} className="text-sm text-black text-center sm:min-w-48 py-2 border border-black hover:border-none  hover:bg-primary hover:text-white transition-all duration-300 rounded">
                Pay Online
              </button> }  
             {!item.cancelled && !item.isCompleted && <button
                onClick={() => cancelAppointment(item._id)}
                className="text-sm text-black text-center sm:min-w-48 py-2 border  hover:bg-red-600  hover:text-white transition-all duration-300 rounded border-black hover:border-none "
              >
                Cancel Appointment
              </button> } 
              {item.cancelled && !item.isCompleted &&  <button className="sm:min-w-48 py-2 px-2 border border-black  rounded text-black cursor-text hover:border-none  hover:bg-red-600 hover:text-white transition-all duration-300">Appointment Cancelled</button>}
              {item.isCompleted && <button className="sm:min-w-48 py-2 border border-black  hover:border-none rounded text-black   hover:bg-green-500 hover:text-white cursor-text transition-all duration-300">Completed</button> }
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyAppointment;
