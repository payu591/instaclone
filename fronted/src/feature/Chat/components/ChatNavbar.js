import React from 'react'
import instagramLogo from '../../../assets/icons/instagramLogo.png'
import HeartLogo from '../../../assets/icons/heartLogo.png'
import HomeLogo from '../../../assets/icons/HomeLogo.png'
import Reellogo from '../../../assets/icons/Reellogo.png'
import searchNavbar from '../../../assets/icons/searchNavbar.png'
import ChatLogo from '../../../assets/icons/ChatLogo.png'
import AddLogo from '../../../assets/icons/AddLogo.png'
import Sampleavatar from '../../../assets/icons/Sampleavatar.png'
import { Link } from 'react-router-dom'


const ChatNavbar = () => {
  return (
    <div className='h-screen hidden col-span-1 md:flex flex-col border-purple-600 border-2'>
     <div className='flex justify-center items-center h-28'>
      <img src={instagramLogo} className='w-10 h-10' alt="" /> 
      </div>
      <ul className=''>  
      <Link to="/">
        <li className='flex hover:bg-gray-200  rounded-xl mx-2  py-2  justify-center  items-center '>
          <img src={HomeLogo} className='w-10 h-10 ' alt="" />
        </li>
      </Link>
      <Link to="/Search">
        <li className='flex hover:bg-gray-200  rounded-xl  mx-2 py-2  justify-center   items-center '>
          <img src={searchNavbar} className='w-10 h-10 ' alt="" />
        </li>
      </Link>
        <li className='flex hover:bg-gray-200  rounded-xl  mx-2 py-2  justify-center   items-center '>
          <img src={Reellogo} className='w-10 h-10 ' alt="" />
        </li>
        <Link to="/chat">
        <li className='flex hover:bg-gray-200  rounded-xl  mx-2 py-2  justify-center   items-center '>
          <img src={ChatLogo} className='w-10 h-10 ' alt="" />
          <h1 className='font-bold hidden '>Messages</h1>
        </li>
        </Link>
        <Link to="/Notification">
        <li className='flex hover:bg-gray-200  rounded-xl  mx-2 py-2  justify-center   items-center '>
          <img src={HeartLogo} className='w-10 h-10 ' alt="" />
          <h1 className='font-bold hidden '>Notifications</h1>
        </li>
        </Link>
        <Link to="/">
        <li  className='flex hover:bg-gray-200  rounded-xl  mx-2 py-2  justify-center   items-center'>
          <img src={AddLogo} className='w-10 h-10 ' alt="" />
          <h1 className='font-bold hidden '>Create</h1>
        </li>
        </Link>
        <Link to="/SelfProfile">
        <li className='flex hover:bg-gray-200  rounded-xl  mx-2 py-2  justify-center   items-center '>
          <img src={Sampleavatar} className='w-10 h-10 ' alt="" />
          <h1 className='font-bold hidden '>Profile</h1>
        </li>
        </Link>
      </ul>
      <div className='p-4'>
        <h1 className='font-bold text-center text-2xl'>More</h1>
      </div>
    </div> 
  )
}

export default ChatNavbar