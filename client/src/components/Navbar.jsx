import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { NavLink, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Navbar = () => {
  
  {/*I have used usenavigate hook when dropdown button appears while user accessing their profile,appointment and logout*/}
  const navigate = useNavigate();

  const {token,setToken,userData} = useContext(AppContext);

  const [showMenu, setShowMenu] = useState(false);

  {/* I have created this usestate to manage that user is loged-in or not*/}
  // const [token, setToken] = useState(true);

  const logout = () => {
    setToken(false)
    localStorage.removeItem('token')
  }

  {/*Below return section describe about Navbar we are using navlink from react-router-dom*/}

  return (
    <div className="flex items-center justify-between text-sm  md:px-3 py-3 mb-2 ">
      <img onClick={()=>navigate('/')}
        src={assets.logo}
        alt="Website Logo"
        className="w-32 md:w-40 cursor-pointer"
      />
      <ul className="hidden md:flex items-start gap-10 text-[15px] font-medium ">
        <NavLink to="/">
          <li className="py-1">HOME</li>
          <hr className="border-none outline-none h-0.5 bg-violet-700 w-3/5 m-auto hidden"></hr>
        </NavLink>

        <NavLink to="/doctors">
          <li className="py-1">ALL DOCTORS</li>
          <hr className="border-none outline-none h-0.5 bg-violet-700 w-3/5 m-auto hidden"></hr>
        </NavLink>

        <NavLink to="/about">
          <li className="py-1">ABOUT</li>
          <hr className="border-none outline-none h-0.5 bg-violet-700 w-3/5 m-auto hidden"></hr>
        </NavLink>

        <NavLink to="/contact">
          <li className="py-1">CONTACT</li>
          <hr className="border-none outline-none h-0.5 bg-violet-700 w-3/5 m-auto hidden"></hr>
        </NavLink>
        
      </ul>
      
      {/* This part describe that if user register with token he will be having profile section otherwise he will be having create account button.*/}

      <div className="flex items-center gap-4 me-3">
        {token && userData ? (
          <div className="flex items-center gap-2 cursor-pointer group relative">
            <img
              src={userData.image}
              alt="UserProfile"
              className="w-9 rounded-full shadow-xl "
            />

            {/* From here Dropdown menu starts if user register or loged in this section will be shown for them if not create account button will be shown*/}
            {/* For this condition i have used ternary operator*/}

            <img src={assets.dropdown_icon} className="w-2.5" />
            <div className='absolute top-0 right-0 pt-16 text-base font-medium text-gray-600 z-20 hidden group-hover:block'>
              <div className="min-w-56 bg-stone-200 shadow-lg rounded flex flex-col gap-4 p-4">
                <p onClick={()=>navigate('/my-profile')} className="hover:text-black cursor-pointer">My Profile</p>
                <p onClick={()=>navigate('/my-appointments')} className="hover:text-black cursor-pointer">My Appointment</p>
                <p onClick={logout} className="hover:text-black cursor-pointer">Logout</p>
              </div>
            </div>
          </div>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="bg-violet-700 text-white px-8 py-3 rounded-full font-normal hidden md:block"
          >
            Create Account
          </button>
        )}

        {/*Mobile Menu - ithu ethuku na namma mobile view la use panna mothu namma nav menu ha oru burger icon la potu  vaikanum*/}
        
        <img onClick={()=>setShowMenu(true)} className="w-6 md:hidden" src={assets.menu_icon} alt="menu" />
        <div className={`${ showMenu ? 'fixed w-full' : 'h-0 w-0'} md:hidden right-0 top-0 bottom-0 z-20 overflow-hidden bg-white transition-all duration-300`}>
          <div className="flex items-center justify-between px-5 py-6">
            <img className="w-36" src={assets.logo} alt="image" />
            <img onClick={()=> setShowMenu(false)} className="w-8" src={assets.cross_icon} alt="image" />
          </div>
          <ul className="flex flex-col items-center gap-2 mt-5 px-5 text-lg font-medium">
            <NavLink to='/' onClick={()=>setShowMenu(false)}><p className="px-4 py-2 rounded inline-block">HOME</p></NavLink>
            <NavLink to='/doctors' onClick={()=>setShowMenu(false)} ><p className="px-4 py-2 rounded inline-block">ALL DOCTORS</p></NavLink>
            <NavLink to='/about' onClick={()=>setShowMenu(false)} ><p className="px-4 py-2 rounded inline-block">ABOUT</p></NavLink>
            <NavLink to='/contact' onClick={()=>setShowMenu(false)} ><p className="px-4 py-2 rounded inline-block">CONTACT</p></NavLink>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
