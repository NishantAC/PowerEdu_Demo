import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./ResetPassword.css";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { element } from "prop-types";
import authService from "../../services/auth.service";
import { API_BASE_URL } from "@/common/constant";

function OtpVerify(props) {
  const RekorId = props.userId;
  const newPassword = props.newPassword;
  const oldPassword = props.oldPassword;

  const [otp, setOtp] = useState(new Array(6).fill(""));
  //Resend otp timer
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(30);
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const updatePassword = async () => {
    const body = {
      user_id: RekorId,
      newPassword: newPassword,
    };

    await axios
      .post(API_BASE_URL+"auth/updatepassword", body)
      .then(
        (response) => {
          console.log("Password has been updated");
          setErrorMsg("password updated");
          setMinutes(0);
          setSeconds(0);
        },
        (error) => {
          console.log("error in update password function");
        }
      );
  };

  const checkOtp = async () => {
    const body = {
      user_id: RekorId,
      otp: otp.join(""),
    };

    try {
      const response = await axios.post(
        API_BASE_URL+"auth/checkOtp",
        body
      );
      console.log(response.data.message); // Log the success message
      if (response.status === 200) {
        updatePassword();
      }
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message); // Log the error message from the response
        setErrorMsg(error.response.data.message);
      } else {
        console.log(error.message); // Log any network or other errors
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
  };

  const handleChange = (element, index) => {
    if (element.value === "") {
      // Clear the input when backspace is pressed
      setOtp([...otp.map((d, idx) => (idx === index ? "" : d))]);

      // Focus previous input if available
      if (element.previousSibling || element.value !== "") {
        element.previousSibling.focus();
      }
    } else if (!isNaN(element.value)) {
      setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);
      // Focus next input if available
      if (element.nextSibling && element.value !== "") {
        element.nextSibling.focus();
      }
    } else {
      setErrorMsg("Use number keys");
    }
  };

  const resendOTP = () => {
    setMinutes(0);
    setSeconds(30);

    const body = {
      user_id: parseInt(RekorId),
      oldPassword: oldPassword,
    };

    authService
      .sendOTP(body)
      .then((res) => {
        if (res.status === 200) {
          setErrorMsg("");
          setShowOtpScreen(true);
        } else {
          console.log(res.data.message); // Access the error message from res.data
        }
      })
      .catch((error) => {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log(error.response.data.message);
          setErrorMsg(error.response.data.message);
        } else if (error.request) {
          // The request was made but no response was received
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error", error.message);
        }
      });
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
    <div className="Main">
      <form className="forDiv1" onSubmit={handleSubmit}>
        <img
          className="forImg"
          width={260}
          height={260}
          src="/forget-password.svg"
        />
        <h1 className="heading">Enter Verification Code</h1>
        <p className="forP">OTP has been sent to your Email/Phone </p>
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
                onFocus={(e) => {
                  e.target.select();
                  setErrorMsg("");
                }}
                autoFocus={index === 0}
              />
            );
          })}
        </div>
        {error && otp.join("").length < 6 ? (
          <p className="errmsg">Enter valid OTP</p>
        ) : (
          ""
        )}
        {errorMsg ? <p className="errmsg">{errorMsg}</p> : ""}

        {otp.join("").length < 6 ? (
          <button className="forBtn1" disabled>
            Confirm
          </button>
        ) : (
          <button type="submit" className="forBtn2">
            Confirm
          </button>
        )}
        <div className="OtpTimer">
          <button
            style={{ coloer: "#5F6061" }}
            disabled={seconds > 0 || minutes > 0}
            onClick={resendOTP}
          >
            <span
              style={{
                color: seconds > 0 || minutes > 0 ? "#5F6061" : "#C25F6B",
              }}
            >
              Resend
            </span>{" "}
            OTP
          </button>
          {seconds > 0 || minutes > 0 ? (
            <p>
              {minutes < 10 ? `0${minutes}` : minutes}:
              {seconds < 10 ? `0${seconds}` : seconds}
            </p>
          ) : null}
        </div>
        <p className="forP2">
          <a href="/">
            <ArrowBackIcon style={{ marginRight: "15px" }} />
            Back to log in screen
          </a>
        </p>
      </form>
    </div>
  );
}

export default OtpVerify;
