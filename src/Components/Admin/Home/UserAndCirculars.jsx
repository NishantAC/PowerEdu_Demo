import React from "react";
import CircularsList from "./CircularsList";
import { selectThemeProperties } from "@/slices/theme";
import { useSelector } from "react-redux";
import format from "date-fns/format";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar";

const UserAndCirculars = ({ newlyAddedUsersArray, deviceSize }) => {
  const themeProperties = useSelector(selectThemeProperties);

  return (
    <div
      className="flex gap-2 p-2 rounded-[20px] max-lg:flex-col h-full overflow-hidden"
      style={{
        color: themeProperties.textColor,
      }}
    >
      {/* List of new users Box */}
      <div
        className="relative flex flex-col rounded-[20px] lg:w-[70%] xl:w-full h-full max-md:hidden"
        style={{
          background: themeProperties?.boxBackgroundSolid,
        }}
      >
        <div
          className="w-full rounded-t-[20px] flex items-center px-5 py-3 justify-center"
          style={{
            background: themeProperties?.boxBackgroundTop,
          }}
        >
          <div className="flex items-center gap-2 text-lg">
            <div
              style={{
                color: themeProperties.textColorAlt,
              }}
            >
              Newly Added Users
            </div>
          </div>
        </div>
        <div className="flex flex-col rounded-b-[20px] max-md:w-fit w-full overflow-auto h-[calc(100%-50px)]">
          <Table>
            <TableHeader>
              <TableRow style={{ color: themeProperties.textColorAlt }}>
                <TableHead className="px-6 py-3 text-left text-[12px] font-medium uppercase tracking-wider">
                  Name
                </TableHead>
                <TableHead className="px-6 py-3 text-left text-[12px] font-medium uppercase tracking-wider">
                  Designation
                </TableHead>
                <TableHead className="px-6 py-3 text-left text-[12px] font-medium uppercase tracking-wider text-nowrap">
                  Date of Joining
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody
              style={{ background: themeProperties?.boxBackgroundSolid }}
            >
              {newlyAddedUsersArray.map((user, index) => (
                <TableRow
                  key={index}
                  className="newUserList "
                  style={{
                    "--hover-bg": themeProperties.boxHoverColor,
                    "--hover-text": themeProperties.boxHoverTextColor,
                  }}
                >
                  <style>
                    {`
                      .newUserList:hover {
                        background: var(--hover-bg);
                        color: var(--hover-text);
                      }
                    `}
                  </style>

                  <TableCell
                    className="flex items-center gap-2"
                    style={{ color: themeProperties.textColor }}
                  >
                  <div className=" flex items-center mt-4 gap-4 cursor-pointer">
                  <Avatar>
                      <AvatarImage
                        src="https://github.com/shadcn.png"
                        alt="@shadcn"
                      />
                      <AvatarFallback>{
                        user?.name?.split(" ").map((item) => item[0])
                        }</AvatarFallback>
                    </Avatar>

                    <div className=" capitalize text-[15px]">{`${user?.name}`}</div>
                  </div>
                  </TableCell>
                  <TableCell
                    className="px-6 py-4 whitespace-nowrap text-[15px]"
                    style={{ color: themeProperties.textColor }}
                  >
                    {user.designation}
                  </TableCell>
                  <TableCell
                    className="px-6 py-4 whitespace-nowrap text-[15px]"
                    style={{ color: themeProperties.textColor }}
                  >
                    {format(new Date(user.date_of_joining), "dd MMMM yyyy")}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Circulars List Box */}
      <CircularsList />
    </div>
  );
};

export default UserAndCirculars;
