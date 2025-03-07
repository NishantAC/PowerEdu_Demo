import React, { useEffect, useState } from "react";
import {
  handleImageUpload,
  handleChange,
  handleSubmit,
} from "./fillUserInfoFunction";
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
  const [powereduId, setPowereduId] = useState();
  const [rollNoPlaceholder, setRollNoPlaceholder] = useState();
  const [admissionNoPlaceholder, setAdmissionNoPlaceholder] = useState();
  const [errorMsg, setErrorMsg] = useState(null);
  const [classesDropdown, setClassesDropdown] = useState([]);
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [numberLoading, setNumberLoading] = useState(false);
  const [guardianFormValues, setGuardianFormValues] = useState({
    school_id: user?.school_id,
    father_name: "",
    father_contact: "",
    mother_name: "",
    mother_contact: "",
    guardian_name: "",
    guardian_contact: "",
    address: "",
  });

  const [formValues, setFormValues] = useState({
    poweredu_id: null,
    // admission_number: null,
    password: "",
    role: userType,
    first_name: "",
    middle_name: "",
    last_name: "",
    username: "",
    email: "",
    contact: "",
    gender: "",
    school_id: user?.school_id,
    academic_year_id: 1,
    class_id: null,
    roll_number: null,
    admission_date: "",
    dob: "",
    guardian: {
      school_id: guardianFormValues.school_id,
      father_name: guardianFormValues.father_name,
      father_contact: guardianFormValues.father_contact,
      mother_name: guardianFormValues.mother_name,
      mother_contact: guardianFormValues.mother_contact,
      guardian_name: guardianFormValues.guardian_name,
      guardian_contact: guardianFormValues.guardian_contact,
      address: guardianFormValues.address,
    },
  });

  const handleGuardianChange = (e) => {
    setGuardianFormValues({
      ...guardianFormValues,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    if (userType && user?.school_id !== undefined) {
      setNumberLoading(true);
      authService.getUniquePowerEduId(userType).then((res) => {
        setPowereduId(res?.data?.poweredu_id);
        setFormValues((prevValues) => ({
          ...prevValues,
          poweredu_id: res?.data?.poweredu_id,
        }));
      });
  
      authService.getUniqueAdmissionNo(user?.school_id).then((res) => {
        console.log(res?.data?.admission_number);
        setAdmissionNoPlaceholder(res?.data?.admission_number);
        setFormValues((prevValues) => ({
          ...prevValues,
          admission_number: res?.data?.admission_number,
        }));
        console.log(formValues);
        setNumberLoading(false);
      });
    }
  }, [userType]);

  const { classes } = useSelector((state) => state.manageClasses);

  const sortClassCodes = (a, b) => {
    const regex = /^(\d+)([A-Za-z]*)$/;
    const aMatch = a.class_code.match(regex);
    const bMatch = b.class_code.match(regex);

    if (aMatch && bMatch) {
      const aNum = parseInt(aMatch[1], 10);
      const bNum = parseInt(bMatch[1], 10);

      if (aNum !== bNum) {
        return aNum - bNum;
      }

      return aMatch[2].localeCompare(bMatch[2]);
    }

    return a.class_code.localeCompare(b.class_code);
  };

  useEffect(() => {
    if (classes?.data) {
      const sortedClasses = classes.data.slice().sort(sortClassCodes);
      setClassesDropdown(sortedClasses);
    }
  }, [classes]);

  useEffect(() => {
    setFormValues({
      ...formValues,
      poweredu_id: powereduId,
    });
  }, [powereduId]);

  useEffect(() => {
    if (
      userType &&
      user?.school_id !== undefined &&
      formValues.class_id !== null
    ) {
      if (userType === "Student") {
        authService
          .getUniqueRollNo(formValues.class_id)
          .then((res) => {
            setRollNoPlaceholder(res?.data?.roll_number);
            formValues.roll_number = res?.data?.roll_number;
          })
          .catch((error) => {});
      }
    }
  }, [formValues.class_id, userType]);

  useEffect(() => {
    setFormValues({
      ...formValues,
      // userType: userType,
      role: userType,
      school_id: user?.school_id,
    });

    setGuardianFormValues({
      ...guardianFormValues,
      school_id: user?.school_id,
    });

  }, [userType]);

  useEffect(() => {
    setFormValues({
      ...formValues,
      guardian: guardianFormValues,
    });
  }, [guardianFormValues]);

  return (
    <div className="px-4">
      <div className=" flex gap-4">
        <div className=" rounded-[20px] shadow-lg">
          <div
            className=" min-w-[250px] flex flex-col justify-center items-center gap-20 h-[82vh] rounded-[20px] relative"
            style={{ backgroundColor: themeProperties?.boxBackground }}
          >
            <div>
              <h1
                className=" text-2xl font-normal mb-5 top-10 absolute border-b-2"
                style={{
                  color: themeProperties?.textColor,
                  borderColor: themeProperties?.normal1,
                }}
              >
                New User Profile
              </h1>
              <UserProfileImage
                formValues={formValues}
                setFormValues={setFormValues}
                themeProperties={themeProperties}
              />
            </div>
            <UserTypeSelection
              userType={userType}
              setUserType={setUserType}
              themeProperties={themeProperties}
            />
          </div>
        </div>

        <div className=" flex-1 rounded-[20px] shadow-lg">
          <UserDetailsForm
            formValues={formValues}
            setFormValues={setFormValues}
            handleChange={(e) => handleChange(e, formValues, setFormValues)}
            handleGuardianChange={(e) => handleGuardianChange(e)}
            numberLoading={numberLoading}
            admissionNoPlaceholder={admissionNoPlaceholder}
            rollNoPlaceholder={rollNoPlaceholder}
            powereduId={powereduId}
            classesDropdown={classesDropdown}
            userType={userType}
            errorMsg={errorMsg}
            themeProperties={themeProperties}
            guardianFormValues={guardianFormValues}
            setGuardianFormValues={setGuardianFormValues}
            handleSubmit={(e) => {
              console.log("formValues", formValues);
              handleSubmit(
                e,
                formValues,
                setErrorMsg,
                setUserId,
                setPassword,
                setShowConfirmationModal
              );
            }}
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