import React from "react";
import CircularsList from "./CircularsList";

import { selectThemeProperties } from "@/slices/theme";
import { useSelector } from "react-redux";

const UserAndCirculars = ({ newlyAddedUsersArray, deviceSize }) => {
  const themeProperties = useSelector(selectThemeProperties);

  return (
    <div
      className={`flex gap-2 p-2 rounded-[20px] max-lg:flex-col`}
      style={{
        color: themeProperties.textColor,
        background: themeProperties.secondaryColor,
      }}
    >
      {/* List of new users Box */}
      <div className={`h-[72vh] overflow-y-scroll relative flex flex-col rounded-[20px] shadow-md w-full bg-white  `}>
        <div
          className="w-full bg-gray-50 rounded-t-[20px] flex items-center px-5 py-3 justify-center "
        >
          <div className="flex items-center gap-2 text-lg">
            <div
              style={{
                color: themeProperties.normal2,
              }}
            >
              Newly Added Users
            </div>
          </div>
        </div>
        <div className="flex flex-col rounded-b-[20px] max-md:w-fit w-full h-full relative  ">
          <table className="min-w-full  h-full border-collapse "> 
            <thead className=" w-full sticky top-0  bg-gray-50 "

            >
              <tr className="" border = 'collapse'>
                <th className="px-6 py-3 text-left text-[12px]  font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-[12px] font-medium text-gray-500 uppercase tracking-wider">
                  Designation
                </th>
                <th className="px-6 py-3 text-left text-[12px]  font-medium text-gray-500 uppercase tracking-wider text-nowrap">
                  Date of Joining
                </th>
              </tr>
            </thead>
            <tbody className="bg-white   divide-gray-200 " >
              {newlyAddedUsersArray.map((user, index) => (
                <tr key={index} className="hover:bg-gray-100">
                  <td
                    className="whitespace-nowrap flex items-center gap-2 py-2"
                    style={{ color: themeProperties.textColorAlt }}
                  >
                    {user.imgSrc !== "" ? (
                      <img
                        src={user.imgSrc}
                        alt="Profile Pic"
                        className="w-10 h-10 rounded-full mt-4"
                      />
                    ) : (
                      <div
                        className="w-10 h-10 rounded-full mt-4"
                        style={{ background: themeProperties.secondaryColor }}
                      ></div>
                    )}
                    <div className="mt-4">{`${user.firstName} ${user.lastName}`}</div>
                  </td>
                  <td
                    className="px-6 py-4 whitespace-nowrap"
                    style={{ color: themeProperties.textColorAlt }}
                  >
                    {user.designation}
                  </td>
                  <td
                    className="px-6 py-4 whitespace-nowrap"
                    style={{ color: themeProperties.textColorAlt }}
                  >
                    {user.dateOfJoining}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Circulars List Box */}
      <CircularsList themeProperties={themeProperties} />
    </div>
  );
};

export default UserAndCirculars;