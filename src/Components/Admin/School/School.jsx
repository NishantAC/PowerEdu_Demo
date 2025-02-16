import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import SpSchoolInfoService from "../../../services/sp_schoolinfo.service";
import { useSelector } from "react-redux";
import { selectThemeProperties } from "@/slices/theme";
import InputField from "@/Components/InputField/InputField";
import { MdEdit } from "react-icons/md";
import SchoolProfileImage from "./SchoolProfileImage";

function Schools() {
  const { user } = useSelector((state) => state.user);
  const school_id = user?.school_id;
  const [profile_pic, setProfilePic] = useState(null);
  const [formValues, setFormValues] = useState({
    name: "",
    address: "",
    email: "",
    phone_number: "",
    license: "",
    board: "",
    profile_pic: "",
  });

  useEffect(() => {
    SpSchoolInfoService.getInfoSchool(school_id)
      .then((data) => {
        setProfilePic(data?.profile_pic);
        setFormValues({
          name: data?.name,
          address: data?.address,
          email: data?.email,
          phone_number: data?.phone_number,
          license: data?.license,
          board: data?.board,
          profile_pic: data?.profile_pic,
        });
      })
      .catch((error) => {
        console.error("Error fetching school info:", error);
        toast.error("Failed to fetch school info.");
      });
  }, []);

  const themeProperties = useSelector(selectThemeProperties);

  const [isEditingEnabled, setEditingEnabled] = useState(false);

  const changeEditingStatus = () => {
    setEditingEnabled(true);
    toast.info("Editing Enabled", {
      description: "You can now edit the school information",
    });
  };

  const handleChange = (e, key) => {
    setFormValues((prev) => ({
      ...prev,
      [key]: e.target.value,
    }));
  };

  const updateSchoolInfo = (school_id) => {
    SpSchoolInfoService.updateSchoolInfo(formValues, school_id)
      .then((response) => {
        toast.success("School Information Updated Successfully");
        setEditingEnabled(false); // Disable editing after save
      })
      .catch((error) => {
        console.error("Error in Updating School Info", error);
        toast.error("Failed to update school information.");
      });
  };

  const handleCancel = () => {
    setEditingEnabled(false);
    SpSchoolInfoService.getInfoSchool(school_id)
    .then((data) => {
      setProfilePic(data?.profile_pic);
      setFormValues({
        name: data?.name,
        address: data?.address,
        email: data?.email,
        phone_number: data?.phone_number,
        license: data?.license,
        board: data?.board,
        profile_pic: data?.profile_pic,
      });
    })
    .catch((error) => {
      console.error("Error fetching school info:", error);
      toast.error("Failed to fetch school info.");
    });
  };

  return (
    <div className=" p-6">
      <div className="flex flex-col gap-4">
        <div
          className="shadow-sm rounded-[15px] overflow-hidden relative"
          style={{
            backgroundColor: themeProperties?.boxBackgroundSolid,
            color: themeProperties?.textColor,
          }}
        >
          <div
            className="h-16 rounded-t-md px-4 flex items-center justify-between"
            style={{
              backgroundColor: themeProperties?.normal1,
              color: themeProperties?.textColorAlt,
            }}
          >
            <div className="">School Details</div>
          </div>

          <div className=" flex justify-between items-center p-10 mt-10">
            <div>
              <SchoolProfileImage
                formValues={formValues}
                setFormValues={setFormValues}
                themeProperties={themeProperties}
                profile_pic={profile_pic}
                isEditingEnabled={isEditingEnabled}
              />
            </div>
            <div>
              <div className="flex flex-wrap gap-10 p-5">
                <InputField
                  placeholder={"School Name"}
                  label="Name"
                  value={formValues.name}
                  handleChange={(e) => handleChange(e, "name")}
                  disable={!isEditingEnabled}
                />

                <InputField
                  placeholder={"Address"}
                  label="Address"
                  value={formValues.address}
                  handleChange={(e) => handleChange(e, "address")}
                  disable={!isEditingEnabled}
                />

                <InputField
                  label="E-mail"
                  placeholder={"Email"}
                  value={formValues.email}
                  handleChange={(e) => handleChange(e, "email")}
                  disable={!isEditingEnabled}
                />
              </div>
              <div className="flex flex-wrap gap-10 p-5">
                <InputField
                  label="Phone No."
                  placeholder={"Phone Number"}
                  value={formValues.phone_number}
                  handleChange={(e) => handleChange(e, "phNo")}
                  disable={!isEditingEnabled}
                />

                <InputField
                  label="No. of License"
                  placeholder={"License"}
                  value={formValues.license}
                  handleChange={(e) => handleChange(e, "license")}
                  disable={!isEditingEnabled}
                />

                <InputField
                  label="Board"
                  placeholder={"Board"}
                  value={formValues.board}
                  handleChange={(e) => handleChange(e, "board")}
                  disable={!isEditingEnabled}
                />
              </div>
            </div>
          </div>

          <div
            className="flex justify-end gap-4 p-5"
            style={{
              display: isEditingEnabled ? "none" : "flex",
            }}
          >
            <button
              className="px-6 py-2 rounded-md flex justify-center items-center gap-5 border-none outline-none "
              onClick={() => changeEditingStatus()}
              style={{
                backgroundColor: themeProperties?.normal1,
                color: themeProperties?.textColorAlt,
              }}
            >
              <div className="">Edit</div>
              <MdEdit size={20} color={themeProperties?.textColorAlt} />
            </button>
          </div>

          {isEditingEnabled && (
            <div className="flex justify-end gap-4 p-5">
              <button
                className="px-6 py-2 rounded-md"
                onClick={() => updateSchoolInfo(school_id)}
                style={{
                  backgroundColor: themeProperties?.normal1,
                  color: themeProperties?.textColorAlt,
                }}
              >
                Update
              </button>
              <button
                className="px-6 py-2 rounded-md"
                onClick={handleCancel}
                style={{
                  backgroundColor: themeProperties?.logoutColor,
                  color: themeProperties?.textColorAlt,
                }}
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>
      <Link
        to="/admin/manage-classes"
        className="absolute bottom-5 right-5 px-6 rounded-lg py-2"
        style={{
          backgroundColor: themeProperties?.normal1,
          color: themeProperties?.textColorAlt,
        }}
      >
        Manage Classes
      </Link>
    </div>
  );
}

export default Schools;