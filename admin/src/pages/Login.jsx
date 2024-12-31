import React, { useContext, useState } from "react";
import {useNavigate} from 'react-router-dom'
import { AdminContext } from "../context/AdminContext";
import {DoctorContext} from "../context/DoctorContext"
import axios from 'axios';
import { toast } from "react-toastify";

const Login = () => {
  {
    /*Initial state of the form after submitting the input section will be empty*/
  }
  
  const navigate = useNavigate()

  const initial = {
    email: "",
    password: "",
  };
  const [input, setInput] = useState(initial);
  const [state, setState] = useState("Admin");

  const { setAdminToken  } = useContext(AdminContext);
  const { setDToken, dToken} = useContext(DoctorContext)

  {
    /* This section works when the form has been submitted*/
  }

  const handelSubmit = async (event) => {
    event.preventDefault();

    try {
        if(state === 'Admin'){
           
        {/*When you make a request with axios.post, it returns a response object that contains several properties, like data, status, statusText, headers. so response object la vanthu data propety nu onnu iruku athula tha payload iruku (namma token) so na direct ha destructing panni vachu iruka {data} va ethuku na line of codes ha kammi panna,*/}
        const {data} = await axios.post('http://localhost:8000/api/admin/login',input)
        if(data.success){
            {/* So inga vanthu nammaloda token ha localstrong la save or set pannurom*/}
            localStorage.setItem('adminToken',data.token)
            navigate('/admin-dashboard')
            setAdminToken(data.token)
        } else {
            toast.error(data.message)
        }

        } else {
            const {data} = await axios.post("http://localhost:8000/api/doctor/login", input)
            if(data.success){
              {/* So inga vanthu nammaloda token ha localstrong la save or set pannurom*/}
              localStorage.setItem('dToken',data.token)
              navigate('/doctor-dashboard')
              setDToken(data.token)
              console.log(data.token)
            } else {
               toast.error(data.message)
            }
        }
    } catch (error) {
        console.log(error.message)
    }
  };

  {
    /*This section is use to update the input section while typing it will automatically renders every single letters*/
  }

  const handelChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInput((previousStates) => {
      return { ...previousStates, [name]: value };
    });
  };

  return (
    <form className="min-h-[80vh] flex items-center" onSubmit={handelSubmit}>
      <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-[#5E5E5E] text-sm shadow-lg">
        <p className="text-2xl font-semibold m-auto">
          <span className="text-primary">{state}</span> Login
        </p>
        <div className="w-full">
          <p>Email</p>
          <input
            className="border border-[#DADADA] rounded w-full p-2 mt-1"
            type="email"
            onChange={handelChange}
            value={input.email}
            name="email"
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="w-full">
          <p>Password</p>
          <input
            className="border border-[#DADADA] rounded w-full p-2 mt-1"
            type="password"
            onChange={handelChange}
            value={input.password}
            name="password"
            placeholder="Enter your password"
            required
          />
        </div>
        <button className="bg-primary text-white w-full py-2 rounded-md text-base hover:bg-purple-500 transition-all duration-300">
          Login
        </button>
        {state === "Admin" ? (
          <p>
            Doctor Login?{" "}
            <span
              className="text-primary underline cursor-pointer transition-all duration-300"
              onClick={() => setState("Doctor")}
            >
              Click here
            </span>
          </p>
        ) : (
          <p>
            Admin Login?{" "}
            <span
              className="text-primary underline cursor-pointer transition-all duration-300 "
              onClick={() => setState("Admin")}
            >
              Click here
            </span>
          </p>
        )}
      </div>
    </form>
  );
};

export default Login;
