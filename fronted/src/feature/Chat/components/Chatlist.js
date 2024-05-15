import React, { useEffect, useState } from 'react'
import Avatarpic from '../../../assets/icons/nushrat.jpg'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllUserChatsAsync, selectAllUserChats } from '../ChatSlice';
import { getLoggeduserId } from '../../../app/constant';
import { fetchUserDetailAsync, selectCurrUserProfileDetail, selectLoggedInUserId } from '../../Profile/ProfileSlice';

export const Chatlist = ({setSelectChatId, setSelectedUserChat}) => {
  const dispatch = useDispatch();
  const AllUserChats = useSelector(selectAllUserChats);
  const CurrLoggedUserId = useSelector(selectLoggedInUserId);
  const ProfileData = useSelector(selectCurrUserProfileDetail);




  function getChatId(str1, str2) {
    if (str1 < str2) {
      return str1 + str2;
    } else {
      return str2 + str1;
    }
  }

  const handleselectUserchats = (UserChat)=>{
    setSelectedUserChat(UserChat);
    setSelectChatId(getChatId(CurrLoggedUserId, UserChat.UserID));
  }

  useEffect(() => {
    dispatch(fetchAllUserChatsAsync());
    dispatch(fetchUserDetailAsync(CurrLoggedUserId));
  }, []);

  return (
    <div className='border-2  md:flex col-span-12 flex-col h-screen border-purple-500 md:col-span-2 lg:col-span-4'>
      <div className='p-6 border-b-2  space-y-3'>
        <h1 className='lg:text-2xl font-semibold text-center lg:text-left  font-sans'>{ProfileData && ProfileData.UserName}</h1>
      </div>
      <ul className='md:hidden flex  lg:flex lg:px-6 py-2 justify-around items-center'>
        <li className='text-2xl font-serif font-semibold '>Messages</li>
        <li className='text-xl text-cyan-600 font-semibold'>7 Request</li>
      </ul>
      <div className='h-3/4 mb-2 max-w-xl mx-auto overflow-scroll'>
        {
          AllUserChats.map((UserChat, index) => {
            const {UserName, ProfilePhoto} = UserChat;
            return (<div onClick={()=>handleselectUserchats(UserChat)} className='flex justify-start md:justify-center  md:flex-wrap border-b-2 hover:bg-slate-100 rounded-md p-2  items-center'>
              <div className='lg:p-4 p-2 '>
                <img src={ProfilePhoto} className='w-16 h-16 rounded-full' alt="" />
              </div>
              <div className='px-2'>
                <h1 className='font-semibold text-lg font-serif'>{UserName}</h1>
                <p className='text-sm md:hidden lg:flex'>Lorem ipsum dolor sit amet consectetur, .</p>
              </div>
            </div>);
          })
        }
      </div>
    </div>
  )
}
