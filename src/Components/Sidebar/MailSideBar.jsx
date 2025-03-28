import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEnvelope } from "react-icons/fa";
import { MenuContext } from "@/context/Menu/MenuContext";
import { useSelector } from "react-redux";
import { selectThemeProperties } from "@/slices/theme";
import { useParams } from "react-router-dom";
import { SiMinutemailer } from "react-icons/si";
import { MdDelete } from "react-icons/md";
import { IoDocument, IoPencil } from "react-icons/io5";
import { RiSpam2Fill } from "react-icons/ri";
import { FaAngleDown } from "react-icons/fa";
import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar";
import { logoutGoogle } from "@/services/mail.service";
import { FaStar, FaInbox } from "react-icons/fa";
import { LuMails } from "react-icons/lu";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/Components/ui/popover";
import { checkAuth } from "@/services/mail.service";
import { toast } from "sonner";
import { Skeleton } from "@mui/material";

const MailItems = [
  { name: "Inbox", route: "/mail/inbox", icon: FaInbox },
  { name: "Sent", route: "/mail/sent", icon: SiMinutemailer },
  { name: "Draft", route: "/mail/draft", icon: IoDocument },
  { name: "Trash", route: "/mail/trash", icon: MdDelete },
  { name: "All Mails", route: "/mail/all-mails", icon: FaEnvelope },
  { name: "Promotion", route: "/mail/promotion", icon: RiSpam2Fill },
  { name: "Starred", route: "/mail/starred", icon: FaStar },
];

function MailSideBar({
  setShowMailItems,
  userType,
  setIsCollapsed,
  isCollapsed,
}) {
  const navigate = useNavigate();
  const themeProperties = useSelector(selectThemeProperties);
  const { mode } = useParams();
  const [user, setUser] = useState({});

  useEffect(() => {
    const checkUserAuthorization = async () => {
      try {
        const response = await checkAuth();
        setUser(response?.data?.data?.userDetails);
      } catch (error) {
        console.error(error);
        toast.error("Login", {
          description: "Login using your Google Account",
        });
      }
    };
    checkUserAuthorization();
  }, []);
  const logout = async () => {
    const response = await logoutGoogle();
    if (response?.data?.message === "Google token removed successfully") {
      toast.success("Logout", { description: "Logged out successfully" });
    }
    setIsAuthorised(false);
  };

  return (
    <div className="Sidebarlist overflow-y-auto flex-grow select-none mail-item ">
      <div className="flex pb-4 mb-4 mt-10 items-center justify-center gap-4 border-b-2">
        <div>
          <Popover>
            <PopoverTrigger asChild className=" ">
              <div className="flex items-center gap-4 cursor-pointer flex-col ">
                <Avatar>
                  <AvatarImage src={user?.picture} />
                  <AvatarFallback
                    style={{
                      backgroundColor: themeProperties?.backgroundColor,
                    }}
                  ></AvatarFallback>
                </Avatar>

                <div
                  className="text-lg text-white header w-full text-center"
                  style={{ color: themeProperties.textColorAlt }}
                >
                  {user?.name?.split(" ")[0] || ""}
                </div>
              </div>
            </PopoverTrigger>

            <PopoverContent className="shadow-2xl w-full p-0  relative left-10 -top-9 rounded-[20px] overflow-hidden outline-none border-0">
              <div className="shadow-lg overflow-hidden outline-none w-96">
                <div
                  className="flex flex-col items-center p-6 border-b"
                  style={{
                    backgroundColor: themeProperties?.normal1,
                    color: themeProperties.textColorAlt,
                    outline: themeProperties.primaryColor,
                  }}
                >
                  <div className="relative">
                    <div className="">
                      <Avatar>
                        <AvatarImage src={user?.picture} />
                        <AvatarFallback
                          style={{
                            backgroundColor: themeProperties.sideBarColor,
                          }}
                        ></AvatarFallback>
                      </Avatar>
                    </div>
                  </div>
                  <h3 className="mt-4 text-lg font-medium">
                    {`Hi ${user?.name} !`}
                  </h3>
                  <a
                    href="https://myaccount.google.com/"
                    target="_blank"
                    rel="noreferrer"
                    className=" text-sm mt-2 hover:underline"
                    style={{ color: themeProperties.textColorAlt }}
                  >
                    Manage your Google Account
                  </a>
                </div>
                <div
                  className="p-6 text-sm"
                  style={{ color: themeProperties.textColor }}
                >
                  <div className="flex items-center gap-2">
                    <p className="">Signed in as:</p>
                    <p
                      className="font-medium underline"
                      style={{ color: themeProperties.normal1 }}
                    >
                      {user?.email}
                    </p>
                  </div>
                  <div className="mt-4 flex flex-col gap-3">
                    <button className="py-2 px-4 bg-gray-200 rounded-lg transition duration-200">
                      Login into another account
                    </button>
                    <button
                      className="py-2 px-4 rounded-lg"
                      style={{
                        backgroundColor: themeProperties.logoutColor,
                        color: themeProperties.textColorAlt,
                      }}
                      onClick={logout}
                    >
                      Sign out of Google Account
                    </button>
                  </div>
                  <div className="mt-6">
                    <p className="text-gray-700 mb-2">Storage:</p>
                    <div className="w-full bg-gray-300 h-2 rounded-lg">
                      <div
                        className="bg-gradient-to-r from-blue-500 to-indigo-500 h-full rounded-lg"
                        style={{ width: "80%" }}
                      ></div>
                    </div>
                    <p className="text-sm mt-1">80% used</p>
                  </div>
                </div>
                <div className="text-center text-xs text-gray-500 p-4 border-t">
                  <a href="#" className="hover:underline">
                    Privacy policy
                  </a>{" "}
                  ·{" "}
                  <a href="#" className="hover:underline">
                    Terms of service
                  </a>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {MailItems.map((item) => (
        <Link
          to={userType.toLowerCase() + item.route}
          key={item.name}
          className={`flex items-center p-3 rounded-lg transition-colors duration-200 my-5`}
          style={{
            "--before-color":
              mode == item.name.toLowerCase()
                ? themeProperties.sideBarText
                : "",
            "--hover-color":
              mode != item.name.toLowerCase() && themeProperties.sideBarButton,
          }}
          onClick={() => {
            localStorage.setItem("mailPath", item.route);
          }}
        >
          <style>
            {`
              a:hover {
                      background: var(--hover-color);
                }

                  a::before {
                              content: "";
                              position: absolute;
                              left: 0px;
                              width: 2px;
                              height: 20px;
                              background-color: var(--before-color);
                    }
                `}
          </style>
          <item.icon className="icon mr-3" />
          <span className="icon-name text-sm font-medium">{item.name}</span>
        </Link>
      ))}
      <button
        className={`flex items-center p-3 rounded-lg transition-colors duration-200 my-3 w-full`}
        style={{
          background: themeProperties.normal2,
        }}
        onClick={() => {
          setIsCollapsed(false);
          if (isCollapsed) {
            setTimeout(() => {
              setShowMailItems(false);
            }, 250);
          } else {
            setShowMailItems(false);
          }
        }}
      >
        <FaAngleDown className="icon rotate-90 mr-3 " />
        <span className="icon-name text-sm font-medium">Menu</span>
      </button>
    </div>
  );
}

export default MailSideBar;
