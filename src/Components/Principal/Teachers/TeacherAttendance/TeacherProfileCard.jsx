import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Avatar } from "@mui/material";
import { selectThemeProperties } from "@/slices/theme";
const TeacherProfileCard = () => {
  const themeProperties = useSelector(selectThemeProperties);
  const { subjectteachers: teachers } = useSelector(
    (state) => state.subjectteacher
  );

  const name = (row) => {
    return `${row.details.firstname} ${row.details?.middlename || ""} ${
      row.details?.lastname || ""
    }`.trim();
  };

  const name_url = (row) => {
    return `${row.details.firstname}-${row.details?.middlename || ""}-${
      row.details?.lastname || ""
    }`.trim();
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
      {teachers?.map((row) => (
        <div
          key={row.id}
          className="bg-white border-2 rounded-[20px] p-6 flex flex-col items-center space-y-4"
        >
          <Avatar
            alt={row?.details?.firstname.toUpperCase()}
            src={row?.profile_image}
            sx={{ width: 80, height: 80 }}
            className="border border-gray-200"
          />
          <h2 className="text-lg font-semibold text-gray-800">{name(row)}</h2>
          <div className="flex flex-col space-y-2 w-full">
            <div className="flex justify-center gap-2">
              <Link to={`/principal/teacher/${name_url(row)}`} className=" w-full">
                <button
                  className="w-full text-nowrap py-2 px-4 rounded-lg transition"
                  onClick={() => {
                    localStorage.setItem("teacher", JSON.stringify(row));
                    localStorage.setItem("tab", 0);
                  }}
                  style={{
                    background: themeProperties.normal1,
                    color: `${themeProperties.textColorAlt}`,
                    transition: "all 0.25s linear",
                  }}
                >
                  Profile
                </button>
              </Link>
              {/* <Link to={`/principal/teacher/${name_url(row)}`} className=" w-1/2">
                <button
                  className="w-full text-nowrap  py-2 px-4 rounded-lg  transition"
                  onClick={() => {
                    localStorage.setItem("teacher", JSON.stringify(row));
                    localStorage.setItem("tab", 1);
                  }}
                  style={{
                    background: themeProperties.normal1,
                    color: `${themeProperties.textColorAlt}`,
                    transition: "all 0.25s linear",
                  }}

                >
                  Attendance
                </button>
              </Link> */}
            </div>
            {/* <Link to={`/principal/teacher/${name_url(row)}`} className=" text-center">
              <button
                className="w-1/2 py-2 px-4 rounded-lg  transition"
                onClick={() => {
                  localStorage.setItem("teacher", JSON.stringify(row));
                  localStorage.setItem("tab", 2);
                }}
                style={{
                  background: themeProperties.buttonColor,
                  color: `${themeProperties.textColorAlt}`,
                  transition: "all 0.25s linear",
                }}
              >
                Feedback
              </button>
            </Link> */}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TeacherProfileCard;
