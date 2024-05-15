import React from 'react'
import CloseIcon from '@mui/icons-material/Close';
import RightArrow from '../../../assets/icons/angle-double-right.png'
import LeftArrow from '../../../assets/icons/angle-double-left.png'
import StatusPic from '../../../assets/icons/nushrat.jpg'
import SendMsg from '../../../assets/icons/sendMsg.png'
import Sampleavatar from '../../../assets/icons/Sampleavatar.png'
import { useSelector } from 'react-redux';
import { selectStoryData } from '../StatusSlice';


const StatusModal = ({selectedStatusModalNumber,SetSelectedStatusModalNumber,SetIsOpenStatusModal}) => {
    const StoryData = useSelector(selectStoryData);
    const {StoryPath, User }=StoryData[selectedStatusModalNumber];

  return (
    <div className='absolute inset-0 shadow-2xl bg-opacity-40 backdrop-blur-sm'>
    <div className='grid  grid-cols-12 h-screen'>
        <div className='m-auto col-span-2'>
            <img src={LeftArrow} alt="" className='w-10 h-10'/>
        </div>
        <div className='relative col-span-8 my-auto flex flex-col justify-center gap-y-4 items-center  shadow-xl p-4'>
            <div className='flex items-center w-full  gap-x-2'>
                <img src={User.ProfilePhoto} className='rounded-full w-16 h-16' alt="" />
                <h1>{User.UserName}</h1>
                <p className='text-sm'>{User.Gender}</p>
            </div>
            <span onClick={()=>SetIsOpenStatusModal(false)} className='absolute inset-y-0 self-end'>
              <CloseIcon sx={{ fontSize: 80 }} />
            </span>
            <div className='space-y-3 w-4/5 h-4/5 md:w-2/3 md:h-1/4'>
            <img src={StoryPath} className='mx-auto  sm:h-64 md:h-96 object-contain'  alt="" />
            <input type="text" className='bg-transparent border-4 border-purple-700 p-2 w-11/12 rounded-lg pr-6 text-black placeholder:text-stone-900 outline-none' placeholder={`reply to ${User.UserName}`}/>
            {/* <button className='absolute  bottom-1 right-6 md:top-0 md:right-0'> 
                <img src={SendMsg} alt="" className='w-8 h-8 ' />
            </button> */}
            </div>
        </div>
        <div className='m-auto col-span-2'>
            <img src={RightArrow} alt="" className='w-10 h-10'/>
        </div>
    </div>
    </div>
  )
}

export default StatusModal