import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Password from "./password";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { element } from "prop-types";
import { Link } from "react-router-dom";
import { API_BASE_URL } from "@/common/constant";

function OtpVerify(props) {
  const RekorId = props.email;
  const [title, setTitle] = useState(true);
  const [otp, setOtp] = useState(new Array(6).fill(""));
  //Resend otp timer
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(30);
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const forgetPassword = async () => {
    const body = {
      userId: RekorId,
    };

    await axios
      .post( API_BASE_URL+ "auth/forgetPassword", body)
      .then(
        (response) => {
          
        },
        (error) => {
          
        }
      );
  };

  const checkOtp = async () => {
    const body = {
      userId: RekorId,
      otp: otp.join(""),
    };

    try {
      const response = await axios.post(
        API_BASE_URL+ "auth/checkOtp",
        body
      );
      setTitle(false);
    } catch (error) {
      if (error.response) {
        setErrorMsg(error.response.data.message)
      } else {
        
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (otp.join("").length < 6) {
      setError(true);
      return;
    } else {
      setError(false);
      checkOtp();
    }

    // 
  };

  const handleChange = (element, index) => {
    if (!isNaN(element.value)) {
      setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

      // Focus next input if available
      if (element.nextSibling && element.value !== "") {
        element.nextSibling.focus();
      }
    }
  };

  const handleKeyDown = (element, index, event) => {
    if (event.key === "Backspace") {
      setOtp([...otp.map((d, idx) => (idx === index ? "" : d))]);

      // Focus previous input if available
      if (element.previousSibling) {
        element.previousSibling.focus();
      }
    }
  };

  const resendOTP = () => {
    setMinutes(0);
    setSeconds(30);
    forgetPassword();
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }

      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(interval);
        } else {
          setSeconds(59);
          setMinutes(minutes - 1);
        }
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [seconds]);

  return (
    <div>
      {title ? (
        <div className="">
          <form className="" onSubmit={handleSubmit}>
            <p className=" text-white"> We have sent an OTP to your registered email id</p>
            <div className="OtpDiv">
              {otp.map((data, index) => {
                return (
                  <input
                    className="otp-field"
                    type="text"
                    name="otp"
                    maxLength="1"
                    key={index}
                    value={data}
                    onChange={(e) => handleChange(e.target, index)}
                    onKeyDown={(e) => handleKeyDown(e.target, index, e)}
                    onFocus={(e) => e.target.select()}
                    autoFocus={index === 0}
                  />
                );
              })}
            </div>
            {error && otp.join("").length < 6 ? (
              <p className="text-red-500 text-sm mt-1">Enter valid OTP</p>
            ) : (
              ""
            )}
            {errorMsg ? (
              <p className="text-red-500 text-sm mt-1">{errorMsg}</p>
            ) : (
              ""
            )}

            {otp.join("").length < 6 ? (
              <button className="text-white bg-[#7e4fff] py-2 px-6 border-2 border-white rounded-lg cursor-not-allowed" disabled>
                Confirm
              </button>
            ) : (
              <button type="submit" className="text-white bg-[#7e4fff] py-2 px-6 border-2 border-white rounded-lg cursor-pointer"> 
                Confirm
              </button>
            )}
            <div className="">
              <button
                style={{ coloer: "#5F6061" }}
                disabled={seconds > 0 || minutes > 0}
                onClick={resendOTP}
              >

            {
              seconds > 0 || minutes > 0 ? (
                <p className=" text-white mt-5">Resend OTP in {minutes < 10 ? `0${minutes}` : minutes}:
                  {seconds < 10 ? `0${seconds}` : seconds}</p>
              ) : (
                <p className=" text-white mt-5"> Resend OTP</p>
              )
            }

              </button>
            </div>
          </form>
        </div>
      ) : (
        <Password RekorId={RekorId} />
      )}
    </div>
  );
}

export default OtpVerify;


// ! Copyright (c) 2024 Aquaria Core Pvt. Ltd.