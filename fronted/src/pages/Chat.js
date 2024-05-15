import React, { useState } from 'react'
import ChatNavbar from '../feature/Chat/components/ChatNavbar'
import { Chatlist } from '../feature/Chat/components/Chatlist'
import Chatpanel from '../feature/Chat/components/Chatpanel'

const Chat = () => {
  
  const [selectedUserChat, setSelectedUserChat] = useState(null);
  const [selectChatId, setSelectChatId] = useState(null);

  return (
    <div className='grid grid-cols-12'>
     <ChatNavbar/>
     <Chatlist  setSelectChatId={setSelectChatId} setSelectedUserChat={setSelectedUserChat} />
     {
        selectedUserChat===null ? 
        <div className='col-span-10 md:col-span-9 lg:col-span-7 flex justify-center items-center'>Select UserChat</div>
        : <Chatpanel selectedUserChat={selectedUserChat} selectChatId={selectChatId}/>
     }
    </div>
  )
}

export default Chat