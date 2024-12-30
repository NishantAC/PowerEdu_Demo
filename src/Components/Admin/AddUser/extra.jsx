import React, { useEffect, useState } from "react";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import WestIcon from "@mui/icons-material/West";
import SelectUserType from "./SelectUserType";
import InfoInputBox from "./InfoInputBox";
import { Link } from "react-router-dom";

function FillUserInfo() {
  const [deviceSize, setDeviceSize] = useState("pc");

  useEffect(() => {
    const handleResize = () => {
      const screenSize = window.innerWidth;
      if (screenSize < 640) {
        setDeviceSize("sm");
      } else if (screenSize < 768) {
        setDeviceSize("md");
      } else if (screenSize < 1024) {
        setDeviceSize("xl");
      } else if (screenSize < 1280) {
        setDeviceSize("2xl");
      } else {
        setDeviceSize("pc");
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const [userType, setUserType] = useState("");
  const [role, setRole] = useState("");
  const [subject, setSubject] = useState("");

  const [imageUrl, setImageUrl] = useState(null);
  

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setImageUrl(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (
    <div
      style={{
        position: "absolute",
        height: "calc(100vh - 100px)",
        width: `${
          deviceSize === "sm" || deviceSize === "sm"
            ? "100%"
            : "calc(100% - 140px)"
        }`,
        zIndex: "10",
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        gap: "40px",
        overflow: "scroll",
      }}
    >
      <nav
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          height: "20px",
        }}
      >
        {/* left area */}
        <div
          style={{ color: "#4D4D4D", display: "flex", alignItems: "center" }}
        >
          <div
            style={{
              fontFamily: "Roboto",
              fontSize: "18px",
              fontWeight: "400",
            }}
          >
            Home
          </div>
          <KeyboardArrowRightIcon />
          <div
            style={{
              fontFamily: "Roboto",
              fontSize: "18px",
              fontWeight: "700",
              textDecoration: "underline",
            }}
          >
            New User
          </div>
        </div>

        {/* right area */}
        <Link to="./home" style={{ textDecoration: "none" }}>
          <div
            style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
          >
            <WestIcon style={{ color: "#5F5F5F" }} />
            <div
              style={{
                fontFamily: "Roboto",
                fontWeight: "500",
                fontSize: "24px",
                letterSpacing: "4%",
                color: "#414141",
              }}
            >
              Back
            </div>
          </div>
        </Link>
      </nav>
      <main
        style={{
          flex: "1",
          display: "flex",
          flexDirection: `${deviceSize === "pc" ? "row" : "column"}`,
        }}
      >
        {/* Left Side */}
        <div
          style={{
            width: `${deviceSize === "pc" ? "20%" : "100%"}`,
            height: `${deviceSize === "pc" ? "100%" : ""}`,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyItems: "center",
            gap: `${deviceSize === "pc" ? "40px" : "0px"}`,
            // backgroundColor: "yellow",
            padding: `${deviceSize === "pc" ? "" : "20px 20px"}`,
          }}
        >
          <h1
            style={{
              fontFamily: "Poppins",
              fontSize: "25px",
              fontWeight: "600",
              textAlign: "center",
              alignSelf: `${deviceSize === "pc" ? "center" : "start"}`,
            }}
          >
            New User Profile ndnksnjnjsnj
          </h1>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "20px" }}
          >
            {imageUrl ? (
              <div
                style={{
                  height: "132px",
                  width: "132px",
                  borderRadius: "50%",
                  backgroundImage: `url(${imageUrl})`,
                  backgroundSize: "cover",
                }}
              ></div>
            ) : (
              <div
                style={{
                  height: "132px",
                  width: "132px",
                  borderRadius: "50%",
                  backgroundColor: "#F5F5F5",
                  display: "grid",
                  placeContent: "center",
                  fontFamily: "Rubik",
                  fontWeight: "500",
                  fontSize: "48px",
                  color: "#959595",
                }}
              >
                A
              </div>
            )}

            <div
              style={{
                width: "132px",
                height: "36px",
                border: "1px dotted #708DFF",
                borderRadius: "8px",

                fontFamily: "Rubik",
                fontSize: "16px",
                fontWeight: "400",
                color: "#708DFF",
              }}
            >
              {/* Upload Pic */}
              <label
                htmlFor="uploadImgBtn"
                style={{
                  height: "100%",
                  width: "100%",
                  cursor: "pointer",
                  display: "grid",
                  placeContent: "center",
                }}
              >
                Upload Pic
              </label>
              <input
                id="uploadImgBtn"
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleImageUpload}
              />
            </div>
          </div>
        </div>

        <div
          style={{
            width: `${deviceSize === "pc" ? "73%" : "100%"}`,
            height: "100%",
            padding: "20px 20px",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            position: "relative",
            paddingBottom: "70px",
          }}
        >
          {deviceSize === "pc" ? (
            <>
              {/* Right Side */}
              <div
                style={{
                  flex: "1",
                  display: "flex",
                  flexDirection: "column",
                  // padding: "0px 20px",
                  gap: "20px",
                }}
              >
                {/* first row */}
                <div style={{ width: "100%", display: "flex", gap: "20px" }}>
                  <div style={{ height: "50px", width: "200px" }}>
                    <InfoInputBox text="Rekor ID" />
                  </div>
                  {/* User option Box */}
                  <div style={{ width: "710px", height: "50px" }}>
                    <SelectUserType
                      text="User Type"
                      options={["Student", "Teacher", "Staff"]}
                      placeHolder="Please select user type"
                      info={userType}
                      setInfo={setUserType}
                    />
                  </div>
                </div>

                {userType !== "" ? (
                  <>
                    {/* second row */}
                    <div
                      style={{ width: "100%", display: "flex", gap: "22px" }}
                    >
                      <div style={{ height: "50px", width: "200px" }}>
                        {userType === "Student" ? (
                          <InfoInputBox text="Admission No" />
                        ) : (
                          <InfoInputBox text="Employee ID" />
                        )}
                      </div>
                      <div style={{ height: "50px", width: "200px" }}>
                        <InfoInputBox text="First Name" />
                      </div>
                      <div style={{ height: "50px", width: "260px" }}>
                        <InfoInputBox text="Middle Name (optional)" />
                      </div>
                      <div style={{ height: "50px", width: "200px" }}>
                        <InfoInputBox text="Last Name" />
                      </div>
                    </div>

                    {/* third row */}
                    <div
                      style={{ width: "100%", display: "flex", gap: "22px" }}
                    >
                      {userType === "Student" ? (
                        <>
                          <div style={{ height: "50px", width: "200px" }}>
                            <InfoInputBox text="Class" />
                          </div>
                          <div style={{ height: "50px", width: "100px" }}>
                            <InfoInputBox text="Roll No" />
                          </div>
                          <div style={{ height: "50px", width: "180px" }}>
                            <InfoInputBox
                              text="Admission Date"
                              inputType="date"
                            />
                          </div>
                          <div style={{ height: "50px", width: "240px" }}>
                            <InfoInputBox text="Email" />
                          </div>
                        </>
                      ) : userType === "Teacher" ? (
                        <>
                          <div style={{ height: "50px", width: "200px" }}>
                            <SelectUserType
                              text="Role"
                              options={["Teacher", "Class Teacher"]}
                              placeHolder=""
                              info={role}
                              setInfo={setRole}
                            />
                          </div>
                          <div style={{ height: "50px", width: "100px" }}>
                            <InfoInputBox text="Class" />
                          </div>
                          <div style={{ height: "50px", width: "200px" }}>
                            <SelectUserType
                              text="Subject"
                              options={[
                                "Science",
                                "English",
                                "Hindi",
                                "Mathematics",
                              ]}
                              placeHolder=""
                              info={subject}
                              setInfo={setSubject}
                            />
                          </div>
                          <div style={{ height: "50px", width: "180px" }}>
                            <InfoInputBox
                              text="Admission Date"
                              inputType="date"
                            />
                          </div>
                          <div style={{ height: "50px", width: "240px" }}>
                            <InfoInputBox text="Email" />
                          </div>
                        </>
                      ) : (
                        <>
                          <div style={{ height: "50px", width: "200px" }}>
                            <SelectUserType
                              text="Role"
                              options={["Driver", "Janitor"]}
                              placeHolder=""
                              info={role}
                              setInfo={setRole}
                            />
                          </div>
                          <div style={{ height: "50px", width: "180px" }}>
                            <InfoInputBox
                              text="Admission Date"
                              inputType="date"
                            />
                          </div>
                          <div style={{ height: "50px", width: "240px" }}>
                            <InfoInputBox text="Email" />
                          </div>
                        </>
                      )}
                    </div>
                    {/* fourth row */}
                    <div
                      style={{ width: "100%", display: "flex", gap: "20px" }}
                    >
                      <div style={{ height: "50px", width: "200px" }}>
                        <InfoInputBox text="D.O.B" inputType="date" />
                      </div>
                      <div style={{ height: "50px", width: "200px" }}>
                        <InfoInputBox text="Father Name" />
                      </div>
                      <div style={{ height: "50px", width: "240px" }}>
                        <InfoInputBox text="Mother Name" />
                      </div>
                      <div style={{ height: "50px", width: "300px" }}>
                        <InfoInputBox text="Gaurdian Name (optional)" />
                      </div>
                    </div>
                    {/* fifth row */}
                    <div
                      style={{ width: "100%", display: "flex", gap: "20px" }}
                    >
                      <div style={{ height: "50px", width: "200px" }}>
                        <InfoInputBox text="Father Contact No." />
                      </div>
                      <div style={{ height: "50px", width: "200px" }}>
                        <InfoInputBox text="Mother Contact No." />
                      </div>
                      <div style={{ height: "50px", width: "280px" }}>
                        <InfoInputBox text="Gaurdian Contact No. (optional)" />
                      </div>
                    </div>
                    {/* sixth row */}
                    <div style={{ height: "50px", width: "680px" }}>
                      <InfoInputBox text="Adress Line 1" />
                    </div>
                    {/* sevent row */}
                    <div style={{ height: "50px", width: "680px" }}>
                      <InfoInputBox text="Adress Line 2" />
                    </div>
                  </>
                ) : (
                  ""
                )}
              </div>
            </>
          ) : (
            <>
              {/* Right Side */}
              <div
                style={{
                  flex: "1",
                  display: "flex",
                  flexDirection: "column",
                  gap: "20px",
                }}
              >
                {/* first row */}
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    gap: "20px",
                    flexWrap: "wrap",
                  }}
                >
                  <div style={{ height: "50px", minWidth: "160px", flex: "1" }}>
                    <InfoInputBox text="Rekor ID" />
                  </div>
                  {/* User option Box */}
                  <div style={{ height: "50px", minWidth: "240px", flex: "1" }}>
                    <SelectUserType
                      text="User Type"
                      options={["Student", "Teacher", "Staff"]}
                      placeHolder="Please select user type"
                      info={userType}
                      setInfo={setUserType}
                    />
                  </div>
                </div>

                {userType !== "" ? (
                  <>
                    {/* second row */}
                    <div
                      style={{
                        width: "100%",
                        display: "flex",
                        gap: "22px",
                        flexWrap: "wrap",
                      }}
                    >
                      <div
                        style={{ height: "50px", minWidth: "160px", flex: "1" }}
                      >
                        {userType === "Student" ? (
                          <InfoInputBox text="Admission No" />
                        ) : (
                          <InfoInputBox text="Employee ID" />
                        )}
                      </div>
                      <div
                        style={{ height: "50px", minWidth: "160px", flex: "1" }}
                      >
                        <InfoInputBox text="First Name" />
                      </div>
                      <div
                        style={{ height: "50px", minWidth: "200px", flex: "1" }}
                      >
                        <InfoInputBox text="Middle Name (optional)" />
                      </div>
                      <div
                        style={{ height: "50px", minWidth: "160px", flex: "1" }}
                      >
                        <InfoInputBox text="Last Name" />
                      </div>
                    </div>

                    {/* third row */}
                    <div
                      style={{
                        width: "100%",
                        display: "flex",
                        gap: "22px",
                        flexWrap: "wrap",
                      }}
                    >
                      {userType === "Student" ? (
                        <>
                          <div
                            style={{
                              height: "50px",
                              minWidth: "200px",
                              flexGrow: "1",
                            }}
                          >
                            <InfoInputBox text="Class" />
                          </div>
                          <div
                            style={{
                              height: "50px",
                              minWidth: "100px",
                              flexGrow: "1",
                            }}
                          >
                            <InfoInputBox text="Roll No" />
                          </div>
                          <div
                            style={{
                              height: "50px",
                              minWidth: "180px",
                              flexGrow: "1",
                            }}
                          >
                            <InfoInputBox
                              text="Admission Date"
                              inputType="date"
                            />
                          </div>
                          <div
                            style={{
                              height: "50px",
                              minWidth: "240px",
                              flexGrow: "1",
                            }}
                          >
                            <InfoInputBox text="Email" />
                          </div>
                        </>
                      ) : userType === "Teacher" ? (
                        <>
                          <div
                            style={{
                              height: "50px",
                              minWidth: "200px",
                              flexGrow: "1",
                            }}
                          >
                            <SelectUserType
                              text="Role"
                              options={["Teacher", "Class Teacher"]}
                              placeHolder=""
                              info={role}
                              setInfo={setRole}
                            />
                          </div>
                          <div
                            style={{
                              height: "50px",
                              minWidth: "100px",
                              flexGrow: "1",
                            }}
                          >
                            <InfoInputBox text="Class" />
                          </div>
                          <div
                            style={{
                              height: "50px",
                              minWidth: "200px",
                              flexGrow: "1",
                            }}
                          >
                            <SelectUserType
                              text="Subject"
                              options={[
                                "Science",
                                "English",
                                "Hindi",
                                "Mathematics",
                              ]}
                              placeHolder=""
                              info={subject}
                              setInfo={setSubject}
                            />
                          </div>
                          <div
                            style={{
                              height: "50px",
                              minWidth: "180px",
                              flexGrow: "1",
                            }}
                          >
                            <InfoInputBox
                              text="Admission Date"
                              inputType="date"
                            />
                          </div>
                          <div
                            style={{
                              height: "50px",
                              minWidth: "240px",
                              flexGrow: "1",
                            }}
                          >
                            <InfoInputBox text="Email" />
                          </div>
                        </>
                      ) : (
                        <>
                          <div
                            style={{
                              height: "50px",
                              minWidth: "200px",
                              flexGrow: "1",
                            }}
                          >
                            <SelectUserType
                              text="Role"
                              options={["Driver", "Janitor"]}
                              placeHolder=""
                              info={role}
                              setInfo={setRole}
                            />
                          </div>
                          <div
                            className="staffAdmissionDate"
                            style={{
                              height: "50px",
                              minWidth: "180px",
                              flexGrow: "1",
                            }}
                          >
                            <InfoInputBox
                              text="Admission Date"
                              inputType="date"
                            />
                          </div>
                          <div
                            style={{
                              height: "50px",
                              minWidth: "240px",
                              flexGrow: "1",
                            }}
                          >
                            <InfoInputBox text="Email" />
                          </div>
                        </>
                      )}
                    </div>
                    {/* fourth row */}
                    <div
                      style={{
                        width: "100%",
                        display: "flex",
                        gap: "20px",
                        flexWrap: "wrap",
                      }}
                    >
                      <div
                        style={{ height: "50px", flex: "1", minWidth: "160px" }}
                      >
                        <InfoInputBox text="D.O.B" inputType="date" />
                      </div>
                      <div
                        style={{ height: "50px", flex: "1", minWidth: "160px" }}
                      >
                        <InfoInputBox text="Father Name" />
                      </div>
                      <div
                        style={{ height: "50px", flex: "1", minWidth: "160px" }}
                      >
                        <InfoInputBox text="Mother Name" />
                      </div>
                      <div
                        style={{ height: "50px", flex: "1", minWidth: "240px" }}
                      >
                        <InfoInputBox text="Gaurdian Name (optional)" />
                      </div>
                    </div>
                    {/* fifth row */}
                    <div
                      style={{
                        width: "100%",
                        display: "flex",
                        gap: "20px",
                        flexWrap: "wrap",
                      }}
                    >
                      <div
                        style={{ height: "50px", flex: "1", minWidth: "200px" }}
                      >
                        <InfoInputBox text="Father Contact No." />
                      </div>
                      <div
                        style={{ height: "50px", flex: "1", minWidth: "200px" }}
                      >
                        <InfoInputBox text="Mother Contact No." />
                      </div>
                      <div
                        style={{ height: "50px", flex: "1", minWidth: "280px" }}
                      >
                        <InfoInputBox text="Gaurdian Contact No. (optional)" />
                      </div>
                    </div>
                    {/* sixth row */}
                    <div
                      style={{
                        minHeight: "50px",
                        minWidth: "200px",
                        flex: "1",
                      }}
                    >
                      <InfoInputBox text="Adress Line 1" />
                    </div>
                    {/* sevent row */}
                    <div
                      style={{
                        minHeight: "50px",
                        minWidth: "200px",
                        flex: "1",
                      }}
                    >
                      <InfoInputBox text="Adress Line 2" />
                    </div>
                  </>
                ) : (
                  ""
                )}
              </div>
            </>
          )}

          {/* buttons */}
          <div
            style={{
              position: "absolute",
              bottom: "20px",
              right: "20px",
            }}
          >
            <div
              style={{
                display: "flex",
                gap: "20px",
                fontFamily: "Rubik",
                fontSize: "18px",
                fontWeight: "500",
              }}
            >
              <Link to="./home">
                <button
                  style={{
                    border: "1px solid #C14D4D",
                    borderRadius: "5px",
                    color: "#C14D4D",
                    backgroundColor: "white",
                  }}
                >
                  Cancel
                </button>
              </Link>

              <button
                disabled={userType === ""}
                style={{
                  border: "none",
                  borderRadius: "5px",
                  backgroundColor: `${userType === "" ? "#FAFAFA" : "#204DF9"}`,
                  color: `${userType === "" ? "#CECECE" : "white"}`,
                }}
              >
                Upload
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default FillUserInfo;
