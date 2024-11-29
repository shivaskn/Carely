import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";
import { assets } from "../../assets/assets";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js"; // Importing necessary components from Chart.js
import { Doughnut } from "react-chartjs-2"; // You can also use other types like Bar, Line, etc.
import { toast } from "react-toastify";
import axios from "axios";

const Dashboard = () => {
  const { adminToken, getDashData, cancelAppointment, dashData ,setDashData} =
    useContext(AdminContext);

    useEffect(() => {
      // Fetch dashboard data from backend
      const fetchDashboardData = async () => {
        try {
          const response = await axios.get("/api/admin/dashboard", {
            headers: { Authorization: `Bearer ${adminToken}` },
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
          labels: ["Doctors", "Appointments", "Patients"],
          datasets: [
            {
              label: "Doctor Dashboard Data",
              data: [
                dashData.doctors || 0, // Default to 0 if not available
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
    if (adminToken) {
      getDashData();
    }
  }, [adminToken]);
  return (
    dashData && (
      <div className="m-7 w-full">
        <div className="flex flex-wrap gap-3">
          <div className="flex itmes-center gap-2  p-4 w-[33%] rounded border-2  cursor-pointer shadow-xl hover:scale-105 transition-all">
            <img className="w-14" src={assets.doctor_icon} alt="image" />
            <div>
              <p className="text-xl font-semibold text-gray-600">
                {dashData.doctors}
              </p>
              <p className="text-black">Doctors</p>
            </div>
          </div>

          <div className="flex itmes-center gap-2 p-4 w-[33%] rounded border-2 shadow-xl cursor-pointer hover:scale-105 transition-all">
            <img className="w-14" src={assets.appointments_icon} alt="image" />
            <div>
              <p className="text-xl font-semibold text-gray-600">
                {dashData.appointments}
              </p>
              <p className="text-black">Appointments</p>
            </div>
          </div>

          <div className="flex itmes-center gap-2  p-4 w-[32.3%] rounded border-2 shadow-xl cursor-pointer hover:scale-105 transition-all">
            <img className="w-14" src={assets.patients_icon} alt="image" />
            <div>
              <p className="text-xl font-semibold text-gray-600">
                {dashData.patients}
              </p>
              <p className="text-black">Patients</p>
            </div>
          </div>
        </div>
        <div className="flex gap-5">
        <div className=" shadow-xl w-[50%] ">
          <div className="flex items-center gap-2.5 px-4 py-4 mt-10 rounded-t border">
            <img src={assets.list_icon} alt="image" />
            <p className="font-semibold">Latest Bookings</p>
          </div>

          <div className="pt-4 border border-t-0">
            {dashData.lastestAppointments.map((item, index) => (
              <div
                className="flex items-center px-6 py-3 gap-3 hover:bg-gray-100"
                key={index}
              >
                <img
                  className="rounded-full w-10"
                  src={item.docData.image}
                  alt=""
                />
                <div className="flex-1 text-sm">
                  <p className="text-gray-800 font-medium">
                    {item.docData.name}
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
                  <img
                    onClick={() => cancelAppointment(item._id)}
                    className="w-10 cursor-pointer"
                    src={assets.cancel_icon}
                    alt="image"
                  />
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
                <h4>Total Doctors: {dashData.doctors}</h4>
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

export default Dashboard;
