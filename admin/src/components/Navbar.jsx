import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { AdminContext } from '../context/AdminContext'
import { useNavigate } from 'react-router-dom'
import { DoctorContext } from  '../context/DoctorContext'

const Navbar = () => {
    const {adminToken,setAdminToken} = useContext(AdminContext);
    const {dToken,setDToken} = useContext(DoctorContext)
    const navigate = useNavigate();

    const logout = () => {
        navigate('/')
        {/*Conditional Clearing of adminToken in State*/}
        adminToken && setAdminToken('')
        {/*Conditional Removal of adminToken from localStorage*/}
        adminToken && localStorage.removeItem('adminToken')

        dToken && setDToken('')
        dToken && localStorage.removeItem('dToken')
    }

  return (
    <div className='flex justify-between items-center px-4 sm:px-10 py-3 border-b'>
        <div className='flex items-center gap-2 text-xs'>
            <img className='w-36 sm:w-40 cursor-pointer' src={assets.admin_logo} alt="Logo"/>
            <p className='border px-2.5 py-0.5 rounded-full border-gray-500 text-gray-600'>{adminToken ? 'Admin' : 'Doctor'}</p>
        </div>
        <button onClick={logout} className='bg-primary text-sm px-10 py-2 rounded-full text-white  hover:bg-purple-500 transition-all duration-300'>Logout</button>
    </div>
  )
}

export default Navbar