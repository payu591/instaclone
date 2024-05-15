import React, { useEffect } from 'react'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { HandleModifyRequestAsync, fetchAllRequestByUserAsync, selectAllRequestForUser } from '../notificationSlice';


const FollowRequest = () => {

  const dispatch = useDispatch();
  let RequestData = useSelector(selectAllRequestForUser);
  const RequestPendingData =  RequestData.filter((Req)=>Req.StatusRequest==="Pending");

  const hanldeConfirmRequest = (RequestId)=>{
    // console.log(RequestId);
    dispatch(HandleModifyRequestAsync({
      StatusRequest : "Accepted",
      Msg : "Request is Accepted",
      RequestId
    }));
    setTimeout(() => {
      dispatch(fetchAllRequestByUserAsync());
    }, 1000);
  }

  const hanldeDeleteRequest = ()=>{

  }

  useEffect(()=>{
    dispatch(fetchAllRequestByUserAsync());
  },[]);

  return (
    <div className='h-4/5'>
    <div className='flex items-center px-4 gap-x-4'>
    <Link to="/Notification">
    <ArrowBackIosNewIcon sx={{ fontSize: 60 }} className='bg-slate-200 rounded-full p-4'/>
    </Link>
    <h1 className='font-sans text-2xl font-semibold px-8 py-4'>follow Request</h1>
    </div> 
    <div className=''>
    { RequestPendingData && RequestPendingData.length===0 ? <div className='h-64 flex justify-center items-center'>No Request are exists</div> :RequestData.map(({RequestSenderUser, id:RequestId}, index)=>{
      const {UserName, FirstName, LastName, ProfilePhoto} = RequestSenderUser;
      return (
        <div className='flex border-b-2 items-center justify-between  p-2 rounded-lg mx-8'>
        <ul className='flex items-center w-full  gap-x-5 px-4'>
            <img src={ProfilePhoto} className="w-16 h-16 rounded-full" alt="" />
            <li className=''>
                <h1 className=''>{UserName}</h1>
                <p className='text-gray-500'>{FirstName}{LastName}</p>
            </li>
        </ul>
        <ul className='flex gap-x-2'>
            <li onClick={()=>hanldeConfirmRequest(RequestId)} className='bg-green-600 active:bg-green-500 cursor-pointer  px-4 py-2 text-white rounded-md'>Confirm</li>
            <li onClick={()=>hanldeDeleteRequest(RequestId)} className='bg-red-600   active:bg-red-500 cursor-pointer px-4 py-2 text-white rounded-md'>Delete</li>
        </ul>
      </div>)
    })}
    {

    }
    </div>
    </div>
  )
}

export default FollowRequest