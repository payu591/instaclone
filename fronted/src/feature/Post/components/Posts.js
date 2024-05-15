import React, { useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import SinglePost from './SinglePost'
import { fetchAllPostsByUserAsync, selectuserAllPosts } from '../Postslice';
import { useEffect } from 'react';
import Postmodal from './Postmodal';


const Posts = () => {
  const dispatch = useDispatch();
  const posts = useSelector(selectuserAllPosts);

  // console.log(posts);

  useEffect(() => {
    setTimeout(() => {
      dispatch(fetchAllPostsByUserAsync());
    }, 1000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className='space-y-6 mb-28 bg-slate-50'>
        {
          posts.map((post) => {
            return <SinglePost post={post} key={post.id} />
          })
        }
      </div>
    </>
  )
}

export default Posts