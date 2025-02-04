import React, { useEffect, useState } from "react";
import { handleImageUpload, handleChange, handleSubmit } from "./fillUserInfoFunction";
import "./FillUserInfo.css";
import { useSelector } from "react-redux";
import authService from "../../../services/auth.service";
import ConfirmationModal from "./Modal/ConfirmationModal";
import classService from "../../../services/class.service";
import { selectThemeProperties } from "@/slices/theme";
import { useDispatch } from "react-redux";
import UserProfileImage from "./UserProfileImage";
import UserTypeSelection from "./UserTypeSelection";
import UserDetailsForm from "./UserDetailsForm";
function FillUserInfo() {

  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const themeProperties = useSelector(selectThemeProperties);

  const [userType, setUserType] = useState(null);
  const [rekorId, setRekorId] = useState();
  const [rollNoPlaceholder, setRollNoPlaceholder] = useState();
  const [admissionNoPlaceholder, setAdmissionNoPlaceholder] = useState();
  const [errorMsg, setErrorMsg] = useState(null);
  const [classesDropdown, setClassesDropdown] = useState([]);
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  const [formValues, setFormValues] = useState({
    school_id: user?.school_id,
    rekorId: rekorId,
    userType: null,
    imageUrl: "",
    image: null,
    admissionNo: "",
    firstName: "",
    middleName: "",
    lastName: "",
    gender: "",
    class: "",
    rollNo: "",
    admissionDate: "",
    email: "",
    dob: "",
    fatherName: "",
    motherName: "",
    guardianName: "",
    fatherContactNo: "",
    motherContactNo: "",
    guardianContactNo: "",
    addressLine1: "",
    addressLine2: "",
    role: "",
    subject: "",
    primaryContactNumber: "",
    secondaryContactNumber: "",
  });

  useEffect(() => {
    if (userType && user?.school_id !== undefined) {
      const body = {
        school_code: user?.school_id,
        userType: userType.toLowerCase(),
      };
      authService
        .getUniqueRekorId(body)
        .then((res) => {
          setRekorId(res.id);
        })
        .catch((error) => {
          
        });

      authService
        .getUniqueAdmissionNo(body)
        .then((res) => {
          setAdmissionNoPlaceholder(res.admissionNo);
        })
        .catch((error) => {
          
        });

      if (userType === "Student") {
        classService
          .getDropdownClasses( user?.school_id )
          .then((res) => {
            setClassesDropdown(res);
          });
      }

      if (userType === "Teacher") {
        classService
          .getAvailableClasses({ school_code: user?.school_id })
          .then((res) => {
            setClassesDropdown(res.data);
          });
      }
    }
  }, [user, userType]);

  useEffect(() => {
    setFormValues({
      ...formValues,
      rekorId: rekorId,
    });
  }, [rekorId]);

  useEffect(() => {
    if (userType && user?.school_id !== undefined && formValues.class !== "") {
      const body = {
        school_code: user?.school_id,
        class_code: formValues.class,
        userType: userType.toLowerCase(),
      };

      if (userType === "Student") {
        authService
          .getUniqueRollNo(body)
          .then((res) => {
            setRollNoPlaceholder(res.rollNo);
          })
          .catch((error) => {
            
          });
      }
    }
  }, [formValues.class, user, userType]);

  useEffect(() => {
    setFormValues({
      ...formValues,
      userType: userType,
    });
  }, [userType]);

  return (
    <div
      className="px-4"
    >
      <div className=" flex gap-4">
        <div className=" rounded-[20px] shadow-lg"
        
        >
        <div className=" min-w-[250px] flex flex-col justify-center items-center gap-20 h-[82vh] rounded-[20px] relative"
        style={{ backgroundColor: themeProperties?.boxBackground }}
        >
          <div>
          <h1 className=" text-2xl font-normal mb-5 top-10 absolute border-b-2" 
          style={{ color: themeProperties?.textColor, 
            borderColor: themeProperties?.normal1,
  
           }}
          >New User Profile</h1>
          <UserProfileImage formValues={formValues} setFormValues={setFormValues} themeProperties={themeProperties}  />
          </div>
          <UserTypeSelection userType={userType} setUserType={setUserType} themeProperties={themeProperties} />

        </div>
        </div>

        <div
          className=" flex-1 rounded-[20px] shadow-lg"

        >
          <UserDetailsForm
            formValues={formValues}
            setFormValues={setFormValues}
            handleChange={(e) => handleChange(e, formValues, setFormValues)}
            admissionNoPlaceholder={admissionNoPlaceholder}
            rollNoPlaceholder={rollNoPlaceholder}
            classesDropdown={classesDropdown}
            userType={userType}
            errorMsg={errorMsg}
            themeProperties={themeProperties} 
            handleSubmit={(e) => handleSubmit(e, formValues, setErrorMsg, setUserId, setPassword, setShowConfirmationModal)}
          />
        </div>
      </div>
      {showConfirmationModal && (
        <ConfirmationModal
          userId={userId}
          password={password}
          close={() => setShowConfirmationModal(false)}
          themeProperties={themeProperties}
        />
      )}
    </div>
  );
}

export default FillUserInfo;