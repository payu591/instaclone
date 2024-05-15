import React, { useEffect, useState } from 'react'
import StatusPic from '../../../assets/icons/nushrat.jpg'
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch, useSelector } from 'react-redux';
import "react-toastify/dist/ReactToastify.css";
import { gettoastOptions } from '../../../app/constant';
import { toast } from 'react-toastify';
import { createStatusAsync, selectStoryUploadstatus } from '../StatusSlice';

const StatusUploadModal = ({SetIsopenploadStatus}) => {

    const dispatch = useDispatch();
    const [Caption, setCaption] = useState('');
    const [statusImageUrl, setStatusImageUrl] = useState('');
    const [toastId, setToastId] = useState(null);
    const [IssendStatus, setIsSendStatus] = useState();
  
    const statusUploadStatus = useSelector(selectStoryUploadstatus);
  
    const handleImageUpload = async (event) => {
      const toastuniqukey = toast.loading('Uploading image...', {position: "top-center",
      hideProgressBar: false,
      theme: "dark"}
      );
      setToastId(toastuniqukey);
  
      const file = event.target.files[0];
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'e1ocsquo');
      formData.append("cloud_name", 'dbev6vdma');
  
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/dbev6vdma/image/upload`,
        {
          method: 'POST',
          body: formData,
        }
      );
      const data = await response.json();
      // console.log(data.secure_url);
      toast.dismiss(toastId);
      setStatusImageUrl(data.secure_url);
    }
  
    const handlePost = () => {
      if(Caption!=="" && statusImageUrl!=="") {
          dispatch(createStatusAsync({
            "CurentStory" : "...",
            "CurentStoryType" : "image",
            "StoryPath": statusImageUrl
          }));
          setIsSendStatus(true); 
          SetIsopenploadStatus(false);
      }
      else{
        if(statusImageUrl===""){
         toast.error("please Upload Image", gettoastOptions());
        }
        else if(Caption===""){
          toast.error("please Add your caption", gettoastOptions());
        }
      }
    }
    useEffect(()=>{
    //   if(IssendStatus && statusUploadStatus==="idle"){
    //     toast.success("Post successfully uploaded", gettoastOptions());
    //     setIsSendStatus(false);
    //   }
    //   if(statusUploadStatus==="loading"){
    //     // toast.info("Uploading Post.....", gettoastOptions());
    //     setIsSendStatus(true);
    //   }
    },[IssendStatus, statusUploadStatus])
  
  return (
    <div className='absolute inset-0 shadow-2xl bg-opacity-40 backdrop-blur-sm'>
    <div className='flex justify-center items-center h-screen'>
      <div className='grid grid-cols-2  bg-white rounded-lg lg:w-1/2 lg:h-1/2 sm:w-3/4  border-2'>
        {statusImageUrl != "" ? 
          <div className='flex'>
            <img src={statusImageUrl} className=' p-2  w-full' alt="" />
          </div> :
          <div className="flex p-2 items-center justify-center bg-gray-100 font-sans">
            <label
              htmlFor="dropzone-file"
              className="mx-auto cursor-pointer flex w-full max-w-lg flex-col items-center rounded-xl border-2 border-dashed border-blue-400 bg-white p-6 text-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10 text-blue-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                />
              </svg>
              <h2 className="mt-4 text-xl font-medium text-gray-700 tracking-wide">
                Select your  File
              </h2>
              <p className="mt-2 text-gray-500 tracking-wide">
                Upload or darg &amp; drop your file SVG, PNG, JPG or GIF.{" "}
              </p>
              <input id="dropzone-file" onChange={handleImageUpload} type="file" className="hidden" />
            </label>
          </div>
        }
        <div>
          <div className='flex p-2 items-center gap-x-4 px-2'>
            <img src={StatusPic} className='w-12 h-12 rounded-full' alt="" />
            <h1 className='flex-grow'>nishant12321</h1>
            <span onClick={() => SetIsopenploadStatus(false)}>
              <CloseIcon sx={{ fontSize: 40 }} />
            </span>
          </div>
          <div className='flex justify-center items-center'>
            <textarea className="p-2 border-2  cursor-pointer outline-none border-stone-400"
              placeholder="Add a Caption" value={Caption} onChange={(e) => setCaption(e.target.value)} cols="28" rows="6">
            </textarea>
          </div>
          <div className='flex justify-end p-4'>
            <button onClick={handlePost} className='px-4 py-2  bg-purple-700 rounded-md text-white'>
              Post
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default StatusUploadModal