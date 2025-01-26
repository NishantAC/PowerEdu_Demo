import React, { useEffect, useState } from "react";
import styles from "./TabProfile.module.css";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import SubjectTeacherService from "../../../../services/subjectteacher.service";
import authService from "../../../../services/auth.service";
// import { fetchTeachersProfile } from "../../../../slices/principal";
import { getCurrentTeacherData } from "../../../../slices/subjectteacher";
import InputField from "@/Components/InputField/InputField";
import { selectThemeProperties } from "@/slices/theme";

function TabProfile({ currentteacher }) {
  const themeProperties = useSelector(selectThemeProperties);
  const [classes, setClasses] = React.useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    const getClasses = async () => {
      try {
        const res = await SubjectTeacherService.getClassIds(
          currentteacher?.user_id
        );

        setClasses(Object.keys(res.subjects));
      } catch (error) {}
    };
    getClasses();
  }, [currentteacher]);
  // const image = useSelector((state) => state.image);
  const [userData, setUserData] = useState(currentteacher);

  useEffect(() => {
    setUserData(currentteacher);
  }, [currentteacher]);

  return (
    <div className="p-6 bg-white rounded-[20px]">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className=" text-start ">
          <label className="block text-sm">First Name</label>
          <p
            className="p-2 rounded-md border-2"
            style={{
              borderColor: themeProperties.borderColorLight,
              color: `${themeProperties.textColor}`,
              transition: "all 0.25s linear",
            }}
          >
            {userData?.firstname || "Not Available"}
          </p>
        </div>
        <div className=" text-start ">
          <label className="block text-sm">Middle Name </label>
          <p
            className="p-2 rounded-md border-2"
            style={{
              borderColor: themeProperties.borderColorLight,
              transition: "all 0.25s linear",
            }}
          >
            {userData?.middlename || "Not Available"}
          </p>
        </div>
        <div className=" text-start ">
          <label className="block text-sm">Last Name</label>
          <p
            className="p-2  rounded-md border-2"
            style={{
              borderColor: themeProperties.borderColorLight,
              transition: "all 0.25s linear",
            }}
          >
            {userData?.lastname || "Not Available"}
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        <div className=" text-start ">
          <label className="block text-sm">Class</label>
          <p
            className="p-2  rounded-md border-2"
            style={{
              borderColor: themeProperties.borderColorLight,
              transition: "all 0.25s linear",
            }}
          >
            {classes || "Not Available"}
          </p>
        </div>
        <div className=" text-start ">
          <label className="block text-sm">D.O.B.</label>
          <p
            className="p-2  rounded-md border-2"
            style={{
              borderColor: themeProperties.borderColorLight,
              transition: "all 0.25s linear",
            }}
          >
            {userData?.dob || "Not Available"}
          </p>
        </div>
        <div className=" text-start ">
          <label className="block text-sm">Teacher ID</label>
          <p
            className="p-2  rounded-md border-2"
            style={{
              borderColor: themeProperties.borderColorLight,
              transition: "all 0.25s linear",
            }}
          >
            {userData?.user_id || "Not Available"}
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        <div className=" text-start ">
          <label className="block text-sm">Date Of Joining</label>
          <p
            className="p-2  rounded-md border-2"
            style={{
              borderColor: themeProperties.borderColorLight,
              transition: "all 0.25s linear",
            }}
          >
            {userData?.doj || "Not Available"}
          </p>
        </div>
        <div className=" text-start ">
          <label className="block text-sm">Email</label>
          <p
            className="p-2  rounded-md border-2"
            style={{
              borderColor: themeProperties.borderColorLight,
              transition: "all 0.25s linear",
            }}
          >
            {userData?.email || "Not Available"}
          </p>
        </div>
        <div className=" text-start ">
          <label className="block text-sm">Qualification</label>
          <p
            className="p-2  rounded-md border-2"
            style={{
              borderColor: themeProperties.borderColorLight,
              transition: "all 0.25s linear",
            }}
          >
            {userData?.qualification || "Not Available"}
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        <div className=" text-start ">
          <label className="block text-sm">Father Name</label>
          <p
            className="p-2  rounded-md border-2"
            style={{
              borderColor: themeProperties.borderColorLight,
              transition: "all 0.25s linear",
            }}
          >
            {userData?.fathername || "Not Available"}
          </p>
        </div>
        <div className=" text-start ">
          <label className="block text-sm">Mother Name</label>
          <p
            className="p-2  rounded-md border-2"
            style={{
              borderColor: themeProperties.borderColorLight,
              transition: "all 0.25s linear",
            }}
          >
            {userData?.mothername || "Not Available"}
          </p>
        </div>
        <div className=" text-start ">
          <label className="block text-sm">Guardian Name (optional)</label>
          <p
            className="p-2  rounded-md border-2"
            style={{
              borderColor: themeProperties.borderColorLight,
              transition: "all 0.25s linear",
            }}
          >
            {userData?.guardianname || "Not Available"}
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 mt-4">
        <div className=" text-start ">
          <label className="block text-sm">Address Line 1</label>
          <p
            className="p-2  rounded-md border-2"
            style={{
              borderColor: themeProperties.borderColorLight,
              transition: "all 0.25s linear",
            }}
          >
            {userData?.address1 || "Not Available"}
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 mt-4">
        <div className=" text-start ">
          <label className="block text-sm">Address Line 2</label>
          <p
            className="p-2  rounded-md border-2"
            style={{
              borderColor: themeProperties.borderColorLight,
              transition: "all 0.25s linear",
            }}
          >
            {userData?.address2 || "Not Available"}
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <div className=" text-start ">
          <label className="block text-sm">Home Contact No.</label>
          <p
            className="p-2  rounded-md border-2"
            style={{
              borderColor: themeProperties.borderColorLight,
              transition: "all 0.25s linear",
            }}
          >
            {userData?.fathercontact || "Not Available"}
          </p>
        </div>
        <div className=" text-start ">
          <label className="block text-sm">Mother Contact No.</label>
          <p
            className="p-2  rounded-md border-2"
            style={{
              borderColor: themeProperties.borderColorLight,
              transition: "all 0.25s linear",
            }}
          >
            {userData?.mothercontact || "Not Available"}
          </p>
        </div>
      </div>
    </div>
  );
}

export default TabProfile;
