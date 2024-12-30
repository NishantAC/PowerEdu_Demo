import React, { useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import WestIcon from "@mui/icons-material/West";
import SelectBox from "./SelectBox";
import { Link, useLocation } from "react-router-dom";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import "./EditProfile.css";
import InputParent from "./InputParent";
import DeleteConfirmationModal from "./Modal/DeleteConfirmationModal";
import DeleteConfirmedModal from "./Modal/DeleteConfirmedModal";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchStudentDetails,
  updateStudentDetails,
} from "../../../../slices/student";
import {
  fetchOtherManagementMemebrDetails,
  fetchTeacherDetails,
  updateOtherManagementMemebrDetails,
  updateTeacherDetails,
} from "../../../../slices/admin";
import InputField from "@/Components/InputField/InputField";
import ProfileImage from "./ProfileImage";
import ProfileForm from "./ProfileForm";
import { selectThemeProperties } from "@/slices/theme";

function EditProfile() {
  const location = useLocation();
  const userDetailsString = localStorage.getItem("editUserDetails");
  const userDetails = JSON.parse(userDetailsString);
  const { user_id, profiletype } = userDetails;
  const { student, loading } = useSelector((state) => state.student);
  const { teacher, otherManagementMember } = useSelector(
    (state) => state.admin
  );
  const themeProperties = useSelector(selectThemeProperties);

  const dispatch = useDispatch();
  useEffect(() => {
    if (profiletype === "students") {
      dispatch(
        fetchStudentDetails({
          user_id: user_id,
        })
      );
    } else {
      dispatch(
        fetchTeacherDetails({
          user_id: user_id,
        })
      );
    }
  }, []);

  useEffect(() => {
    if (profiletype === "students") {
      dispatch(
        fetchStudentDetails({
          user_id: user_id,
        })
      );
    } else if (profiletype === "teachers") {
      dispatch(
        fetchTeacherDetails({
          user_id: user_id,
        })
      );
    } else {
      dispatch(
        fetchOtherManagementMemebrDetails({
          user_id: user_id,
        })
      );
    }
  }, [user_id]);

  const user =
    profiletype === "students" &&
    !(Object.keys(student).length === 0 && student.constructor === Object)
      ? student
      : profiletype === "teachers" &&
        !(Object.keys(teacher).length === 0 && teacher.constructor === Object)
      ? teacher
      : !(
          Object.keys(otherManagementMember).length === 0 &&
          otherManagementMember.constructor === Object
        )
      ? otherManagementMember
      : "";

  const [formValues, setFormValues] = useState(user);

  useEffect(() => {
    setFormValues(user);
  }, [user]);

  const handleSubmit = (values) => {
    if (profiletype === "students") {
      dispatch(updateStudentDetails(values));
    } else if (profiletype === "teachers") {
      dispatch(updateTeacherDetails(values));
    } else {
      dispatch(updateOtherManagementMemebrDetails(values));
    }
  };

  const [showDeleteConfirmationModal, setShowDeleteConfirmationModal] =
    useState(false);

  return (
    <div
      className=" h-full"
    >
      <div className=" flex justify-center items-center h-full">
        <div className="">
          <ProfileImage formValues={formValues} setShowDeleteConfirmationModal={setShowDeleteConfirmationModal} themeProperties={themeProperties} />
        </div>
        <div
          className=""
        >
          <Formik
            initialValues={formValues}
            enableReinitialize
            onSubmit={handleSubmit}
          >
            {({ values, handleChange }) => (
              <Form>
                <ProfileForm
                  profiletype={profiletype}
                  values={values}
                  handleChange={handleChange}
                  themeProperties={themeProperties}
                />
     
                  <div className=" ">
                    <button
                      className=" px-4 absolute ri py-2 rounded-lg hover:scale-95 transition-all duration-300"
                      type="submit"
                      style={{
                        backgroundColor: themeProperties.buttonColor,
                        color : themeProperties.textColorAlt,
                      }}
                    >
                      Save
                    </button>
                  </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
      {showDeleteConfirmationModal && <DeleteConfirmedModal />}
    </div>
  );
}

export default EditProfile;
