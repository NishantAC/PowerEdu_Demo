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
import { toast } from "sonner";
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

  const [formValues, setFormValues] = useState({
    poweredu_id: powereduId,
    password: "",
    role: "",
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
      school_id: 1,
      father_name: "",
      father_contact: "",
      mother_name: "",
      mother_contact: "",
      guardian_name: "",
      guardian_contact: "",
      address: "",
    },
  });

  useEffect(() => {
    if (userType && user?.school_id !== undefined) {
      const body = {
        school_code: user?.school_id,
        userType: userType,
      };
      authService
        .getUniquePowerEduId(userType)
        .then((res) => {
          powereduId(res?.data?.poweredu_id);
        })
        .catch((error) => {
          toast.error("Error in fetching Rekor Id");
        });

      authService
        .getUniqueAdmissionNo(body)
        .then((res) => {
          setAdmissionNoPlaceholder(res.admissionNo);
        })
        .catch((error) => {
          toast.error("Error in fetching Admission No");
        });
    }
  }, [user, userType]);

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
      console.log(sortedClasses);
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
          .catch((error) => {});
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
            admissionNoPlaceholder={admissionNoPlaceholder}
            rollNoPlaceholder={rollNoPlaceholder}
            classesDropdown={classesDropdown}
            userType={userType}
            errorMsg={errorMsg}
            themeProperties={themeProperties}
            handleSubmit={(e) =>
              handleSubmit(
                e,
                formValues,
                setErrorMsg,
                setUserId,
                setPassword,
                setShowConfirmationModal
              )
            }
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
