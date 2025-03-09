import React, { useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import {  useLocation, useNavigate } from "react-router-dom";
import "./EditProfile.css";
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
import ProfileImage from "./ProfileImage";
import ProfileForm from "./ProfileForm";
import { selectThemeProperties } from "@/slices/theme";
import SearchBarComponent from "@/Components/SearcBar/SearchBar";
import { toast } from "sonner";
import { handleChange } from "../../AddUser/fillUserInfoFunction";

function EditProfile() {
  const navigate = useNavigate();
  // const userDetailsString = localStorage.getItem("editUserDetails");
  const userDetails ={
    user_id : 1,
    profiletype : "students"
  };
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
    toast.success("Profile Updated Successfully", {
      description: "Profile Updated Successfully",
    });

    // navigate("/admin/profile/" + profiletype);
    // localStorage.removeItem("editUserDetails");

  };

  const fullName = `${formValues?.firstname || ''} ${formValues?.middlename || ''} ${formValues?.lastname || ''}`.trim();

  return (
    <div
      className=" h-full relative p-4"
    >
      <div className=" flex items-center h-full gap-4" >
        <div className=" h-full flex flex-col gap-5 items-center justify-center shadow-md px-6 rounded-[15px] "
        style={{
          backgroundColor: themeProperties.boxBackgroundSolid,
        }}
        >
          <ProfileImage formValues={formValues}  themeProperties={themeProperties} profiletype= {profiletype} name = {fullName} handlechange={handleChange}/>
        </div>
        <div
          className=" h-full flex flex-1 flex-col gap-5 items-center justify-center shadow-md px-6 rounded-[15px] "
          style={{
            backgroundColor: themeProperties.boxBackgroundSolid,
          }}
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
                      className=" px-4 absolute right-10 bottom-6 py-2 rounded-lg hover:scale-95 transition-all duration-300"
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
    </div>
  );
}

export default EditProfile;
