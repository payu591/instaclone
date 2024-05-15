import React, { useState } from 'react'
import SearchIcon from '../assets/icons/searchNavbar.png'
import instagramLogo from '../assets/icons/instagramLogo.png'
import instagramLogo1 from '../assets/icons/logo.png'
import HeartLogo from '../assets/icons/heartLogo.png'
import HomeLogo from '../assets/icons/HomeLogo.png'
import Reellogo from '../assets/icons/Reellogo.png'
import searchNavbar from '../assets/icons/searchNavbar.png'
import ChatLogo from '../assets/icons/ChatLogo.png'
import AddLogo from '../assets/icons/AddLogo.png'
import Sampleavatar from '../assets/icons/Sampleavatar.png'
import { Link } from 'react-router-dom'
import NotificationModel from '../feature/Notification/components/Notificationpanel'
import Postmodal from '../feature/Post/components/Postmodal'

const Navbar = () => {

  const [ openCretePostmodal, setOpenCretePostmodal ] = useState(false);
  return (
    <>
    {/* // Mobile screen components */}
    <div className='flex items-center gap-x-2 sm:gap-x-4 py-2 px-2 sm:px-4 md:hidden'>
      <div className='flex-grow'>
        <img className='hidden sm:flex' src={instagramLogo1} alt="" />
        <img src={instagramLogo} className='sm:hidden w-10 h-10' alt="" />
      </div>
          <div className="flex flex-row">
            <div className='relative'>
            <img src={SearchIcon} className='w-5 h-5 absolute inset-y-0 left-2 top-4'  alt="" />
            <Link to="/Search">
            <input
              type="search"
              className="block p-4 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border outline-none border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
              placeholder="Search"
              />
              </Link>
            <button
              type="submit"
              className="text-white absolute right-2.5 bottom-2.5  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 "
            >
              Search
            </button>
            </div>
          </div>
          <div>
            <img src={HeartLogo} className='w-6 h-6 sm:w-10 sm:h-10' alt="" />
          </div>

      <div></div>
    </div>

    {/* // laptop screnn comphonents */}
    <div className='hidden h-screen md:flex flex-col lg:col-span-2 col-span-1 border-purple-600 border-2'>
      <div className='flex justify-center items-center h-28'>
      <img src={instagramLogo} className='lg:hidden w-10 h-10' alt="" />
      <img className='hidden lg:flex h-32'  src={instagramLogo1} alt="" />
      </div>
      <ul className='flex-grow'>  
      <Link to="/">
        <li className='flex hover:bg-gray-200  rounded-xl  mx-2 py-2 lg:px-4 justify-center lg:justify-normal items-center gap-x-4'>
          <img src={HomeLogo} className='w-10 h-10 ' alt="" />
          <h1 className='font-bold hidden lg:block'>Home</h1>
        </li>
      </Link>
      <Link to="/Search">
        <li className='flex hover:bg-gray-200  rounded-xl  mx-2 py-2 lg:px-4 justify-center  lg:justify-normal items-center gap-x-4'>
          <img src={searchNavbar} className='w-10 h-10 ' alt="" />
          <h1 className='font-bold hidden lg:block'>Search</h1>
        </li>
      </Link>
        <li className='flex hover:bg-gray-200  rounded-xl  mx-2 py-2 lg:px-4 justify-center  lg:justify-normal items-center gap-x-4'>
          <img src={Reellogo} className='w-10 h-10 ' alt="" />
          <h1 className='font-bold hidden lg:block'>Reels</h1>
        </li>
        <Link to="/chat">
        <li className='flex hover:bg-gray-200  rounded-xl  mx-2 py-2 lg:px-4 justify-center  lg:justify-normal items-center gap-x-4'>
          <img src={ChatLogo} className='w-10 h-10 ' alt="" />
          <h1 className='font-bold hidden lg:block'>Messages</h1>
        </li>
        </Link> 
        <Link to='/Notification'>
        <li className='flex hover:bg-gray-200  rounded-xl  mx-2 py-2 lg:px-4 justify-center  lg:justify-normal items-center gap-x-4'>
          <img src={HeartLogo} className='w-10 h-10 ' alt="" />
          <h1 className='font-bold hidden lg:block'>Notifications</h1>
        </li>
        </Link>
        <Link to="/">
        <li onClick={()=>setOpenCretePostmodal(!openCretePostmodal)} className='flex hover:bg-gray-200  rounded-xl  mx-2 py-2 lg:px-4 justify-center  lg:justify-normal items-center gap-x-4'>
          <img src={AddLogo} className='w-10 h-10 ' alt="" />
          <h1 className='font-bold hidden lg:block'>Create</h1>
        </li>
        </Link>
        <Link to="/SelfProfile">
        <li className='flex hover:bg-gray-200  rounded-xl  mx-2 py-2 lg:px-4 justify-center  lg:justify-normal items-center gap-x-4'>
          <img src={Sampleavatar} className='w-10 h-10 ' alt="" />
          <h1 className='font-bold hidden lg:block'>Profile</h1>
        </li>
        </Link>
      </ul>
      <div className='hidden lg:block  p-4'>
        <h1 className='font-bold text-center text-2xl'>More</h1>
      </div>
    </div>  
    {
      openCretePostmodal && <Postmodal setOpenCretePostmodal={setOpenCretePostmodal} />
    }
    </>
  )
}

export default Navbar