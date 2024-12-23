import React from "react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import SelectTheme from "./SelectTheme";

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
          <Avatar className="scale-90">
            <AvatarImage src={image ? image : ""} alt={user?.firstname} />
            <AvatarFallback
              className=""
              style={{
                background: themeProperties?.normal3,
                color: themeProperties?.textColorAlt,
              }}
            >
              {initial}
            </AvatarFallback>
          </Avatar>
        </PopoverTrigger>

        <PopoverContent
          className=" absolute -right-4  p-0"
          style={{
            background: themeProperties?.boxBackground,
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
                    background: themeProperties?.normal3,
                    color: themeProperties?.textColorAlt,
                  }}
                >
                  {initial}
                </AvatarFallback>
              </Avatar>

              <div>
                <p className="text-[14px] font-work-sans">{`${user?.firstname} ${user?.middlename} ${user?.lastname}`}</p>
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
              {/* <SelectTheme /> */}

              {/* School Name and powered By  */}
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
                      {schoolData?.school_name[0] ?? "S"}
                    </AvatarFallback>
                  </Avatar>
                </div>
                <div className="text-nowrap">
                  <p className="text-[12px] font-work-sans">
                    {schoolData?.school_name ?? "School Name"}
                  </p>
                  <p className="text-[10px] font-work-sans italic text-end">
                    - Powered By PowerEdu
                  </p>
                </div>
              </div>

              <hr />
              {/* Performance Analytics */}

              <div className="py-4 px-2 flex items-center justify-center w-full">
                <div className=" ">
                  {data.view_performance_button && (
                    <button
                      className="py-2 px-3 md:py-3 md:px-4 rounded-full text-[12px] border-2 text-nowrap"
                      style={{
                        background: themeProperties?.normal1,
                        color: themeProperties?.textColorAlt,
                      }}
                    >
                      View Performance Analytics
                    </button>
                  )}
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
