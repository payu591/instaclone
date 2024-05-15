import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { handleSendMsgAsync } from '../ChatSlice';
import { selectLoggedInUserId } from '../../Profile/ProfileSlice';
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import AddLogo from '../../../assets/icons/AddLogo.png'


const ChatInput = ({ selectChatId , socket}) => {

  const [ChatMsgInput, setChatMsgInput] = useState('');
  const [isEmojiOpen, setIsEmojiOpen] = useState(false);
  const CurrLoggedUserId = useSelector(selectLoggedInUserId);

  const dispatch = useDispatch();
  
  const getReceiverUserId = ()=>{
    const middleIndex = Math.floor(selectChatId.length / 2);

    const firstPart = selectChatId.slice(0, middleIndex);
    const secondPart = selectChatId.slice(middleIndex);

    return CurrLoggedUserId!==firstPart ? firstPart:secondPart;
  }

  const handleSendMsg = () => {

    const chatData = {
      SenderUserId: CurrLoggedUserId,
      ReceiverUserId: getReceiverUserId(),
      ContentMessage: ChatMsgInput,
      ContentType: "text",
      ChatId: selectChatId
    }
    socket.current.emit("send-msg", chatData);

    dispatch(handleSendMsgAsync({
      chatData,
      ChatId: selectChatId
    }));
    setChatMsgInput('');
  }

  const handleEmoji = ({native})=>{
    // console.log(native);
    setChatMsgInput((preChatMsg)=>preChatMsg+native);
  } 

  return (
    <div className='flex py-4 items-center justify-center '>
      <div className="h-10">
        <div className="text-4xl flex-col px-2">
      {/* {
        isEmojiOpen ? <Picker data={data} onEmojiSelect={(e)=>handleEmoji(e)} previewPosition={"top"} onClickOutside={(e)=>setIsEmojiOpen(false)}/> :  <img src={AddLogo} onClick={setIsEmojiOpen(true)} className='w-12 h-12' alt="" />
      } */}
        </div>
      </div>
      <div className="w-full rounded-2xl flex h-10 px-2  bg-opacity-20" >
        <input
          type="text"
          onChange={(e) => setChatMsgInput(e.target.value)}
          value={ChatMsgInput}
          className="bg-transparent flex-grow  border-stone-600 mr-2   border-2 rounded-md p-4   text-lg focus:outline-none"
          placeholder="type your message here"
        />
        <button>
          <div onClick={handleSendMsg} className='text-2xl bg-purple-500 active:bg-purple-700 rounded-lg px-4 py-2 text-white '>
            send
          </div>
        </button>
      </div>
    </div>

  )
}

export default ChatInput