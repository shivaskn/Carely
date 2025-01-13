import React, { useContext, useEffect } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { assets } from "../../assets/assets.js";
import { AppContext } from "../../context/AppContext.jsx";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js"; // Importing necessary components from Chart.js
import { Doughnut } from "react-chartjs-2"; // You can also use other types like Bar, Line, etc.
import { toast } from "react-toastify";
import axios from "axios";

ChartJS.register(ArcElement, Tooltip, Legend);

const DoctorDashboard = () => {
  const {
    dashData,
    setDashData,
    getDashData,
    dToken,
    completeAppointment,
    cancelAppointment,
  } = useContext(DoctorContext);
  const { currency } = useContext(AppContext);

  useEffect(() => {
    // Fetch dashboard data from backend
    const fetchDashboardData = async () => {
      try {
        const response = await axios.get("https://carely-k6jk.onrender.com/api/doctor/dashboard", {
          headers: { Authorization: `Bearer ${dToken}` },
        });
        setDashData(response.data.dashData);
      } catch (error) {
        toast.error("Error fetching dashboard data:", error);
      }
    };

    fetchDashboardData();
  }, []);

  const chartData = dashData
    ? {
        labels: ["Earnings", "Appointments", "Patients"],
        datasets: [
          {
            label: "Doctor Dashboard Data",
            data: [
              dashData.earnings || 0, // Default to 0 if not available
              dashData.appointments || 0,
              dashData.patients || 0,
            ],
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(255, 159, 64, 0.2)",
              "rgba(54, 162, 235, 0.2)",
            ],
            borderColor: [
              "rgb(255, 99, 132)",
              "rgb(255, 159, 64)",
              "rgb(54, 162, 235)",
            ],
            borderWidth: 1,
          },
        ],
      }
    : {};

  useEffect(() => {
    if (dToken) {
      getDashData();
    }
  }, [dToken]);

  return (
    dashData && (
      <div className="m-5 w-full">
        <div className="flex flex-wrap gap-3">
          <div className="flex itmes-center gap-2 w-[20%] shadow-xl p-4  rounded border-2 cursor-pointer hover:scale-105 transition-all">
            <img className="w-14" src={assets.earning_icon} alt="image" />
            <div>
              <p className="text-xl font-semibold text-gray-600">
                {currency} {dashData.earnings}
              </p>
              <p className="text-black">Earnings</p>
            </div>
          </div>

          <div className="flex itmes-center gap-2  w-[20%] shadow-xl p-4 min-w-52 rounded border-2  cursor-pointer hover:scale-105 transition-all">
            <img className="w-14" src={assets.patients_icon} alt="image" />
            <div>
              <p className="text-xl font-semibold text-gray-600">
                {dashData.patients}
              </p>
              <p className="text-black">Appointments</p>
            </div>
          </div>

          <div className="flex itmes-center gap-2 w-[20%] shadow-xl p-4 min-w-52 rounded border-2  cursor-pointer hover:scale-105 transition-all">
            <img className="w-14" src={assets.patients_icon} alt="image" />
            <div>
              <p className="text-xl font-semibold text-gray-600">
                {dashData.patients}
              </p>
              <p className="text-black">Patients</p>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row gap-10">
        <div className="w-[50%] shadow-xl">
          <div className="flex items-center gap-2.5 px-4 py-4 mt-10 rounded-t border">
            <img src={assets.list_icon} alt="image" />
            <p className="font-semibold">Latest Bookings</p>
          </div>

          <div className="pt-4 border border-t-0">
            {dashData.latestAppointments.map((item, index) => (
              <div
                className="flex items-center px-6 py-3 gap-3 hover:bg-gray-100"
                key={index}
              >
                <img
                  className="rounded-full w-10"
                  src={item.userData.image}
                  alt=""
                />
                <div className="flex-1 text-sm">
                  <p className="text-gray-800 font-medium">
                    {item.userData.name}
                  </p>
                  <p className="text-gray-600">{item.slotDate}</p>
                </div>
                {item.cancelled ? (
                  <p className="text-red-400 text-xs font-medium">Cancelled</p>
                ) : item.isCompleted ? (
                  <p className="text-green-500 text-xs font-medium">
                    Completed
                  </p>
                ) : (
                  <div className="flex">
                    <img
                      onClick={() => cancelAppointment(item._id)}
                      className="w-10 cursor-pointer"
                      src={assets.cancel_icon}
                      alt="image"
                    />
                    <img
                      onClick={() => completeAppointment(item._id)}
                      className="w-10 cursor-pointer"
                      src={assets.tick_icon}
                      alt="image"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
          
        </div>
        <div className=" mt-10 border-2 p-5 w-[40%] shadow-xl">
          <h2>Doctor Dashboard</h2>
          {dashData ? (
            <>
              <Doughnut data={chartData} className="mt-5"/>
              {/* You can display other dashboard data here as well */}
              <div className="mt-5">
                <h4>Total Earnings: {dashData.earnings}</h4>
                <h4>Total Appointments: {dashData.appointments}</h4>
                <h4>Total Patients: {dashData.patients}</h4>
              </div>
            </>
          ) : (
            <p>Loading dashboard data...</p>
          )}
        </div>
       
      </div>
        </div>

       
    )
  );
};

export default DoctorDashboard;
