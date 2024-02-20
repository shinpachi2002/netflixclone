import React from 'react'
import { NavLink, Navigate } from 'react-router-dom'
import { UserAuth } from '../Context/AuthContext'
const Navbar = () => {
  const{user,logout}=UserAuth();
  const handleLogout=async ()=>{
    try{
      await logout();
      Navigate("/");
    }
    catch(error){
      console.log(error);
    }
  }
  return (
    <div className='flex flex-row justify-between p-4 absolute w-full z-[100]'>
      <NavLink to="/">
      <h1 className='text-red-600 text-4xl font-bold cursor-point'>NETFLIX</h1>
      </NavLink>
    {user?.email?  <div>
        <NavLink to="/account">
        <button className='text-white pr-4'>Account</button>
        </NavLink>
        <NavLink to="#">
        <button onClick={handleLogout} className='bg-red-600 text-white rounded px-6 py-2'>Logout</button>
        </NavLink>
      </div>:
        <div>
        <NavLink to="/login">
        <button className='text-white pr-4'>Sign In</button>
        </NavLink>
        <NavLink to="/signup">
        <button className='bg-red-600 text-white rounded px-6 py-2'>Sign Up</button>
        </NavLink>
      </div>
      }
    </div>
  )
}

export default Navbar
