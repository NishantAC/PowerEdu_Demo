import React, { useEffect, useState } from "react";
import "./School.css";
import { toast } from "react-toastify";
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

  const [folders, setFolders] = useState([]);

  const [showDeleteConfirmationModal, setShowDeleteConfirmationModal] =
    useState(false);
  const [showAddNewFolderModal, setShowAddNewFolderModal] = useState(false);
  const [showUploadPicturesModal, setShowUploadPicturesModal] = useState(false);

  const [isEditingEnabled, setEditingEnabled] = useState(false);
  const [isEditGalleryEnabled, setEditGallaryEnabled] = useState(false);
  const [deleteFolderId, setDeleteFolderId] = useState(-1);
  const [selectedAlbum, setSelectedAlbum] = useState(null);

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
      {!selectedAlbum ? (
        <>
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
              style={{
                color: "#4D4D4D",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Link to="/" style={{ textDecoration: "none", color: "#4D4D4D" }}>
                <div
                  style={{
                    fontFamily: "Roboto",
                    fontSize: "18px",
                    fontWeight: "400",
                  }}
                >
                  Home
                </div>
              </Link>
              <KeyboardArrowRightIcon />
              <div
                style={{
                  fontFamily: "Roboto",
                  fontSize: "18px",
                  fontWeight: "700",
                  textDecoration: "underline",
                }}
              >
                School
              </div>
            </div>
          </nav>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "10px" }}
          >
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
                    <EditOutlinedIcon
                      style={{ width: "20px", height: "20px" }}
                    />
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
                {/* <button
                  style={{
                    width: "96px",
                    height: "36px",
                    backgroundColor: "white",
                    border: "1px solid #C14D4D",
                    color: " #C14D4D",
                    borderRadius: "5px",
                  }}
                  onClick={() => {
                    setFormValues({
                      subjectName: "",
                      subjectType: "",
                      class: [],
                      // sections: [],
                      subjectCode: "",
                      NoOfChapters: "",
                    });
                    setClasses([]);
                    // setSections([]);
                  }}
                >
                  Reset
                </button> */}
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

            {/* gallery */}
            <div
              style={{
                width: "100%",
                height: "260px",
                boxShadow: "0 2px 7px 0 rgba(52, 52, 52, 0.35)",
                borderRadius: "5px",
                position: "relative",
                overflow: "hidden",
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
                  Gallery
                </div>
                <div style={{ display: "flex", gap: "10px" }}>
                  <button
                    style={{
                      width: "180px",
                      height: "46px",
                      color: "white",
                      borderRadius: "4px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      backgroundColor: "#204DF9",
                      gap: "2px",
                      border: "1px solid #204DF9",
                      outline: "none",
                    }}
                    onClick={() => {
                      if (!isEditGalleryEnabled && folders?.length > 0)
                        setShowUploadPicturesModal(true);
                    }}
                  >
                    <div
                      style={{
                        display: "grid",
                        placeContent: "center",
                      }}
                    >
                      <FileUploadOutlinedIcon
                        style={{ width: "30px", height: "25px" }}
                      />
                    </div>
                    <div
                      style={{
                        fontFamily: "Rubik",
                        fontSize: "18px",
                        fontWeight: "500",
                      }}
                    >
                      Upload Pictures
                    </div>
                  </button>
                  <button
                    style={{
                      width: "100px",
                      height: "46px",
                      backgroundColor: "white",
                      borderRadius: "4px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      color: "#204DF9",
                      gap: "2px",
                      border: "1px solid #204DF9",
                      outline: "none",
                    }}
                    onClick={() => {
                      if (folders?.length > 0)
                        setEditGallaryEnabled(!isEditGalleryEnabled);
                    }}
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
                      <EditOutlinedIcon
                        style={{ width: "20px", height: "20px" }}
                      />
                    </div>
                  </button>
                </div>
              </div>

              {/* neeche ka */}
              <div
                style={{
                  overflowY: "scroll",
                  height: "196px",
                  width: "100%",
                  padding: "10px",
                  display: "flex",
                  alignItems: "center",
                  flex: "wrap",
                  gap: "30px",
                }}
              >
                {folders.map((folder, index) => (
                  <div key={folder.id}>
                    <FolderBox
                      Id={folder.id}
                      text={folder.text}
                      setFolders={setFolders}
                      setShowDeleteConfirmationModal={
                        setShowDeleteConfirmationModal
                      }
                      setDeleteFolderId={setDeleteFolderId}
                      isEditGalleryEnabled={isEditGalleryEnabled}
                      setEditGallaryEnabled={setEditGallaryEnabled}
                      onClick={() => {
                        if (!isEditGalleryEnabled) setSelectedAlbum(folder);
                      }}
                    />
                  </div>
                ))}

                {/* add new Folder sign */}
                <div style={{ height: "120px", width: "100px" }}>
                  <div
                    style={{
                      width: "85px",
                      height: "85px",
                      border: "1px dashed #A1A1A1",
                      borderRadius: "4px",
                      backgroundColor: "white",
                      color: "#A1A1A1",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "20px",
                      cursor: "pointer",
                    }}
                    onClick={() => setShowAddNewFolderModal(true)}
                  >
                    <div
                      style={{
                        transform: "rotate(45deg)",
                        height: "12px",
                        width: "12px",
                      }}
                    >
                      <CloseOutlinedIcon />
                    </div>

                    <div
                      style={{
                        fontFamily: "Roboto",
                        fontSize: "12px",
                        fontWeight: "500",
                        whiteSpace: "wrap",
                        textAlign: "center",
                      }}
                    >
                      Add New Folder
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        // when an album
        <>
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
              style={{
                color: "#4D4D4D",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Link to="/" style={{ textDecoration: "none", color: "#4D4D4D" }}>
                <div
                  style={{
                    fontFamily: "Roboto",
                    fontSize: "18px",
                    fontWeight: "400",
                  }}
                >
                  Home
                </div>
              </Link>
              <KeyboardArrowRightIcon />
              <div
                style={{
                  fontFamily: "Roboto",
                  fontSize: "18px",
                  fontWeight: "700",
                  textDecoration: "underline",
                }}
              >
                School
              </div>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
              }}
              onClick={() => setSelectedAlbum(null)}
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
          </nav>
          <Album
            Id={selectedAlbum.id}
            selectedAlbum={selectedAlbum}
            setFolders={setFolders}
          />
        </>
      )}

      {showDeleteConfirmationModal && (
        <DeleteConfirmationModal
          folders={folders}
          setFolders={setFolders}
          deleteFolderId={deleteFolderId}
          close={() => setShowDeleteConfirmationModal(false)}
        />
      )}

      {showAddNewFolderModal && (
        <AddNewFolderModal
          folders={folders}
          setFolders={setFolders}
          onClick={() => setShowAddNewFolderModal(false)}
        />
      )}

      {showUploadPicturesModal && (
        <UploadPicturesModal
          folders={folders}
          setFolders={setFolders}
          onClick={() => setShowUploadPicturesModal(false)}
        />
      )}

      {showClassesUpdateModal && (
        <ClassesUpdateConfirmationModal
          updatedClasses={updatedClasses}
          setClasses={setClasses}
          close={() => setShowClassesUpdateModal(false)}
        />
      )}
    </div>
  );
}

export default Schools;
