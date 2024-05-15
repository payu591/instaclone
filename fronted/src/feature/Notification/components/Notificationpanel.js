import React, { useEffect } from 'react'
import DoubleArrowOutlinedIcon from '@mui/icons-material/DoubleArrowOutlined';
import Avatarpic from '../../../assets/icons/nushrat.jpg'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllRequestByUserAsync, selectAllRequestForUser } from '../notificationSlice';


const Notificationpanel = () => {
  const dispatch = useDispatch();
  let RequestData = useSelector(selectAllRequestForUser);
  const PastActivityData = RequestData.filter((Req) => Req.StatusRequest === "Accepted");

  useEffect(() => {
    dispatch(fetchAllRequestByUserAsync());
  }, []);

  return (
    <div className='h-4/5 '>
      <h1 className='font-sans text-2xl font-semibold p-4'>Notifications</h1>
      <Link to="/Followrequest">
        <div className='flex items-center justify-between bg-slate-100 p-2 rounded-lg mx-8'>
          <ul className='flex items-center w-full justify-between gap-x-5 px-4'>
            <li className='flex items-center gap-x-4'>
              <h1 className=''>Follow requesets</h1>
            </li>
            <li className=''><DoubleArrowOutlinedIcon sx={{ fontSize: 60 }} /></li>
          </ul>
        </div>
      </Link>
      <h1 className='font-sans text-2xl font-semibold p-4'>This Week</h1>
      {PastActivityData && PastActivityData.map(({RequestSenderUser, Msg ,id:RequestId}) => {
        
        const {UserName, FirstName, LastName, ProfilePhoto} = RequestSenderUser;

        return (<div className='flex items-center justify-between bg-slate-100 p-2 rounded-lg mx-8'>
          <ul className='flex items-center w-full justify-between gap-x-5 px-4'>
            <li className='flex items-center gap-x-4'>
              <img src={ProfilePhoto} className="w-16 h-16 rounded-full" alt="" />
              <h1 className=''>{Msg} <span className='text-sm font-light'>2w</span></h1>
            </li>
            <img src="" alt="" />
          </ul>
        </div>)
      })}
    </div>
  )
}

export default Notificationpanel