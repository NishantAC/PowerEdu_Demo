import React from "react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/Components/ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar";
import SelectTheme from "./SelectTheme";
import { SiAnalogue } from "react-icons/si";

const Profile = ({
  user,
  image,
  initial,
  themeProperties,
  logo,
  schoolData,
  data,
}) => {
  return (
    <div>
      <Popover>
        <PopoverTrigger>

        <div className="h-9 w-9 flex items-center justify-center rounded-full overflow-hidden "
        style={{
          border: `2px solid ${themeProperties?.textColorAlt}`  ,
          boxShadow: "0 1px 5px rgba(0, 0, 0, 0.2)",

        }}
        >
          {
            image ? 
            <img src={image} alt={user?.first_name} className="w-full h-full object-cover" />
            :
            <div className="w-full h-full flex items-center justify-center" style={{background: themeProperties?.specialColor, color: themeProperties?.textColorAlt, }}>

              {initial}
            </div>
          } 
        </div>
          
        </PopoverTrigger>

        <PopoverContent
          className=" absolute -right-4  p-0 "
          style={{
            background: themeProperties?.boxBackgroundSolid,
            color: themeProperties?.textColor,
          }}
        >
          {/* Triangle  */}

          <div className="absolute top-0 right-1.5 -mt-3">
            <svg
              width="17"
              height="15"
              viewBox="0 0 17 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.65701 1.32104C8.05015 0.704951 8.94985 0.704951 9.34299 1.32104L16.6119 12.7121C17.0367 13.3777 16.5585 14.25 15.7689 14.25H1.23111C0.441459 14.25 -0.0366552 13.3777 0.388124 12.7121L7.65701 1.32104Z"
                fill="white"
              />
            </svg>
          </div>

          <div className=" ">
            {/* User Name */}

            <div className="flex items-center gap-2 py-4 px-2 ">
              <Avatar className="">
                <AvatarImage src={image ? image : ""} alt={user?.firstname} />
                <AvatarFallback
                  className=""
                  style={{
                    background: themeProperties?.specialColor,
                    color: themeProperties?.textColorAlt,
                  }}
                >
                  {initial}
                </AvatarFallback>
              </Avatar>

              <div>
                <p className="text-[14px] font-work-sans">{`${user?.first_name} ${user?.middle_name || ''} ${user?.last_name}`}</p>
                <p
                  className="text-[12px] font-work-sans text-end"
                  style={{
                    color: themeProperties?.textColorLight,
                  }}
                >
                  {" "}
                  - {user?.email}
                </p>
              </div>
            </div>

            <hr />

            <div>
              {/* School Name and powered By  */}

              <hr />

              <div className="my-4">
                {/* Performance Analytics */}

                <div className=" px-2 flex items-center justify-center w-full">
                  <div className=" ">
                    {data.view_performance_button && (
                      <button
                        className="py-2 px-3 md:py-2 md:px-4 rounded-full text-sm text-nowrap"
                        style={{
                          background: themeProperties?.buttonColor,
                          color: themeProperties?.textColorAlt,
                        }}
                      >
                        <SiAnalogue className="inline-block mr-2" />
                        View Analytics
                      </button>
                    )}
                  </div>
                </div>
                <div className=" w-full flex items-center justify-center ">
                  <SelectTheme />
                </div>
              </div>


              <hr />

              <div className="flex items-center justify-start gap-4 py-4 px-2 ">
                <div className="flex items-center justify-center mb-4">
                  <Avatar className="">
                    <AvatarImage src={logo} alt={user?.firstname} />
                    <AvatarFallback
                      className=""
                      style={{
                        background: themeProperties?.normal3,
                        color: themeProperties?.textColorAlt,
                      }}
                    >
                      {schoolData?.name[0] ?? "S"}
                    </AvatarFallback>
                  </Avatar>
                </div>
                <div className="text-nowrap">
                  <p className="text-[12px] font-work-sans">
                    {schoolData?.name ?? "School Name"}
                  </p>
                  <p className="text-[10px] font-work-sans italic text-end">
                    - Powered By PowerEdu
                  </p>
                </div>
              </div>
            </div>


            
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default Profile;
