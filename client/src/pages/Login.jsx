import React, { useContext, useEffect, useState } from 'react'
import {AppContext} from '../context/AppContext'
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  {/*Initial state of the form after submitting the input section will be empty*/}
  const initial ={
    name:"",
    email:"",
    password:""
  }

  {/* I have created two states one is for conditional rendering and another one is for input filed*/}
  const navigate = useNavigate();
  const {token,setToken} = useContext(AppContext)
  const [state,setState] = useState('Sign Up');
  const [input,setInput] = useState(initial);

  {/* This section works when the form has been submitted*/}

  const handelSubmit = async (event) => {
    event.preventDefault();
    
    try {
      if(state === 'Sign Up'){
        const {data} = await axios.post('https://carely-23w9.onrender.com/api/user/register', input)
        if(data.success){
          localStorage.setItem('token',data.token)
          setToken(data.token)
        } else{
          toast.error(data.message)
        }
      } else{
        const {data} = await axios.post('https://carely-23w9.onrender.com/api/user/login', input)
        if(data.success){
          localStorage.setItem('token',data.token)
          setToken(data.token)
        } else{
          toast.error(data.message)
        }
      }
    } catch (error) {
      toast.error(error.message)
  }
}

  useEffect(()=>{
   if(token) {
    navigate('/')
   }
  },[token])

  {/*This section is use to update the input section while typing it will automatically renders every single letters*/}

  const handelChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInput((previousStates)=>{
      return {...previousStates, [name]:value };
    });
  }


  return (
    <form className='min-h-[80vh] flex items-center' onSubmit={handelSubmit}>
      <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-zinc-600 text-sm shadow-lg'>
          <p className='text-primary text-2xl font-semibold text-center w-full'>{state === 'Sign Up' ? "Create Account" : "Login"}</p>

            {/*We are creating only one page for login and register. This condition tells that if state is equal to signup then signup page will be renders otherwise login page will be renders*/}

          <p className='text-center w-full' >Please {state === 'Sign Up' ? "sign up" : "log in"} to book appointment</p>

            {/* This condition tells that if state is equal to signup then the fullname input will been shown otherwise it will not show*/}
          {
            state === 'Sign Up' &&  <div className='w-full'>
            <p>Full Name</p>
            <input className='border border-zinc-300 rounded w-full p-2 mt-1' type='text' onChange={handelChange} value={input.name} name='name' placeholder='Enter your name' required/>
          </div>
          }
      
          <div className='w-full'>
            <p>Email</p>
            <input className='border border-zinc-300 rounded w-full p-2 mt-1'  type='email' onChange={handelChange} value={input.email} name='email' placeholder='Enter your email' required/>
          </div>

          <div className='w-full'>
            <p>Password</p>
            <input className='border border-zinc-300 rounded w-full p-2 mt-1'  type='password' onChange={handelChange} value={input.password} name='password' placeholder='Enter your password' required/>
          </div>
          <button type='submit' className='bg-primary text-white w-full py-2 rounded-md text-base hover:bg-violet-600 transition-all duration-300'>{state === 'Sign Up' ? "Create Account" : "Login"}</button>

            {/* This condition tells that if state is equal to signup then first para will be displayed otherswise second para will be displayed.*/}
          {
            state === "Sign Up" 
            ? <p className='text-center w-full'>Already have an account?  <span onClick={()=> setState('Login')} className=' text-primary underline cursor-pointer'>Login here</span> </p>
            : <p className='text-center w-full'>Create an new account? <span onClick={()=> setState('Sign Up')} className=' text-primary underline cursor-pointer'>click here</span> </p>
          }
      </div>
    </form>
  )
}


export default Login