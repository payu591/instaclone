const asyncHandler = require("express-async-handler");
const Post = require("../models/postModel");
const User = require("../models/userModel");
const Comment = require("../models/commentModel");
const Chat = require("../models/chatModel");

//@dec add a chat
//@route POST /api/chat/:Chatid/
//@acsess public
const addChatMessage = asyncHandler( async (req,res) => {
    try {
        const newChat = await Chat.create({
            ChatId: req.body.ChatId, 
            SenderUserId: req.body.SenderUserId,  
            ReceiverUserId: req.body.ReceiverUserId, 
            ContentMessage: req.body.ContentMessage, 
            ContentType: req.body.ContentType 
        })
        // console.log(newChat._id.toString());
            
        const addChat = await Chat.findById(newChat._id.toString());
        res.status(200).json(addChat);
            
    } catch (error) {
        console.log(error);
    }
    
});

//@dec get a chat
//@route GET /api/chat/:Chatid
//@acsess public
const getchat = asyncHandler( async (req,res) => {

    try{
        console.log(req.params.chatId);
        const chat = await Chat.find({ChatId:req.params.chatId});

        res.status(200).json(chat);
    }
    catch(error){
        console.log(error);
    }
});

const getAllUserChats = asyncHandler( async (req,res) => {
    const CurrUserId = req.user.id;
    // console.log(CurrUserId);
    try {
        const CurrUser = await User.findById(CurrUserId).populate("FollowingUser").populate("FollowersUser");
    
        const FollowingUser = CurrUser.FollowingUser;
        const FollowersUser = CurrUser.FollowersUser;
        let UserChatsData = [];

        FollowingUser.forEach(currUser => {
            const {UserName, ProfilePhoto, id} = currUser;
            UserChatsData.push({UserName, ProfilePhoto, UserID:id})
        });

        FollowersUser.forEach(currUser => {
            const {UserName, ProfilePhoto, id} = currUser;
            UserChatsData.push({UserName, ProfilePhoto, UserID:id})
        });

        let FilterUserChatsData = [];
        const uniqueKeys = new Set();

        for (const obj of UserChatsData) {
            const key = obj.UserID; 
            if (!uniqueKeys.has(key)) {
              uniqueKeys.add(key);
              FilterUserChatsData.push(obj);
            }
          }
        res.status(200).json(FilterUserChatsData);
    } catch (error) {
        console.log(error);
        res.status(404).json(error);
    }
});



module.exports = {addChatMessage, getchat, getAllUserChats};