import React, { useEffect, useState } from "react";
import "./School.css";
import { toast } from "sonner";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import WestIcon from "@mui/icons-material/West";
import { Link } from "react-router-dom";
import InputParent from "./InputParent";
import DeleteConfirmationModal from "./Modal/DeleteConfirmationModal";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import FolderIcon from "@mui/icons-material/Folder";
import FolderBox from "./FolderBox";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import AddNewFolderModal from "./Modal/AddNewFolderModal";
import UploadPicturesModal from "./Modal/UploadPictureModal/UploadPicturesModal";
import "./School.css";
import Album from "./Album/Album";
import AddSectionsModal from "./Modal/AddSectionsModal/AddSectionsModal";
import classService from "../../../services/class.service";
import SpSchoolInfoService from "../../../services/sp_schoolinfo.service";
import ClassesUpdateConfirmationModal from "./Modal/ClassesUpdateConfirmationModal/ClassesUpdateConfirmationModal";
import { useSelector } from "react-redux";
import { selectThemeProperties } from "@/slices/theme";

function Schools() {
  const school = JSON.parse(localStorage.getItem("school"));
  const [formValues, setFormValues] = useState({
    name: "",
    address: "",
    address1: "",
    email: "",
    phNo: "",
    altNo: "",
    license: "",
    board: "",
  });

  const [classes, setClasses] = useState(null);
  const [isClassesModalOn, setClassesModalOn] = useState(false);
  const [updatedClasses, setUpdatedClasses] = useState([]);

  useEffect(() => {
    SpSchoolInfoService.getInfoSchool()
      .then((data) => {
        setFormValues((prev) => ({
          ...prev,
          name: data[0]?.name,
        }));
        setFormValues((prev) => ({
          ...prev,
          address: `${data[0]?.address?.line1 || ""}${
            data[0]?.address?.line2 ? ", " + data[0]?.address?.line2 : ""
          }, ${data[0]?.address?.city || ""}, ${
            data[0]?.address?.state || ""
          } ${data[0]?.address?.postal_code || ""}, ${
            data[0]?.address?.country || ""
          }`,
        }));
        setFormValues((prev) => ({
          ...prev,
          address1: data[0]?.address1,
        }));
        setFormValues((prev) => ({
          ...prev,
          email: data[0]?.email,
        }));
        setFormValues((prev) => ({
          ...prev,
          phNo: data[0]?.phone_no,
        }));
        setFormValues((prev) => ({
          ...prev,
          license: data[0]?.license_no,
        }));
        setFormValues((prev) => ({
          ...prev,
          board: data[0]?.board,
        }));
      })
      .catch((error) => {
        console.error("Error fetching school info:", error);
        toast.error("Failed to fetch school info.");
      });
  }, []);

  useEffect(() => {
    classService
      .getAllClasses({ school_code: 1 })
      .then((res) => {
        setClasses(res.data);
        setUpdatedClasses(res.data); // Update updatedClasses when classes are fetched
      })
      .catch((error) => {
        console.error("Error fetching classes:", error);
      });
  }, []); // Empty dependency array, runs once on mount

  useEffect(() => {
    if (classes !== null) {
      setUpdatedClasses(classes);
    }
  }, [classes]);

  const [showClassesUpdateModal, setShowClassesUpdateModal] = useState(false);
  const themeProperties = useSelector( selectThemeProperties);

  const [isEditingEnabled, setEditingEnabled] = useState(false);
  const handleChange = (e, key) => {
    setFormValues((prev) => ({
      ...prev,
      [key]: e.target.value,
    }));
  };

  const updateSchoolInfo = (school_code) => {
    SpSchoolInfoService.updateSchoolInfo(formValues, school_code)
      .then((response) => {
        toast.success("School Information Updated SuccessFully");
        setEditingEnabled(false); // Disable editing after save
      })
      .catch((error) => {
        console.error("Error in Updating School Info", error);
        toast.error("Failed to update school information.");
      });
  };

  return (
    <div className="subjectsContainer">
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <div>
          <h3
            style={{
              fontFamily: "Poppins",
              fontWeight: "600",
              marginTop: "30px",
              fontSize: "25px",
            }}
          >
            School
          </h3>
        </div>
        <div
          style={{
            width: "100%",
            height: "260px",
            boxShadow: "0 2px 7px 0 rgba(52, 52, 52, 0.35)",
            borderRadius: "5px",
            position: "relative",
          }}
        >
          <div
            style={{
              height: "64px",
              backgroundColor: "#F9F9F9",
              borderRadius: "5px 5px 0px 0px",
              paddingLeft: "10px",
              paddingRight: "20px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{
                fontFamily: "Poppins",
                fontSize: "20px",
                fontWeight: "600",
              }}
            >
              School Details
            </div>
            <button
              style={{
                width: "100px",
                height: "46px",
                backgroundColor: "#204DF9",
                borderRadius: "5px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: "white",
                gap: "2px",
                border: "none",
                outline: "none",
              }}
              onClick={() => setEditingEnabled(!isEditingEnabled)}
            >
              <div
                style={{
                  fontFamily: "Rubik",
                  fontSize: "18px",
                  fontWeight: "500",
                }}
              >
                Edit
              </div>
              <div
                style={{
                  display: "grid",
                  placeContent: "center",
                }}
              >
                <EditOutlinedIcon style={{ width: "20px", height: "20px" }} />
              </div>
            </button>
          </div>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "20px",
              padding: "20px 20px 0px 20px",
            }}
          >
            <div className="name">
              <InputParent text="Name">
                <input
                  className="inputBox"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    color: isEditingEnabled ? "red" : "black",
                  }}
                  disabled={!isEditingEnabled}
                  // onChange={handleChange(e,'address')}
                  onChange={(e) => {
                    handleChange(e, "name");
                  }}
                  value={formValues.name}
                ></input>
              </InputParent>
            </div>

            <div className="address">
              <InputParent text="Address">
                <input
                  className="inputBox"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    color: isEditingEnabled ? "red" : "black",
                  }}
                  disabled={!isEditingEnabled}
                  // onChange={handleChange(e,'address')}
                  onChange={(e) => {
                    handleChange(e, "address1");
                  }}
                  value={formValues.address1}
                ></input>
              </InputParent>
            </div>

            <div className="email">
              <InputParent text="E-mail">
                <input
                  className="inputBox"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    color: isEditingEnabled ? "red" : "black",
                  }}
                  disabled={!isEditingEnabled}
                  onChange={(e) => {
                    handleChange(e, "email");
                  }}
                  value={formValues.email}
                ></input>
              </InputParent>
            </div>

            <div className="phoneNo">
              <InputParent text="Phone No.">
                <input
                  className="inputBox"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    color: isEditingEnabled ? "red" : "black",
                  }}
                  disabled={!isEditingEnabled}
                  onChange={(e) => {
                    handleChange(e, "phNo");
                  }}
                  value={formValues.phNo}
                ></input>
              </InputParent>
            </div>

            <div className="licenses">
              <InputParent text="No. of License">
                <input
                  className="inputBox"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    color: isEditingEnabled ? "red" : "black",
                  }}
                  disabled={!isEditingEnabled}
                  onChange={(e) => {
                    handleChange(e, "license");
                  }}
                  value={formValues.license}
                ></input>
              </InputParent>
            </div>

            <div className="board">
              <InputParent text="Board">
                <input
                  className="inputBox"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    color: isEditingEnabled ? "red" : "black",
                  }}
                  disabled={!isEditingEnabled}
                  onChange={(e) => {
                    handleChange(e, "board");
                  }}
                  value={formValues.board}
                ></input>
              </InputParent>
            </div>

            <div className="class-and-sections">
              <InputParent text="Class & Sections">
                <div
                  className="inputBox"
                  style={{ display: "flex", alignItems: "center" }}
                >
                  {updatedClasses?.length || ""}
                </div>
                <button
                  style={{
                    position: "absolute",
                    height: "80%",
                    width: "60px",
                    borderRadius: "5px",
                    right: "3%",
                    top: "5px",
                    backgroundColor: "#204DF9",
                    color: "white",
                    border: "none",
                    outline: "none",
                    fontFamily: "Rubik",
                    fontSize: "18px",
                    fontWeight: "500",
                  }}
                  onClick={() => {
                    setClassesModalOn((prev) => !prev);
                    if (isClassesModalOn && updatedClasses != classes) {
                      setShowClassesUpdateModal(true);
                    }
                  }}
                >
                  Set
                </button>
                {isClassesModalOn && (
                  <AddSectionsModal
                    isClassesModalOn={isClassesModalOn}
                    updatedClasses={updatedClasses}
                    setUpdatedClasses={setUpdatedClasses}
                  />
                )}
              </InputParent>
            </div>
          </div>
          <div
            style={{
              position: "absolute",
              bottom: "10px",
              right: "40px",
              display: "flex",
              justifyContent: "center",
              gap: "20px",
              fontFamily: "Rubik",
              fontSize: "18px",
              fontWeight: "500",
            }}
          >
            <button
              style={{
                width: "96px",
                height: "36px",
                backgroundColor: "#204DF9",
                border: "none",
                color: "white",
                borderRadius: "5px",
              }}
              onClick={() => {
                updateSchoolInfo(school.school_code);
              }}
            >
              Rename
            </button>
          </div>
        </div>
      </div>
      <Link to="/admin/manage-classes"
        className=" absolute bottom-5 right-5 px-6 rounded-lg py-2"
        style={{
          backgroundColor: themeProperties?.normal1,
          color: themeProperties?.textColorAlt,
         }}
      >Manage Classes</Link>
    </div>
  );
}

export default Schools;
