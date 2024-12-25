import React, { useEffect, useState } from "react";
import { IoMdPersonAdd } from "react-icons/io";
import { RiUploadCloud2Fill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

function CreateNewUserModal({themeProperties}) {
  const [deviceSize, setDeviceSize] = useState("pc");
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      const screenSize = window.innerWidth;
      if (screenSize < 640) {
        setDeviceSize("sm");
      } else if (screenSize < 768) {
        setDeviceSize("md");
      } else if (screenSize < 1024) {
        setDeviceSize("xl");
      } else if (screenSize < 1280) {
        setDeviceSize("2xl");
      } else {
        setDeviceSize("pc");
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <Dialog > 
      <DialogTrigger>
      <div
              style={{
                borderRadius: "10px",
                color: themeProperties.specialColor,
                cursor: "pointer",
                overflow: "hidden",
                background: themeProperties.boxBackgroundSolid,

              }}
            >
        <p className=" backdrop-blur-lg py-[10px] text-nowrap px-[20px] text-[14px] rounded-[20px] ">
             New User
        </p>
      </div>
      </DialogTrigger>
      <DialogContent className ="p-0 overflow-hidden"
        style={{
          color: themeProperties.textColorAlt}}
      >
        <DialogHeader>
          <DialogTitle
            className = "text-center p-4 text-2xl font-normal mb-10"
          style={{ color: themeProperties.textColorAlt, 
            background: themeProperties.boxBackgroundTop,
           }}

          >Create New User</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center">

          <div className=" min-h-60 bg-white flex items-center justify-center gap-8 p-4  max-sm:flex-col">
            <button className="no-underline"
            onClick={() => navigate("/admin/addUser")}
            >
              <div
                className={`bg-blue-50 flex flex-col justify-center items-center gap-4 cursor-pointer rounded-lg p-10 w-48`}
              >
                <div
                  className={`rounded-full  flex items-center justify-center`}>
                  <IoMdPersonAdd className="text-blue-600"  size={40} />
                </div>
                <p className="font-outfit text-base font-normal text-center tracking-wide text-gray-600">
                  Create New
                </p>
              </div>
            </button>
            <div
              className={`bg-teal-50 w-48 flex flex-col justify-center items-center gap-4 cursor-pointer rounded-lg p-10` }
            >
              <RiUploadCloud2Fill className="text-teal-600" size={40} />
              <p className="font-outfit text-base font-normal text-center tracking-wide text-gray-600 text-nowrap ">
                Upload From Rekor Id
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default CreateNewUserModal;