import React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import InboxIcon from "@mui/icons-material/Inbox";
import NearMeOutlinedIcon from "@mui/icons-material/NearMeOutlined";
import SaveAsOutlinedIcon from "@mui/icons-material/SaveAsOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import StarIcon from "@mui/icons-material/Star";
import {FaSignOutAlt} from "react-icons/fa";

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

const TeacherMailTabs = ({
  value,
  handleChange,
  toggleItem,
  newInboxEmail,
  logout,
  themeProperties,
}) => {
  return (
    <div className=" h-full ">
      <Box className="">
          <Tabs
            orientation="vertical"
            value={value}
            onClick={toggleItem}
            onChange={handleChange}
            aria-label="Vertical tabs example"
            className="mx-auto min-w-[200px]"
            TabIndicatorProps={{ style: { backgroundColor: "#3b82f6" } }}
          >
            <Tab
              icon={<EmailOutlinedIcon className="text-xl align-middle" />}
              iconPosition="start"
              label="Compose Mail"
              {...a11yProps(0)}
              className="bg-blue-600 text-white justify-start min-h-[45px] px-7 text-lg font-semibold rounded-lg mb-4 capitalize hover:bg-blue-700"
            />
            <Tab
              icon={<InboxIcon className="text-xl align-middle" />}
              iconPosition="start"
              label={
                <span>
                  Inbox{" "}
                  {newInboxEmail > 0 ? (
                    <span className="absolute right-0 bg-blue-600 text-white rounded-md px-2 py-1 bottom-2">
                      {newInboxEmail}
                    </span>
                  ) : (
                    <></>
                  )}
                </span>
              }
              {...a11yProps(1)}
              className={`text-gray-400 justify-start min-h-[45px] px-7 text-lg font-semibold mb-2 capitalize hover:text-blue-600 ${
                value === 1 ? "text-blue-600" : ""
              }`}
            />
            <Tab
              icon={<InboxIcon className="text-xl align-middle" />}
              iconPosition="start"
              label={
                <span>
                  Promotion{" "}
                  {newInboxEmail > 0 ? (
                    <span className="absolute right-0 bg-blue-600 text-white rounded-md px-2 py-1 bottom-2">
                      {newInboxEmail}
                    </span>
                  ) : (
                    <></>
                  )}
                </span>
              }
              {...a11yProps(2)}
              className={`text-gray-400 justify-start min-h-[45px] px-7 text-lg font-semibold mb-2 capitalize hover:text-blue-600 ${
                value === 2 ? "text-blue-600" : ""
              }`}
            />
            <Tab
              icon={<NearMeOutlinedIcon className="text-xl align-middle" />}
              iconPosition="start"
              label="Sent"
              {...a11yProps(3)}
              className={`text-gray-400 justify-start min-h-[45px] px-7 text-lg font-semibold mb-2 capitalize hover:text-blue-600 ${
                value === 3 ? "text-blue-600" : ""
              }`}
            />
            <Tab
              icon={<SaveAsOutlinedIcon className="text-xl align-middle" />}
              iconPosition="start"
              label="Drafts"
              {...a11yProps(4)}
              className={`text-gray-400 justify-start min-h-[45px] px-7 text-lg font-semibold mb-2 capitalize hover:text-blue-600 ${
                value === 4 ? "text-blue-600" : ""
              }`}
            />
            <Tab
              icon={<DeleteOutlinedIcon className="text-xl align-middle" />}
              iconPosition="start"
              label="Deleted"
              {...a11yProps(5)}
              className={`text-gray-400 justify-start min-h-[45px] px-7 text-lg font-semibold mb-2 capitalize hover:text-blue-600 ${
                value === 5 ? "text-blue-600" : ""
              }`}
            />
            <Tab
              icon={<StarIcon className="text-xl align-middle" />}
              iconPosition="start"
              label="Favourites"
              {...a11yProps(6)}
              className={`text-gray-400 justify-start min-h-[45px] px-7 text-lg font-semibold mb-2 capitalize hover:text-blue-600 ${
                value === 6 ? "text-blue-600" : ""
              }`}
            />
          </Tabs>
          <button
            className="flex p-2 w-full justify-center items-center"
            onClick={logout}
          >
            <div className=" flex items-center justify-center w-2/3 p-2 rounded-lg"
            style={{color: themeProperties.text, 
              background : themeProperties.logoutColor
            }}
            >
              <FaSignOutAlt />
              <p className="ml-2"
              >
              Logout Google

              </p>
            </div>
          </button>
      </Box>
    </div>
  );
};

TeacherMailTabs.propTypes = {
  value: PropTypes.number.isRequired,
  handleChange: PropTypes.func.isRequired,
  toggleMenu: PropTypes.bool.isRequired,
  toggleItem: PropTypes.func.isRequired,
  screenWidth: PropTypes.number.isRequired,
  newInboxEmail: PropTypes.number,
  isAuthorised: PropTypes.bool.isRequired,
  logout: PropTypes.func.isRequired,
};

export default TeacherMailTabs;