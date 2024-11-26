import React, { useState } from "react";
import { FaUser } from "react-icons/fa";

function UserProfileImage({ formValues, setFormValues, themeProperties }) {

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setFormValues({
        ...formValues,
        imageUrl: reader.result,
        image: file,
      });
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col gap-5 items-center">
      {formValues.imageUrl ? (
        <div
          className="h-32 w-32 rounded-full bg-cover
          bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${formValues.imageUrl})` }}
        ></div>
      ) : (
        <div
          className="h-32 w-32 rounded-full grid place-content-center font-rubik font-medium text-4xl border-dotted border-2 border-gray-400"
          style={{ background: themeProperties.background, 
               border : `2px dotted ${themeProperties.normal1}`,
          }}
        >
          <FaUser className="text-4xl text-gray-700" />          
        </div>
      )}

      <div
        className=" px-6 h-10 border border-dotted rounded-lg relative flex items-center justify-center cursor-pointer"
        style={{ background: themeProperties.normal1 }}
      >
        <label
          htmlFor="uploadImgBtn"
          className=" cursor-pointer flex gap-2 items-center  "
          style={{ color: themeProperties.textColor }}
        >
          Upload Image
           <FaUser className="ml-2" />
        </label>

        <input
          id="uploadImgBtn"
          type="file"
          accept="image/*"
          className="hidden cursor-pointer"
          onChange={handleImageUpload}
        />
      </div>
    </div>
  );
}

export default UserProfileImage;