import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchChatMsgAsync, selectCurrChatMsg } from '../ChatSlice';
import { getLoggeduserId } from '../../../app/constant';
import { selectLoggedInUserId } from '../../Profile/ProfileSlice';

const Messages = ({ selectChatId, socket }) => {
  const dispatch = useDispatch();
  const CurrMsgData = useSelector(selectCurrChatMsg);
  const CurrLoggedUserId = useSelector(selectLoggedInUserId);


  useEffect(() => {
    dispatch(fetchChatMsgAsync(selectChatId));
  }, [selectChatId]);


  useEffect (() => {
    if (socket.current) {
      socket.current.on("msg-recieve", (msgData) => {
        console.log("msg-recieve", msgData);
        CurrMsgData.push(CurrMsgData);
      });
    }
  }, []);


  return (
    <div className='overflow-scroll mx-2 row-span-4'>
      {
        CurrMsgData.map(({SenderUserId, ContentMessage, ContentType, ChatId}) => {
          return (
            <div className={`flex  my-4 ${SenderUserId===CurrLoggedUserId ? "justify-end":"justify-start"}`}>
              {/* // rounded-r-lg rounded-bl-lg  || rounded-l-lg rounded-br-lg */}
              <div className={`${SenderUserId===CurrLoggedUserId ? "rounded-l-lg rounded-br-lg":"rounded-r-lg rounded-bl-lg"} bg-purple-600 max-w-[20rem] text-white shadow-md shadow-slate-500 hover:bg-purple-500  px-3 py-2`}>
                <p>{ContentMessage}</p>
              </div>
            </div>
          )
        })
      }
    </div>
  )
}

export default Messages