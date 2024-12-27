import React, { useState } from 'react';
import axios from 'axios';
import './ForgotPassword.css';
import {  toast } from 'sonner';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { IoMdEyeOff } from "react-icons/io";
import { IoMdEye } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "@/common/constant";

function Password(props) {
  const RekorId = props.RekorId;
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const navigate = useNavigate();
  const handlePasswordVisibility1 = () => {
    setShowPassword1(!showPassword1);
  };
  const handlePasswordVisibility2 = () => {
    setShowPassword2(!showPassword2);
  };
  const [formInput, setFormInput] = useState({
    password: "",
    confirmPassword: "",
  });

  const [formError, setFormError] = useState({
    password: "",
    confirmPassword: "",
  });

  const handleUserInput = (name, value) => {
    setFormInput({
      ...formInput,
      [name]: value,
    });
  };

  const validateFormInput = async (event) => {
    event.preventDefault();
    let inputError = {
      password: "",
      confirmPassword: "",
    };

    if (!formInput.password && !formInput.confirmPassword) {
      setFormError({
        ...inputError,
        password: "Password should not be empty",
        confirmPassword: "Password should not be empty",
      });
      return;
    } else if (formInput.password.length < 8) {
      setFormError({
        ...inputError,
        password: "Password must be at least 8 characters long",
      });
      return;
    } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(formInput.password)) {
      setFormError({
        ...inputError,
        password: "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
      });
      return;
    }

    if (formInput.confirmPassword !== formInput.password) {
      setFormError({
        ...inputError,
        confirmPassword: "Password and confirm password should be same",
      });
      return;
    }

    const body = {
      "userId": RekorId,
      "password": formInput.password
    };

    await axios.put(API_BASE_URL + "auth/password", body)
      .then((response) => {
        console.log(response.data.message);
        toast.success("Password updated successfully!", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1000,
        });
        setTimeout(() => {
          navigate("/");
        }, 1500);
      }, (error) => {
        console.log(error.data.message);
      });
  };

  return (
    <div>
      <ToastContainer />
      <div className="mb-20">
        <h2 className="text-3xl font-semibold text-center text-[white]">
            Create A New Password
        </h2>
      </div>
      <div className="">
        <div>
          <form className="" onSubmit={validateFormInput}>
            <div className="relative mt-8">
            <label
            htmlFor="password"
            className={`absolute left-3 top-3 transition-all duration-200 transform ${
              formInput.confirmPassword || formInput.password ? '-translate-y-8 text-sm text-white' : 'peer-focus:-translate-y-8 peer-focus:text-sm peer-focus:text-white peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-lg'
            }`}
          >
            Password
          </label>
              <input
                type={showPassword1 ? "text" : "password"}
                name="password"
                id='password'
                className="w-full p-3 border border-white rounded-lg text-gray-700 focus:outline-none focus:ring-[#FFF] peer"
                value={formInput.password}
                onChange={({ target }) => {
                  handleUserInput(target.name, target.value);
                }}
              />
              <button
                type="button"
                className=" absolute top-1/2 right-3 transform -translate-y-1/2 pass_btn"
                onClick={handlePasswordVisibility1}
              >
                {showPassword1 ? <IoMdEyeOff size={20} /> : <IoMdEye size={20} />}
              </button>
            </div>
            <p className="text-red-500 text-sm mt-1">{formError.password}</p>
            <div className="relative mt-8">

            <label
            htmlFor="confirmPassword"
            className={`absolute left-3 top-3 transition-all duration-200 transform ${
              formInput.confirmPassword || formInput.password ? '-translate-y-8 text-sm text-white' : 'peer-focus:-translate-y-8 peer-focus:text-sm peer-focus:text-white peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-lg'
            }`}
          >
            Confirm Password
          </label>

              <input
                type={showPassword2 ? "text" : "password"}
                name="confirmPassword"
                id='confirmPassword'
                className="w-full p-3 border border-white rounded-lg text-gray-700 focus:outline-none focus:ring-[#FFF] peer"
                value={formInput.confirmPassword}
                onChange={({ target }) => {
                  handleUserInput(target.name, target.value);
                }}
              />
              <button
                type="button"
                className=" absolute top-1/2 right-3 transform -translate-y-1/2 pass_btn"
                onClick={handlePasswordVisibility2}
              >
                {showPassword2 ? <IoMdEyeOff size={20} /> : <IoMdEye size={20} />}
              </button>
            </div>
            <p className="text-red-500 text-sm mt-1">{formError.confirmPassword}</p>
            {formInput.password <= 0 || formInput.confirmPassword <=0 ? (
              <button className="text-white bg-[#7e4fff] py-2 px-6 border-2 border-white rounded-lg cursor-not-allowed opacity-70 mt-10" disabled={!formInput.password || !formInput.confirmPassword} >Save Password</button>
            ) : (
              <button className="text-white bg-[#7e4fff] py-2 px-6 border-2 border-white rounded-lg cursor-pointer mt-10">Save Password</button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default Password;


// ! Copyright (c) 2024 Aquaria Core Pvt. Ltd.