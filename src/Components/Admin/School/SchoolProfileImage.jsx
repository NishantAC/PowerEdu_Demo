import React, { useState } from "react";
import { FaSchool } from "react-icons/fa";
import { MdEdit } from "react-icons/md";

function SchoolProfileImage({
  formValues,
  setFormValues,
  themeProperties,
  isEditingEnabled,
  profile_pic,
}) {
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setFormValues({
        ...formValues,
        profile_pic: reader.result,
        schoolImage: file,
      });
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col gap-5 items-center">
      {formValues.profile_pic ? (
        <div
          className="h-32 w-32 rounded-full bg-cover bg-center bg-no-repeat relative"
          style={{ backgroundImage: `url(${formValues.schoolImageUrl})` }}
        >
          <img
            src={formValues.profile_pic}
            alt="School Logo"
            className="w-full h-full object-cover rounded-full border-2"
            style={{
              borderColor: themeProperties.normal1,
            }}
          />
          {isEditingEnabled && (
            <label
              htmlFor="uploadSchoolImgBtn"
              className="absolute bottom-2 right-0 p-1 rounded-full cursor-pointer"
              style={{
                background: themeProperties.normal1,
                color: themeProperties.textColorAlt,
              }}
            >
              <MdEdit size={20} />
              <input
                id="uploadSchoolImgBtn"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
              />
            </label>
          )}
        </div>
      ) : (
        <div
          className="h-32 w-32 rounded-full grid place-content-center font-rubik font-medium text-4xl border-dotted border-2 border-gray-400"
          style={{
            background: themeProperties.boxBackground,
            border: `2px dotted ${themeProperties.normal1}`,
          }}
        >
          <FaSchool className="text-4xl" />
        </div>
      )}
    </div>
  );
}

export default SchoolProfileImage;
