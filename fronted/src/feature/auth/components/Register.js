import React, { useState } from 'react'
import { Link , Navigate} from 'react-router-dom'
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import instagramLogo1 from '../../../assets/icons/logo.png'
import { gettoastOptions } from '../../../app/constant';
import { useDispatch, useSelector } from 'react-redux';
import { createUserAsync  } from '../authSlice';
import { fetchUserIdAsync, selectLoggedInUserId } from '../../Profile/ProfileSlice';

const Register = () => {
  const dispatch = useDispatch();
  const CurrLoggedUserId = useSelector(selectLoggedInUserId);


  const registerObject = {
    UserName:"",
    FirstName:"",
    LastName:"",
    DoB:"",
    Gender:"",
    Email: "",
    Password: "",
    confirm_password: "",
  }

  const [registerData, setRegisterData] = useState(registerObject);

  const handlechange = (event) => {
    setRegisterData({ ...registerData, [event.target.name]: event.target.value });
  }

  // const handleValidation = ({
  //   Email,
  //   Password,
  //   ConfirmPassword,
  // }) => {
  //   const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
  //   if(Email==="") {
  //     toast.error("All field is require", gettoastOptions());
  //     return false;
  //   }
  //   else if(Password==="") {
  //     toast.error("All field is require", gettoastOptions());
  //     return false;
  //   }
  //   else if(ConfirmPassword==="") {
  //     toast.error("All field is require", gettoastOptions());
  //     return false;
  //   }
  //   else if (Password !== ConfirmPassword) {
  //     toast.error("Password didn't match", gettoastOptions());
  //     return false;
  //   } else if (Password.length <= 4) {
  //     toast.error("Password Length should be greater than 4", gettoastOptions());
  //     return false;
  //   } else if (!emailRegex.test(Email)) {
  //     toast.error("Email format should be right", gettoastOptions());
  //     return false;
  //   }
  //   return true;
  // };

  const handdleRegister = (e) => {
    e.preventDefault();
    console.log("submit");
    console.log({ ...registerData, Email: registerData.Email, Password: registerData.Password});
    // const { Email: Email, Password: Password, confirm_password: ConfirmPassword } = registerData;
    // if (handleValidation({ Email, Password, ConfirmPassword })) {
    //   console.log("validated");
    // }
    dispatch(createUserAsync({ ...registerData}));
    setTimeout(() => {
      dispatch(fetchUserIdAsync());
    }, 1000);
  };
  return (
    <>
    {CurrLoggedUserId && <Navigate to="/" replace={true}/>}
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-300">
        <div className="flex flex-col bg-white shadow-md px-4 sm:px-6 md:px-8 lg:px-10 py-8 rounded-md w-full max-w-md">
          <div className="font-medium self-center text-xl sm:text-2xl uppercase text-gray-800">
            Register To Your Account
          </div>
          <img className='h-24 object-cover my-2 '  src={instagramLogo1} alt="" />

          <div className="">
            <form onSubmit={handdleRegister}>

            <div className="flex flex-col mb-6">
                <label
                  htmlFor="UserName"
                  className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">
                  UserName:
                </label>
                <div className="relative">
                  <div className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                    <svg
                      className="h-6 w-6"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      viewBox="0 0 24 24"
                      stroke="currentColor">
                      <path d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                    </svg>
                  </div>
                  <input
                    id="UserName"
                    name="UserName"
                    type="text"
                    required="true"
                    value={registerData.UserName}
                    onChange={handlechange}
                    className="text-sm sm:text-base placeholder-gray-500 pl-10 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
                    placeholder="UserName"
                  />
                </div>
              </div>

              <div className="flex flex-col mb-6">
                <label
                  htmlFor="FirstName"
                  className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">
                  FirstName
                </label>
                <div className="relative">
                  <div className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                    <svg
                      className="h-6 w-6"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      viewBox="0 0 24 24"
                      stroke="currentColor">
                      <path d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                    </svg>
                  </div>
                  <input
                    id="FirstName"
                    type="text"
                    name="FirstName"
                    required="true"
                    value={registerData.FirstName}
                    onChange={handlechange}
                    className="text-sm sm:text-base placeholder-gray-500 pl-10 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
                    placeholder="FirstName"
                  />
                </div>
              </div>

              <div className="flex flex-col mb-6">
                <label
                  htmlFor="LastName"
                  className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">
                  LastName
                </label>
                <div className="relative">
                  <div className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                    <svg
                      className="h-6 w-6"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      viewBox="0 0 24 24"
                      stroke="currentColor">
                      <path d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                    </svg>
                  </div>
                  <input
                    id="LastName"
                    type="text"
                    name="LastName"
                    required="true"
                    value={registerData.LastName}
                    onChange={handlechange}
                    className="text-sm sm:text-base placeholder-gray-500 pl-10 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
                    placeholder="LastName"
                  />
                </div>
              </div>

              <div className="flex flex-col mb-6">
                <label
                  htmlFor="DoB"
                  className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">
                  DoB
                </label>
                <div className="relative">
                  <div className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                    <svg
                      className="h-6 w-6"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      viewBox="0 0 24 24"
                      stroke="currentColor">
                      <path d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                    </svg>
                  </div>
                  <input
                    id="DoB"
                    type="date"
                    name="DoB"
                    required="true"
                    value={registerData.DoB}
                    onChange={handlechange}
                    className="text-sm sm:text-base placeholder-gray-500 pl-10 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
                    placeholder="LastName"
                  />
                </div>
              </div>

              <div className="flex flex-col mb-6">
                <label
                  htmlFor="Gender"
                  className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">
                  Gender
                </label>
                <div className="relative">
                  <div className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                    <svg
                      className="h-6 w-6"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      viewBox="0 0 24 24"
                      stroke="currentColor">
                      <path d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                    </svg>
                  </div>
                  <input
                    id="Gender"
                    type="text"
                    name="Gender"
                    required="true"
                    value={registerData.Gender}
                    onChange={handlechange}
                    className="text-sm sm:text-base placeholder-gray-500 pl-10 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
                    placeholder="Gender"
                  />
                </div>
              </div>

              <div className="flex flex-col mb-6">
                <label
                  htmlFor="Email"
                  className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">
                  Email
                </label>
                <div className="relative">
                  <div className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                    <svg
                      className="h-6 w-6"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      viewBox="0 0 24 24"
                      stroke="currentColor">
                      <path d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                    </svg>
                  </div>
                  <input
                    id="Email"
                    type="email"
                    name="Email"
                    required="true"
                    value={registerData.Email}
                    onChange={handlechange}
                    className="text-sm sm:text-base placeholder-gray-500 pl-10 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
                    placeholder="Email"
                  />
                </div>
              </div>

              <div className="flex flex-col mb-6">
                <label
                  htmlFor="Password"
                  className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">
                  Password:
                </label>
                <div className="relative">
                  <div className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                    <span>
                      <svg
                        className="h-6 w-6"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </span>
                  </div>
                  <input
                    id="Password"
                    type="password"
                    name="Password"
                    value={registerData.Password}
                    onChange={handlechange}
                    className="text-sm sm:text-base placeholder-gray-500 pl-10 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
                    placeholder="Password"
                  />
                </div>
              </div>
              <div className="flex flex-col mb-6">
                <label
                  htmlFor="confirm_password"
                  className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">
                  Confirm Password:
                </label>
                <div className="relative">
                  <div className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                    <span>
                      <svg
                        className="h-6 w-6"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </span>
                  </div>
                  <input
                    id="confirm_password"
                    type="password"
                    name="confirm_password"
                    value={registerData.confirm_password}
                    onChange={handlechange}
                    className="text-sm sm:text-base placeholder-gray-500 pl-10 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
                    placeholder="confirm Password"
                  />
                </div>
              </div>
             
              <div className="flex w-full">
                <button
                  type="submit"
                  className="flex items-center justify-center focus:outline-none text-white text-sm sm:text-base bg-blue-600 hover:bg-blue-700 rounded py-2 w-full transition duration-150 ease-in">
                  <span className="mr-2 uppercase">Register</span>
                  <span>
                    <svg
                      className="h-6 w-6"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      viewBox="0 0 24 24"
                      stroke="currentColor">
                      <path d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </span>
                </button>
              </div>
            </form>
          </div>
          <div className="flex justify-center items-center mt-6">
            <Link
              to="/login"
              className="inline-flex items-center font-bold text-blue-500 hover:text-blue-700 text-xs text-center">
              <span>
                <svg
                  className="h-6 w-6"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
              </span>
              <span className="ml-2">You have an account so Login?</span>
            </Link>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  )
}

export default Register
