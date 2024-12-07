import React, { useContext , useState} from "react";
import { Link } from "react-router-dom";
import { FaEnvelope } from "react-icons/fa";
import { MenuContext } from "@/context/Menu/MenuContext";
import { useSelector } from "react-redux";
import { selectThemeProperties } from "@/slices/theme";
import { useParams } from "react-router-dom";
import { SiMinutemailer } from "react-icons/si";
import { MdDelete } from "react-icons/md";
import { IoDocument,IoPencil } from "react-icons/io5";
import { RiSpam2Fill } from "react-icons/ri";
import {  FaAngleDown } from "react-icons/fa";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

const MailItems = [
  { name: "Inbox", route: "/mail/inbox", icon: FaEnvelope },
  { name: "Sent", route: "/mail/sent", icon: SiMinutemailer },
  { name: "Draft", route: "/mail/draft", icon: IoDocument },
  { name: "Trash", route: "/mail/trash", icon: MdDelete },
  { name: "Compose", route: "/mail/compose", icon: IoPencil },
  { name: "Promotion", route: "/mail/promotion", icon: RiSpam2Fill },
];

function MailSideBar({ setShowMailItems, userType, setIsCollapsed , isCollapsed}) {
  const themeProperties = useSelector(selectThemeProperties);
  const {mode } = useParams();

  return (
    <div className="Sidebarlist overflow-y-auto flex-grow select-none mail-item ">

      <div className="flex pb-4 mb-4 mt-10 items-center justify-center gap-4 border-b-2">
        <div>
        <Popover>
        <PopoverTrigger asChild className=" ">
        <div className="flex items-center gap-4 cursor-pointer flex-col ">
          <div className=" h-10 p-1 rounded-full relative border-2 w-10  "
          style={{ background: themeProperties.primaryColor, borderColor: themeProperties.textColor

           }}
          >

          </div>

          <div
          className="text-lg text-white header w-full text-center"
          style={{ color: themeProperties.textColor }}
        >Nishant</div>
      </div>
        </PopoverTrigger>

        <PopoverContent className="shadow-2xl p-0 rounded-lg bg-white w-44 relative left-4">
          <div className="shadow-lg rounded-xl overflow-hidden outline-none w-96 bg-white">
            <div className="flex flex-col items-center p-6 bg-gradient-to-r from-purple-500 to-indigo-500 border-b">
              <div className="relative">
                <div className="w-16 h-16 rounded-full bg-purple-200 flex items-center justify-center">
                  {/* Placeholder for avatar */}
                  <span className="text-lg font-bold text-white">N</span>
                </div>
              </div>
              <h3 className="mt-4 text-lg font-medium text-white">{ "Hi, Nishant!"}</h3>
              <a href="https://myaccount.google.com/" target="_blank" rel="noreferrer"
                className="text-blue-200 text-sm mt-2 hover:underline"
              >
                Manage your Google Account
              </a>
            </div>
            <div className="p-6 text-sm">
              <p className="text-gray-700">Signed in as:</p>
              <p className="font-medium">demo@gmail.com</p>
              <div className="mt-4 flex flex-col gap-3">
                <button className="py-2 px-4 bg-gray-200 rounded-lg hover:bg-gray-300 transition duration-200">
                  Add another account
                </button>
                <button className="py-2 px-4 bg-gray-200 rounded-lg hover:bg-gray-300 transition duration-200">
                  Sign out of all accounts
                </button>
              </div>
              <div className="mt-6">
                <p className="text-gray-700 mb-2">Storage:</p>
                <div className="w-full bg-gray-300 h-2 rounded-lg">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-indigo-500 h-full rounded-lg"
                    style={{ width: '80%' }}
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
            background: mode == item.name.toLowerCase() ? themeProperties.sideBarButton : "",
            border : mode == item.name.toLowerCase() ? `2px solid ${themeProperties.textColor}` : ``,
            "--hover-color": themeProperties.sideBarButton,
          }}
        >
              <style>
              {`
              a:hover {
                      background: var(--hover-color);
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