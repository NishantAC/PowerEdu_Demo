import React, { useState } from "react";
import "./ResetPassword.css";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import authService from "../../services/auth.service";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import OtpVerify from "./OtpVerify";

function ResetPassword() {
  const [showOldPassowrd, setShowOldPassword] = useState(true);
  const [showNewPassowrd, setShowNewPassword] = useState(true);
  const [userId, setUserId] = useState("1710161");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [showOtpScreen, setShowOtpScreen] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (userId && oldPassword && newPassword) {
      if (newPassword.length <= 8) {
        setErrorMsg("New Password Length should be greater than 8");
      } else {
        const body = {
          user_id: parseInt(userId),
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
      }
    }
  };

  return (
    <>
      {!showOtpScreen ? (
        <div className="Main">
          <form className="Forgot_btn" onSubmit={handleSubmit}>
            <div className="forDiv1">
              <img
                className="forImg"
                width={260}
                height={260}
                src="/forget-password.svg"
              />
              <h1>Reset Password</h1>
              <p className="forP">No worries. Reset your password from here</p>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "35px",
                  margin: "20px 0px",
                }}
              >
                <div>
                  <div className="label">PowerEdu ID</div>
                  <input
                    className="adminResetPasswordInput"
                    placeholder="Enter Your PowerEdu Id"
                    onChange={(e) => setUserId(e.target.value)}
                    onFocus={() => setErrorMsg("")}
                  />
                </div>

                <div>
                  <div className="label">Old Password</div>
                  <div className="inputParent">
                    <input
                      className="adminResetPasswordInput"
                      placeholder="Enter Your Old Password"
                      type={showOldPassowrd ? "text" : "password"}
                      onChange={(e) => setOldPassword(e.target.value)}
                      onFocus={() => setErrorMsg("")}
                    />
                    <button
                      type="button"
                      className="password-toggle-btn"
                      style={{
                        position: "absolute",
                        right: "0px",
                        top: "13px",
                        width: "40px",
                        height: "30px",
                      }}
                      onClick={() => {
                        setShowOldPassword(!showOldPassowrd);
                      }}
                    >
                      <FontAwesomeIcon
                        icon={showOldPassowrd ? faEye : faEyeSlash}
                      />
                    </button>
                  </div>
                </div>

                <div>
                  <div className="label">New Password</div>
                  <div className="inputParent">
                    <input
                      className="adminResetPasswordInput"
                      placeholder="Enter Your New Password"
                      type={showNewPassowrd ? "text" : "password"}
                      onChange={(e) => setNewPassword(e.target.value)}
                      onFocus={() => setErrorMsg("")}
                    />

                    <button
                      type="button"
                      className="password-toggle-btn"
                      style={{
                        position: "absolute",
                        right: "0px",
                        top: "13px",
                        width: "40px",
                        height: "30px",
                      }}
                      onClick={() => {
                        setShowNewPassword(!showNewPassowrd);
                      }}
                    >
                      <FontAwesomeIcon
                        icon={showNewPassowrd ? faEye : faEyeSlash}
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {errorMsg && <p className="errmsg">{errorMsg}</p>}
            {userId.length <= 0 ? (
              <button className="forBtn1" disabled={!userId}>
                Reset Password
              </button>
            ) : (
              <button type="submit" className="forBtn2">
                Reset Password
              </button>
            )}
            <p className="forP2">
              <a href="/">
                <ArrowBackIcon style={{ marginRight: "15px" }} />
                Back to log in screen
              </a>
            </p>
          </form>
        </div>
      ) : (
        <OtpVerify
          userId={userId}
          newPassword={newPassword}
          oldPassword={oldPassword}
        />
      )}
    </>
  );
}

export default ResetPassword;
