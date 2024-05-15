import React, { useEffect, useState } from 'react'
import StatusPic from '../../../assets/icons/nushrat.jpg'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUserDetailAsync, selectCurrUserProfileDetail, selectLoggedInUserId } from '../ProfileSlice'
import { HandleFolowbackRequestAsync, HandleModifyRequestAsync, HandleSendRequestAsync } from '../../Notification/notificationSlice'

const Profile = () => {
  const dispatch = useDispatch();
  const CurrLoggedUserId = useSelector(selectLoggedInUserId);
  const ProfileData = useSelector(selectCurrUserProfileDetail);
  const [ChooseButton, setButton] = useState("Send Request");

  let CurrUserProfile = { UserName: "", FirstName: "", LastName: "", ProfilePhoto: "", AllPost: [], Bio: "", FollowingUser: [], Request: [], FollowersUser: [], UserID: "" };
  console.log(CurrUserProfile.AllPost);
  const handleButton = () => {
    if (ChooseButton === "Send Request") {
      dispatch(HandleSendRequestAsync({
        ReceiverId: CurrUserProfile.UserID,
        Msg: `${CurrLoggedUserId} requested to follow you`
      }));
      setTimeout(() => dispatch(fetchUserDetailAsync(CurrUserProfile.UserID)), 1000);
    }
    else if(ChooseButton === "Follow Back"){
      dispatch(HandleFolowbackRequestAsync({
        ReceiverId: CurrUserProfile.UserID,
        Msg: `${CurrLoggedUserId} requested to follow you`
      }));
      setTimeout(() => dispatch(fetchUserDetailAsync(CurrUserProfile.UserID)), 1000);
    }
  }

  useEffect(() => {
    let RequestedUser = [];
    if (ProfileData) {
      for (let key in ProfileData) {
        if (ProfileData.hasOwnProperty(key)) {
          CurrUserProfile[key] = ProfileData[key];
        }
        CurrUserProfile["UserID"] = ProfileData.id;
      }
      RequestedUser = CurrUserProfile.Request.map((Req) => {
        return Req.RequestSenderUser;
      })

      // console.log(CurrUserProfile.AllPost);

      const IsFollowing = CurrUserProfile.FollowingUser && CurrUserProfile.FollowingUser.includes(CurrLoggedUserId);
      const IsFollower = CurrUserProfile.FollowersUser && CurrUserProfile.FollowersUser.includes(CurrLoggedUserId);
      const IsRequestedUser = RequestedUser.includes(CurrLoggedUserId);


      // console.log({IsFollower,IsFollowing,  IsRequestedUser});
      if (IsRequestedUser) {
        setButton("Pending");
      }
      if (IsFollower && IsFollowing) {
        setButton("Following");
      }
      else if (IsFollowing && !IsFollower) {
        setButton("Follow Back");
      }
      else if (!IsFollowing && IsFollower) {
        setButton("Following");
      }
    }
  }, [ProfileData]);



  return (
    <div className='grid grid-rows-6 min-h-screen max-w-4xl mx-auto  border-2 '>
      <div className='row-span-2  grid  grid-cols-1  border-2'>
        <div className='p-4 flex items-center'>
          <img src={ProfileData  && ProfileData.ProfilePhoto} className='w-16 h-16 rounded-full' alt="" />
          <div className='p-2'>
            <h1 className='text-xl font-bold'>{ProfileData && ProfileData.UserName}</h1>
            <ul className='flex gap-x-2'>
              <li onClick={handleButton} className='px-2 py-2 bg-purple-600 active:bg-purple-400 text-white rounded-md'>{ChooseButton}</li>
              {ChooseButton === "Following" && <li className='px-2 py-2 bg-red-600 active:bg-red-500 text-white rounded-md'>UnFollow</li>}
            </ul>
          </div>
        </div>
        <div className='border-2 space-y   row-span-4  p-2'>
          <h1 className='font-bold'>{ProfileData  && ProfileData.FirstName} {ProfileData && ProfileData.LastName}</h1>
          <p className='p-2'>
            {ProfileData &&  ProfileData.Bio}
          </p>
          <p className='text-sm font-mono'>
            Followed by .......
          </p>
        </div>
      </div>
      <div className=' row-span-5 border-2'>
        <ul className='grid grid-cols-3 my-2 space-x-2 border-2 border-stone-500 sm:max-w-md mx-auto'>
          <li className='text-center p-2 rounded-md bg-slate-200'>Posts</li>
          <li className='text-center p-2 rounded-md '>Reels</li>
          <li className='text-center p-2 rounded-md '>Tags</li>
        </ul>
        <div className='grid grid-cols-3 p-2 place-items-center gap-4 '>
          {
             ProfileData  && ProfileData.AllPost.map((post) => {
              console.log("PostPath",post.PostPath);
              return (
                <div className='w-28 h-28 md:h-48 md:w-48 border-2'>
                  <img src={post.PostPath} className='object-cover' alt="" />
                </div>
              )
            })
          }
        </div>
      </div>
    </div>

  )
}

export default Profile