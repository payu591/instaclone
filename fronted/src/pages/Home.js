import React, { useEffect, useState } from 'react'
import Navbar from '../Components/Navbar'
import Status from '../feature/Status/components/Status'
import StatusPic from '../assets/icons/Sampleavatar.png'
import Posts from '../feature/Post/components/Posts'
import Notificationpanel from '../feature/Notification/components/Notificationpanel'
import FollowRequest from '../feature/Notification/components/FollowRequest'
import { Route, Routes, useParams } from 'react-router-dom'
import Profile from '../feature/Profile/components/Profile'
import Search from '../feature/Search/components/Search'
import { ToastContainer } from 'react-toastify'
import { fetchUserIdAsync } from '../feature/Profile/ProfileSlice'
import { useDispatch } from 'react-redux'
import { loginUserAsync } from '../feature/auth/authSlice'
import Protected from '../feature/auth/components/Protected'
import { Button } from '@mui/material'
import SelfProfile from '../feature/Profile/components/SelfProfile'



const Home = () => {
  const dispatch = useDispatch();
  const [isProfile, setIsProfile] = useState(false);
  // const [isStatus, setIsStatus] = useState(false);
  const RenderPath = useParams()["*"];

  useEffect(() => {
    console.log("effect");
    if (RenderPath === 'Profile' || RenderPath === 'SelfProfile')
      setIsProfile(true);
    else
      setIsProfile(false);
  }, [RenderPath])

  // useEffect(()=>{
  //     dispatch(loginUserAsync({
  //       Email: "nishant123@gmail.com",
  //       Password:"user"
  //     }));
  //     setTimeout(() => {
  //       dispatch(fetchUserIdAsync());
  //     }, 1000);
  // },[])

  return (
    <>
      <div className='grid grid-cols-1 md:grid-cols-12 relative'>
        <Navbar />
        <div className={`${isProfile ? "lg:col-span-10" : "lg:col-span-6"} col-span-11`}>
          <Status/>
          <Routes>
            <Route>
              <Route index element={<Posts />} />
              <Route path="/Notification" element={<Protected><Notificationpanel /></Protected>} />
              <Route path="/Followrequest" element={<Protected><FollowRequest /></Protected>} />
              <Route path="/Profile" element={<Profile /> } />
              <Route path="/SelfProfile" element={<SelfProfile /> } />
              <Route path="/Search" element={<Search />} />
            </Route>
          </Routes>
        </div>
        <div className={`lg:col-span-4 ${isProfile ? "lg:hidden" : ''} hidden lg:block  border-2`}>
          <div className='lg:p-4 p-2 '>
          <div className='flex '>
              <img src={StatusPic} className='w-16 h-16 rounded-full' alt="" />
              <div className='px-2 '>
                <h1 className='font-semibold text-lg font-serif'>username</h1>
                <p className='text-sm md:hidden lg:flex'>Lorem ipsum dolor sit amet consectetur, .</p>
              </div>
          </div>
          <h1 className='text-2xl p-4 font-light '>Sugeestion For You</h1>
          <div className='space-y-2'>
          <div className='flex space-y-2'>
              <img src={StatusPic} className='w-16 h-16 rounded-full' alt="" />
              <div className='px-2 '>
                <h1 className='font-semibold text-lg font-serif'>username</h1>
                <p className='text-sm md:hidden lg:flex'>Lorem ipsum dolor sit amet consectetur, .</p>
              </div>
          </div>
          <div className='flex'>
              <img src={StatusPic} className='w-16 h-16 rounded-full' alt="" />
              <div className='px-2 '>
                <h1 className='font-semibold text-lg font-serif'>username</h1>
                <p className='text-sm md:hidden lg:flex'>Lorem ipsum dolor sit amet consectetur, .</p>
              </div>
          </div>

          </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  )
}

export default Home