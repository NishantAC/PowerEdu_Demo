import React from "react";
import { Link } from "react-router-dom";
import "./ConfirmationModal.css";
import { IoMdClose } from "react-icons/io";



const ConfirmationModal = ({ close, userId, password,themeProperties }) => {
  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 z-[200] flex items-center justify-center openTransition  overflow-hidden rounded-[10px]">
      <div className="flex flex-col gap-0 w-[600px] rounded-[10px] "
      style={{ backgroundColor: themeProperties?.inputBackground}}
      >
        {/* heading box */}
        <div className="w-full h-14 flex justify-center items-center px-3  text-[18px] text-gray-700 rounded-t-[10px] relative"
        style={{ backgroundColor: themeProperties?.normal1, 
          color: themeProperties?.textColor,
        }}

        >
          <p>
          New user has been added 🎉
          </p>

          <button onClick={close} className="absolute right-0 p-2 cursor-pointer"
          style={{ color: themeProperties?.textColor}}
          >
            <IoMdClose  />
          </button>

        </div> 

        <div className="bg-white flex flex-col items-center my-20 gap-5 font-poppins text-gray-700">
          <div>
            <p className=" mb-8">
              Please note down the following credentials for future reference.
            </p>
            <div className=" border-l-2 pl-4 py-2">
            <p className="my-2 mb-4">
              <span >User ID:</span> {userId}
            </p>
            <p className="my-2">
              <span>Password:</span> {password}
            </p>
            </div>
          </div>

          <Link to="/admin/home">
            <button
              onClick={close}
              className="font-medium border-none outline-none rounded px-4 py-2 mt-10"

              style={{ backgroundColor: themeProperties?.normal3, 
                color: themeProperties?.textColor,
              }}
            >
              Go to Home
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;