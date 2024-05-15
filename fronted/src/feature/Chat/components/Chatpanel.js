import React, { useEffect } from 'react'
import Avatarpic from '../../../assets/icons/nushrat.jpg'
import Messages from './Messages'
import ChatInput from './ChatInput'
import { Chatlist } from './Chatlist'
import { io } from "socket.io-client";
import { useDispatch, useSelector } from 'react-redux'
import { selectLoggedInUserId } from '../../Profile/ProfileSlice'

const Chatpanel = ({selectedUserChat,selectChatId}) => {

    const dispatch = useDispatch();
    const currentUserId = useSelector(selectLoggedInUserId);


    const  {UserName:selectedUsername, ProfilePhoto: selectedProfilePhoto}  = selectedUserChat;
    useEffect(() => {
        const host = "http://localhost:8080"
        if (currentUserId) {
          WebSocket.current = io(host);
          WebSocket.current.emit("add-user", currentUserId);
        }
      }, [currentUserId]);

    return (
        <div className='col-span-10 md:col-span-9 lg:col-span-7'>
          <div className='grid h-screen md:grid-rows-6'>
                <div className='border-2 flex items-center gap-x-2 px-4 h-20  md:row-span-1'>
                    <div className="avatar">
                        <img
                            className="w-16 h-16 rounded-full"
                            src={selectedProfilePhoto}
                            alt="avatar"
                        />
                    </div>
                    <div className=" text-xl">
                        <h3>{selectedUsername}</h3>
                    </div>
                </div>
                <Messages selectChatId={selectChatId} socket={WebSocket} />
                <ChatInput selectChatId={selectChatId} socket={WebSocket}/>
            </div>
        </div>
    )
}

export default Chatpanel