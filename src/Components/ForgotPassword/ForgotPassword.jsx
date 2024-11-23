import React, { useState } from 'react';
import axios from 'axios';
import OtpVerify from './otpVerify';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link } from 'react-router-dom';
import { API_BASE_URL } from '@/common/constant';


function ForgotPassword() {
  const [title, setTitle] = useState(true);
  const [email, setEmail] = useState('');
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");



  const handleSubmit = async (e) => {
    e.preventDefault();

    if (email.length <= 0) {
      setError(true);
    } else {
      const body = {
        "userId": email
      };
      try {
        const response = await axios.post( API_BASE_URL+ "auth/forgetPassword", body);
        console.log(response.data);
        setTitle(false);
      } catch (error) {
        setErrorMsg(error.response.data.message);
        console.log("error in forget password function", error);
      }
    }
  };

  return (
    <div className="h-screen px-40 max-sm:px-0 max-sm:py-0  py-10 bg-[#FFF]">
      <div className="flex flex-col justify-center items-center h-full bg-[#EDE8F5] rounded-2xl max-sm:rounded-none shadow-2xl shadow-slate-700 relative">
      <div className="mb-10">
          <h2 className="text-2xl font-semibold text-center text-[white]">
            Forgot Password?
          </h2>
        </div>
        <div className="flex flex-col md:flex-row shadow-lg rounded-2xl overflow-hidden glass-effect border-4 border-white">

          <div className="flex-1 p-20 flex flex-col justify-center">
            {title ? (
              <form className="w-full" onSubmit={handleSubmit}>

                <div className="relative">
                  <input
                    type="text"
                    id="email"
                    name="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder=" "
                    className="w-full p-3 border border-white rounded-lg text-gray-700 focus:outline-none focus:ring-[#FFF] peer"
                  />
                  <label
                    htmlFor="email"
                    className={`absolute left-3 top-3 transition-all duration-200 transform ${
                      email ? '-translate-y-8 text-sm text-white' : 'peer-focus:-translate-y-8 peer-focus:text-sm peer-focus:text-white peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-lg'
                    }`}
                  >
                    PowerEdu ID
                  </label>
                  {errorMsg && (
                    <div className="text-red-500 text-sm mt-1">
                      {errorMsg}
                    </div>
                  )}
                </div>

                <div className="mt-10">
                  {email.length <= 0 ? (
                    <button className=" px-6 py-2 border-2 border-white cursor-not-allowed opacity-45  text-white rounded-lg bg-[#8c3fff]" disabled={!email}>
                      Reset Password
                    </button>
                  ) : (
                    <button className="px-6 py-2 border-2 border-white  bg-[#8c3fff] text-white rounded-lg">
                      Reset Password
                    </button>
                  )}
                </div>

 
              </form>
            ) : (
              <div>
                <OtpVerify />
              </div>
            )}
          </div>
        </div>
            <p className="mt-4 text-center text-white absolute top-2 left-2 ">
                <Link to="/" className=" flex items-center justify-center gap-4">
                    <ArrowBackIcon className="text-white" />
                    Back to Login ?
              </Link>
          </p>
      </div>
      
    </div>
  );
}
export default ForgotPassword;


// ! Copyright (c) 2024 Aquaria Core Pvt. Ltd.