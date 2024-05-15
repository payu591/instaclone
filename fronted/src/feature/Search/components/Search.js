import React, { useState } from 'react'
import SearchIcon from '../../../assets/icons/searchNavbar.png'
import { useDispatch, useSelector } from 'react-redux';
import { handleSearchResponceAsync, selectSearchData } from '../SearchSlice';
import { redirect, useNavigate } from 'react-router-dom';
import { fetchUserDetailAsync } from '../../Profile/ProfileSlice';


const Search = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [Searchdata, setSearchdata] = useState("");
  const SerchResult = useSelector(selectSearchData);

  const handleSearch = () => {
    dispatch(handleSearchResponceAsync(Searchdata))
  }

  const redirectProfile = (UserID)=>{
    dispatch(fetchUserDetailAsync(UserID));
    navigate("/Profile");
  }

  return (
    <>
      <div className="flex">
        <div className='relative flex items-center justify-center w-full'>
          {/* <img src={SearchIcon} className='w-5 h-5 absolute left-14 top-4 inset-0' alt="" /> */}
          <input
            type="search"
            className="p-4 pl-4 w-3/4 text-sm text-gray-900 bg-gray-50 rounded-lg border outline-none border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
            placeholder="Search"
            onChange={(e) => setSearchdata(e.target.value)}
          />
          <button
            type="submit"
            onClick={handleSearch}
            className="text-white  right-32 bottom-2.5  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 "
          >
            Search
          </button>
        </div>
      </div>
      <div className='max-w-2xl mx-auto'>
        {SerchResult && SerchResult.map(({UserName, ProfilePhoto, id}) => {
          return (

            <div onClick={()=>redirectProfile(id)} className='flex items-center border-b-2 py-2 px-4 gap-x-2'>
              <img src={ProfilePhoto} className='w-16 rounded-full h-16' alt="" />
              <h1>{UserName}</h1>
              <p className='text-sm flex-grow'>4h</p>
              <span>&#183; &#183; &#183;</span>
            </div>
          )
        })
        }
      </div>
    </>
  )
}

export default Search
