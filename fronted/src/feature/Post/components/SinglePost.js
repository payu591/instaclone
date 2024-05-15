import React, { useEffect, useState } from 'react'
import Sampleavatar from '../../../assets/icons/Sampleavatar.png'
import HeartLogo from '../../../assets/icons/heartLogo.png'
import WhiteheartLogo from '../../../assets/icons/whiteheartLogo.png'
import SendMsg from '../../../assets/icons/sendMsg.png'
import Commenticon from '../../../assets/icons/Commenticon.png'
import SaveInstagram from '../../../assets/icons/save-instagram.png'
import { useDispatch, useSelector } from 'react-redux'
import { handleCommentPostAsync, handleLikePostAsync } from '../Postslice'
import { selectLoggedInUserId } from '../../Profile/ProfileSlice'

const SinglePost = ({ post }) => {

    const dispatch = useDispatch();
    const [Commentcontent, setCommentData] = useState();
    const CurrLoggedUserId = useSelector(selectLoggedInUserId);


    // console.log(post);
    const { PostType, Comment, Caption, PostPath, UserId, LikedByUsers, TotalLikes, id: postID } = post;
    const { UserName, FirstName, LastName, ProfilePhoto } = UserId;

    const [isLiked, setIsLiked] = useState(false);

    const handleUserLike = () => {
        dispatch(handleLikePostAsync(postID));
    }

    const handleAddComment = () => {
        dispatch(handleCommentPostAsync({postID,Commentcontent}));
        setCommentData('');
    }

    useEffect(() => {
        if (LikedByUsers) {
            // console.log(LikedByUsers);
            if (LikedByUsers.includes(CurrLoggedUserId));
                setIsLiked(true);
        }
    }, [isLiked, LikedByUsers])

    return (
        <div className='sm:w-2/3  mx-auto rounded-lg'>
            <div className='flex items-center  py-2 px-4 gap-x-2'>
                <img src={ProfilePhoto} className='w-16 rounded-full h-16' alt="" />
                <h1>{UserName}</h1>
                <p className='text-sm flex-grow'>4h</p>
                <span>&#183; &#183; &#183;</span>
            </div>
            <div className='h-3/4  flex justify-center bg-slate-100'>
                <img src={PostPath} alt="" className='' />
            </div>
            <ul className='flex  mt-2 px-4 gap-x-2'>
                <li onClick={handleUserLike}>
                    {
                        isLiked ? <img src={HeartLogo} className='w-8 h-8' alt="" /> :
                            <img src={WhiteheartLogo} className='w-8 h-8' alt="" />
                    }
                </li>
                <li >
                    <img src={Commenticon} className='w-8 h-8' alt="" />
                </li>
                <li className='flex-grow'>
                    <img src={SendMsg} className='w-8 h-8' alt="" />
                </li>
                <li className=''>
                    <img src={SaveInstagram} className='w-8 h-8' alt="" />
                </li>
            </ul>
            <div className='px-4 py-2 font-bold'><span>{TotalLikes}</span> Likes</div>
            <ul className='space-y-2 px-2'>
                <li className='text-xl'>
                    <span className='font-bold'>{UserName}</span> {Caption}
                </li>
                <li className='text-sm text-gray-400'>
                    View all {Comment.length} comments
                </li>
                <li className='w-full bg-slate-100 rounded-2xl flex  p-4'>
                    <input
                        type="text"
                        onChange={(e)=>setCommentData(e.target.value)}
                        value={Commentcontent} 
                        className="bg-transparent flex-grow border-none  text-lg focus:outline-none"
                        placeholder="type Your Comment"
                    />
                    <div className='text-2xl' onClick={handleAddComment}>
                        send
                    </div>
                </li>
                <ul>
                    {
                        Comment.map((commentItem, index) => {
                            const { CommentContent, CommentedBy } = commentItem;
                            return (
                                <li>
                                    <span className='font-bold pr-2'>{CommentedBy.UserName}</span>{CommentContent}...
                                </li>
                            )
                        })
                    }
                </ul>
            </ul>
        </div>
    )
}

export default SinglePost