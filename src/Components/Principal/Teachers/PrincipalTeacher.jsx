import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import TabProfile from "./TeacherProfile/TabProfile";
import TabFeedback from "./TeacherProfile/Feedback/TabFeedback";
import TabAttendance from "./TeacherProfile/Attendance/TabAttendance";
import PropTypes from "prop-types";
import { getCurrentTeacherData } from "../../../slices/subjectteacher";
import { Link, useNavigate } from "react-router-dom";
import { Box } from "@mui/system";
import { selectThemeProperties } from "@/slices/theme";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function PrincipalTeacher(props) {
  const themeProperties = useSelector(selectThemeProperties);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user: currentUser } = useSelector((state) => state.user);
  const currentteacher = useSelector(
    (state) => state.subjectteacher.currentteacher
  );
  const tabValue = localStorage.getItem("tab")
    ? parseInt(localStorage.getItem("tab"))
    : 0;
  const userId = localStorage.getItem("teacher")
    ? JSON.parse(localStorage.getItem("teacher")).user_id
    : currentUser.id;
  const [value, setValue] = React.useState(tabValue ? tabValue : 0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    dispatch(getCurrentTeacherData({ userId }));
  }, [dispatch, userId]);

  return (
    <div
      className=" h-full "
      style={{
        backgroundColor: themeProperties.boxBackgroundSolid,
        color: themeProperties.textColor,
      }}
    >
      <div className="">

      </div>
      <div className="w-full p-0">
        <div className="w-full">
          <div className="">
            <div className="flex w-full justify-center pt-2 absolute">
              <button
                className={`px-4 py-2  transition-all duration-300 ease-in-out `}
                style={{
                  backgroundColor:
                    value === 0
                      ? themeProperties.normal1
                      : themeProperties.inputColor,
                  color:
                    value === 0
                      ? themeProperties.textColorAlt
                      : themeProperties.textColor,
                  borderRadius: "5px",
                  marginRight: "5px",
                }}
                onClick={(e) => handleChange(e, 0)}
              >
                Profile
              </button>
              <button
                className={`px-4 py-2 transition-all duration-300 ease-in-out `}
                style={{
                  backgroundColor:
                    value === 1
                      ? themeProperties.normal1
                      : themeProperties.inputColor,
                  color:
                    value === 1
                      ? themeProperties.textColorAlt
                      : themeProperties.textColor,
                  borderRadius: "5px",
                  marginRight: "5px",
                }}
                onClick={(e) => handleChange(e, 1)}
              >
                Attendance
              </button>
              <button
                className={`px-4 py-2 transition-all duration-300 ease-in-out `}
                style={{
                  backgroundColor:
                    value === 2
                      ? themeProperties.normal1
                      : themeProperties.inputColor,
                  color:
                    value === 2
                      ? themeProperties.textColorAlt
                      : themeProperties.textColor,
                  borderRadius: "5px",
                  marginRight: "5px",
                }}
                onClick={(e) => handleChange(e, 2)}
              >
                Feedback
              </button>
            </div>
          </div>
          <TabPanel value={value} index={0}>
            <TabProfile currentteacher={currentteacher} />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <TabAttendance userId={userId} />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <TabFeedback userId={userId} />
          </TabPanel>
        </div>
      </div>
    </div>
  );
}

export default PrincipalTeacher;
