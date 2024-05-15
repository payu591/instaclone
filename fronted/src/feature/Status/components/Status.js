import React, { useEffect, useState } from 'react'
import AddLogo from '../../../assets/icons/AddLogo.png'
import StatusModal from './StatusModal'
import StatusUploadModal from './StatusUploadModal';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllStoryOnHomePageAsync, selectCurrStatus, selectStoryData } from '../StatusSlice';

const Status = () => {
    const dispatch = useDispatch();
    const [isOpenUploadStatus, SetIsopenploadStatus] = useState(false);
    const [isOpenStatusModal, SetIsOpenStatusModal] = useState(false);
    const [selectedStatusModalNumber, SetSelectedStatusModalNumber] = useState(false);

    const CurrLoggedUserStatus = useSelector(selectCurrStatus);
    const StoryData = useSelector(selectStoryData);

    const handleStatusModal = (Number)=>{
        SetSelectedStatusModalNumber(Number);
        SetIsOpenStatusModal(!isOpenStatusModal);
    }

    useEffect(() => {
        setTimeout(() => {
            dispatch(fetchAllStoryOnHomePageAsync());
        }, 2000);
    },[])

    return (
        <>
            <div className='flex  sm:mx-8 z-0 border-b-2  items-center overflow-hidden overflow-x-scroll sm:gap-x-4 gap-x-6 pt-4 pb-4 sm:px-0 px-4'>
                {CurrLoggedUserStatus === null ? <div onClick={() => SetIsopenploadStatus(!isOpenUploadStatus)}
                    className='sm:w-20 ml-2 sm:h-24 w-16 h-20 flex-col items-center justify-center'>
                    <img src={AddLogo} className=' object-contain ring-2  p-1 ring-pink-700 rounded-full' alt="" />
                    <h1 className='text-center font-semibold'>Upload</h1>
                </div> : null}
                <div className='flex items-center gap-x-4'>
                {
                    StoryData && StoryData.map(({StoryPath, User},index)=>{
                        return (
                            <div onClick={()=>handleStatusModal(index)}
                            className='w-24 object-cover  flex-col items-center justify-center'>
                            <img src={StoryPath} className='rounded-full' alt="" />
                            <h1 className='text-center font-semibold'>{User.UserName}</h1>
                        </div>
                        )
                    })
                }  
                </div>
            </div>
            { isOpenStatusModal && <StatusModal selectedStatusModalNumber={selectedStatusModalNumber} SetSelectedStatusModalNumber={SetSelectedStatusModalNumber}  SetIsOpenStatusModal={SetIsOpenStatusModal}/>  }
            {  isOpenUploadStatus && <StatusUploadModal SetIsopenploadStatus={SetIsopenploadStatus} />}
        </>
    )
}

export default Status