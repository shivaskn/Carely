import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import RelatedDoc from "../components/RelatedDoc";
import { toast } from "react-toastify";
import axios from "axios";
import {motion} from 'framer-motion'

const Appointment = () => {
  const { docId } = useParams();
  const { doctors, currency, token, getDoctorsData } = useContext(AppContext);
  const week = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  {
    /*This state stores doctors information*/
  }

  {
    /* doctorinfo: Stores detailed information about the selected doctor.
      doctorSlots: An array that holds available time slots for the doctor.
      slotIndex and slotTime: Additional states likely used for managing selected slot details.
  */
  }

  const [doctorinfo, setDoctorinfo] = useState(null);

  {
    /*This state stores doctors slots*/
    /*
    doctorinfo: Stores information about the selected doctor.
    doctorSlots: Stores the available time slots for the doctor.
    slotIndex: Index of the selected day.
    slotTime: Selected time slot. 
    */
  }
  const [doctorSlots, setDoctorSlots] = useState([]);

  const [slotIndex, setSlotIndex] = useState(0);

  const [slotTime, setSlotTime] = useState("");

  const navigate = useNavigate();

  const FetchDocinfo = async () => {
    {
      /*A function to find the specific doctor’s information*/
    }
    {
      /* FetchDocinfo searches for the doctor in doctors whose _id matches docId.
        It sets doctorinfo to this doctor's data, allowing it to be displayed or used for booking purposes.*/
    }

    const docInfo = doctors.find((doc) => doc._id === docId);
    setDoctorinfo(docInfo);
  };

  const getAvailableStols = async () => {
    setDoctorSlots([]);

    // getting current date for booking
    //This function resets doctorSlots and then iterates through the next 7 days (starting from today) to create available time slots.

    let today = new Date();
    for (let i = 0; i < 7; i++) {
      // getting date with index

      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      // setting endtime of the date with index, Sets the end time (endtime) to 9 PM.

      let endtime = new Date();
      endtime.setDate(today.getDate() + i);
      endtime.setHours(21, 0, 0, 0);

      // setting hours, Checks if it's today; if so, it starts counting slots based on current time : Otherwise, it starts from 10 AM.

      if (today.getDate() === currentDate.getDate()) {
        currentDate.setHours(
          currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10
        );
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
      } else {
        currentDate.setHours(10);
        currentDate.setMinutes(0);
      }

      // let timeSlots = []; initializes an empty array to store 30-minute slots.
      let timeSlots = [];

      // The while loop generates 30-minute intervals up until endtime
      while (currentDate < endtime) {
        /*Converts the currentDate time into a readable format */
        let formattedTime = currentDate.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });

        // whenever our current date change we gonna check. if doctor has booked any slot on this date or not

        let day = currentDate.getDate();
        let month = currentDate.getMonth() + 1;
        let year = currentDate.getFullYear();

        const slotDate = day + "-" + month + "-" + year;
        const slotTime = formattedTime;

        /* Checks if the formattedTime exists in the booked slots for this slotDate. */
        const isSlotAvailable =
          doctorinfo.slotsBooked[slotDate] &&
          doctorinfo.slotsBooked[slotDate].includes(slotTime)
            ? false
            : true;

        if (isSlotAvailable) {
          // Add slot to array
          timeSlots.push({
            datetime: new Date(currentDate),
            time: formattedTime,
          });
        }

        //  Increment current time by 30 minutes
        // Each time slot is 30 minutes, so the currentDate is incremented by 30 minutes after each slot is added to timeSlots.

        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }

      // The final slots for each day are stored in doctorSlots
      setDoctorSlots((previous) => [...previous, timeSlots]);
    }
  };

  const bookAnAppointment = async () => {
    if (!token) {
      toast.warn("Login to book appointment");
      return navigate("/login");
    }

    try {
      const date = doctorSlots[slotIndex][0].datetime;

      let day = date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();

      const slotDate = day + "-" + month + "-" + year;
      console.log(slotDate);

      const { data } = await axios.post(
        "https://carely-23w9.onrender.com/api/user/book-appointment",
        { docId, slotDate, slotTime },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (data.success) {
        toast.success(data.message);
        getDoctorsData();
        navigate("/my-appointments");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    FetchDocinfo();
  }, [doctors, docId]);

  useEffect(() => {
    getAvailableStols();
  }, [doctorinfo]);

  useEffect(() => {
    console.log(doctorSlots);
  }, [doctorSlots]);

  return (
    doctorinfo && (
      <div className="mx-6 mt-10">
        {/**/}
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
        className="flex flex-col sm:flex-row gap-4">
          <div>
            <img
              className="bg-primary w-full sm:max-w-72 rounded-lg shadow-2xl"
              src={doctorinfo.image}
              alt="image "
            />
          </div>

          <div className="flex-1 border border-gray-400 rounded-lg p-8 py-7  mx-2 sm:mx-0 mt-[-80px] sm:mt-0 shadow-2xl">
            {/* Doctor intro page*/}
            <p className="flex items-center gap-2 text-2xl font-medium text-gray-900">
              {doctorinfo.name}{" "}
              <img className="w-5" src={assets.verified_icon} />
            </p>
            <div className="flex items-center gap-2 text-sm mt-1 text-gray-800 ">
              <p>
                {doctorinfo.degree} - {doctorinfo.speciality}
              </p>
              <button className="py-0.5 px-2 border border-black text-xs rounded-full">
                {doctorinfo.experience}
              </button>
            </div>
            {/* About page and fees*/}
            <div>
              <p className="flex items-center gap-1 text-sm font-medium text-black mt-3">
                About <img src={assets.info_icon} alt="image" />
              </p>
              <p className="text-sm text-gray-800 max-w-[700px] mt-3">
                {doctorinfo.about}
              </p>
            </div>
            <p className="text-black font-medium mt-4">
              Appointment fees:{" "}
              <span>
                {currency} {doctorinfo.fees}
              </span>
            </p>
          </div>
        </motion.div>

        {/*Booking Slots*/}

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
        className="sm:ml-72 sm:pl-4 mt-16 font-medium text-gray-700 ">
          <p>Booking Slots</p>
          <div className="flex gap-3 items-center w-full overflow-x-scroll mt-4 ">
            {doctorSlots.length &&
              doctorSlots.map((item, index) => (
                <div
                  onClick={() => setSlotIndex(index)}
                  className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${
                    slotIndex === index
                      ? "bg-primary text-white transition-all duration-300"
                      : "border border-black"
                  }`}
                  key={index}
                >
                  {/* uses this day index to look up the day’s name from a week */}
                  <p>{item[0] && week[item[0].datetime.getDay()]}</p>
                  {/* Displays the day of the week (like Monday) and day of the month (like 15) for the first slot of that day.*/}
                  <p>{item[0] && item[0].datetime.getDate()}</p>
                </div>
              ))}
          </div>

          <div className="flex items-center gap-3 w-full overflow-x-scroll mt-4">
            {doctorSlots.length &&
              doctorSlots[slotIndex].map((item, index) => (
                <p
                  onClick={() => setSlotTime(item.time)}
                  className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${
                    item.time === slotTime
                      ? "bg-primary text-white transition-all duration-300"
                      : "border border-black"
                  }`}
                  key={index}
                >
                  {item.time.toLowerCase()}
                </p>
              ))}
          </div>
          <button
            onClick={bookAnAppointment}
            className="bg-primary text-white text-sm font-semibold px-14 py-3 rounded-full my-6  hover:bg-primary hover:text-white hover:scale-105  transition-all duration-300 shadow-xl"
          >
            Book An Appointment
          </button>
        </motion.div>
        {/* Related Doctor*/}
        <RelatedDoc docId={docId} speciality={doctorinfo.speciality} />
      </div>
    )
  );
};

export default Appointment;
