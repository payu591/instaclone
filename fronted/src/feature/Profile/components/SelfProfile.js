import React, { useEffect, useState } from 'react'
import StatusPic from '../../../assets/icons/Sampleavatar.png'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUserDetailAsync, handleModifyProfileAsync, selectCurrUserProfileDetail, selectLoggedInUserId } from '../ProfileSlice'
import './selfProfile.css'

const SelfProfile = () => {
  const [islock, setIsLock] = useState(true);
  const [Biodata, setBiodata] = useState("");

  const dispatch = useDispatch();
  const CurrLoggedUserId = useSelector(selectLoggedInUserId);
  const ProfileData = useSelector(selectCurrUserProfileDetail);


  useEffect(() => {
    if (CurrLoggedUserId) {
      dispatch(fetchUserDetailAsync(CurrLoggedUserId));
    }
    if(ProfileData){
      setTimeout(()=>{
        setBiodata(ProfileData.Bio);
      },200)
    }
  }, [CurrLoggedUserId])

  const handleLock = ()=>{
    setIsLock(!islock);
  }
  const handleUpdate =()=>{
    if(!islock){
      dispatch(handleModifyProfileAsync({Bio:Biodata}));
      setTimeout(()=>{
        dispatch(fetchUserDetailAsync(CurrLoggedUserId));
        setTimeout(() => {
          setBiodata(ProfileData.Bio);
        }, 500);
      },500)  
    }
  }

  return (
    <>
      <div className='d-flex flex-row justify-center items-center gap-x-4'>
        <div className="my-4 space-y-3">
          <div className="row  align-items-center">
            <div className="col-md-4">
              <button className="profile-circle" title="Change profile photo">
                <img src={ProfileData && ProfileData.ProfilePhoto} className='rounded-circle' alt="" />
              </button>
            </div>
            <div className="col-md-8">
              <p className='text-2xl py-2'>{ProfileData && ProfileData.UserName}</p>
              <button className='bg-purple-500 px-4 py-2 text-white rounded-lg'>Change Profile</button>
            </div>
          </div>
          <div style={{ marginTop: 7, marginBottom: 7 }}>
            <br />
          </div>
          <div className="row align-items-center">
            <div className="col-md-4">
              <p>First Name </p>
            </div>
            <div className="col-md-8">
              <div className="form-group">
                <input type="text" value={ProfileData && ProfileData.FirstName} name="FirstName" className="form-control" />
              </div>
            </div>
          </div>
          <div className="row align-items-center">
            <div className="col-md-4">
              <p>Last Name </p>
            </div>
            <div className="col-md-8">
              <div className="form-group">
                <input type="text" value={ProfileData && ProfileData.LastName} name="LastName" className="form-control" />
              </div>
            </div>
          </div>
          <div className="row align-items-center">
            <div className="col-md-4">
              <p>Username </p>
            </div>
            <div className="col-md-8">
              <div className="form-group">
                <input type="text" value={ProfileData && ProfileData.UserName} name="UserName" className="form-control" />
              </div>
            </div>
          </div>
          <div className="row align-items-center">
            <div className="col-md-4">
              <p>Bio </p>
            </div>
            <div className="col-md-8">
              <div className="form-group">
                <input type="text" onChange={(event)=>setBiodata(event.target.value)} value={Biodata}  name="Bio" className="form-control" />
              </div>
            </div>
          </div>
          <div className="row align-items-center">
            <div className="col-md-4">
              <p>Gender </p>
            </div>
            <div className="col-md-8">
              <div className="form-group">
                <select value={ProfileData && ProfileData.Gender} name="Gender" class="form-control">
                  <option value="Male">Male</option>
                  <option value="FeMale">FeMale</option>
                </select>
              </div>
            </div>
          </div>
          <div className="row align-items-center">
            <div className="col-md-4">
              <p>Date of Birth </p>
            </div>
            <div className="col-md-8">
              <div className="form-group">
                <input type="date" name="DoB" value={ProfileData && ProfileData.DoB.slice(0, 10)} className="form-control" />
              </div>
            </div>
          </div>
          <div className="row align-items-center">
            <div className="col-md-4">
              <p>Account type</p>
            </div>
            <div className="col-md-8">
              <select value={ProfileData && ProfileData.AccType} name="AccType" class="form-control">
                <option value="public">Public</option>
                <option value="private">Private</option>
              </select>
            </div>
          </div>
        </div>
        <div>
          <h1 className='text-xl text-center font-bold my-2'>Change Password</h1>
          <div className="row align-items-center">
            <div className="col-md-4">
              <p>Current Password</p>
            </div>
            <div className="col-md-8">
              <div className="form-group">
                <input type="text" id="current_password" className="form-control" />
              </div>
            </div>
          </div>
          <div className="row align-items-center">
            <div className="col-md-4">
              <p>New Password</p>
            </div>
            <div className="col-md-8">
              <div className="form-group">
                <input type="text" id="new_password" className="form-control" />
              </div>
            </div>
          </div>
          <div className="row align-items-center">
            <div className="col-md-4">
              <p>Confirm Password</p>
            </div>
            <div className="col-md-8">
              <div className="form-group">
                <input type="text" id="confirm_password" className="form-control" />
              </div>
            </div>
          </div>
          <div style={{ marginTop: 4, marginBottom: 4 }}>
            <br />
          </div>
          <button onClick={handleLock} className="btn btn-primary mr-4">{`${islock ? "Unlock Detail":"Lock Detail"}`}
          </button>
          <button onClick={handleUpdate} className="btn btn-primary">
            Update Profile
          </button>
        </div>
      </div>
    </>
  )
}

export default SelfProfile