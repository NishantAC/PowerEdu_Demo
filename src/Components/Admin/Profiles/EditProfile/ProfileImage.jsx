import React, { useState } from "react";
import { FaUser } from "react-icons/fa";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const ProfileImage = ({ formValues, themeProperties, profiletype, name, handlechange }) => {
  const [imageUrl, setImageUrl] = useState(formValues?.imageUrl || "");

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result);
        handlechange({ target: { name: 'imageUrl', value: reader.result } });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col gap-5 items-center w-48">
      <h1 className="text-2xl font-semiBold underline-offset-2 underline mb-4 absolute top-10 z-[100000]">
        {profiletype === "students"
          ? "Student"
          : profiletype === "teachers"
          ? "Teacher"
          : profiletype === "principal"
          ? "Principal"
          : profiletype === "accountant"
          ? "Accountant"
          : profiletype === "staff"
          ? "Staff"
          : ""} Profile
      </h1>
      <div className="flex flex-col gap-5 items-center">
        {imageUrl ? (
          <div
            className="h-32 w-32 rounded-full bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${imageUrl})` }}
          ></div>
        ) : (
          <div
            className="h-32 w-32 rounded-full grid place-content-center font-rubik font-medium text-4xl border-dotted border-2 border-gray-400"
            style={{ background: themeProperties.boxBackground, border: `2px dotted ${themeProperties.normal1}` }}
          >
            <FaUser className="text-4xl text-gray-700" />
          </div>
        )}

        {name}

        <div
          className="px-6 h-10 border border-dotted rounded-lg relative flex items-center justify-center cursor-pointer"
          style={{ background: themeProperties.buttonColor }}
        >
          <label
            htmlFor="uploadImgBtn"
            className="cursor-pointer flex gap-2 items-center"
            style={{ color: themeProperties.textColorAlt }}
          >
            Upload Image
            <FaUser className="ml-2" />
          </label>

          <input
            id="uploadImgBtn"
            type="file"
            accept="image/*"
            className="hidden cursor-pointer"
            onChange={handleImageChange}
          />
        </div>

        <Dialog>
          <DialogTrigger
            className="w-fit px-4 py-2 rounded-lg text-white font-rubik font-medium flex items-center justify-center absolute bottom-10"
            style={{
              backgroundColor: themeProperties.logoutColor,
            }}
          >
            Delete Account
          </DialogTrigger>
          <DialogContent
            className="w-full max-w-md"
            style={{
              backgroundColor: themeProperties.boxBackgroundSolid,
            }}
          >
            <DialogHeader>
              <DialogTitle>Delete Account</DialogTitle>
              <DialogDescription className="text-sm text-muted-foreground pt-10">
                Your request to delete the account has been submitted. You will be notified once the account is deleted.
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default ProfileImage;