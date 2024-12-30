import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Link } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useMediaQuery, Skeleton, Button, Typography } from "@mui/material";

function ProfileTable({
  profileType,
  allUsers,
  page,
  limit,
  total,
  onPageChange,
  themeProperties,
  isLoading,
}) {
  const isMobile = useMediaQuery("(max-width: 600px)");

  const getClassOrDepartment = (profile) => {
    if (profileType === "students" || profileType === "teachers") {
      return profile.class || "N/A";
    } else {
      return profile.department || "N/A";
    }
  };

  const getAdmissionOrEmployeeId = (profile) => {
    if (profileType === "students") {
      return profile.admissionno || "N/A";
    } else {
      return profile.employeeid || "N/A";
    }
  };

  return (
    <div className="flex flex-col justify-between h-full">
      <TableContainer
        component={Paper}
        sx={{
          boxShadow: "none",
          borderRadius: 3,
          overflow: "hidden",
          backgroundColor: themeProperties?.boxBackgroundSolid || "#ffffff",
        }}
      >
        <Table>
          {isLoading ? (
            <TableHead>
              <TableRow>
                <TableCell colSpan={6} align="center" sx={{ color: themeProperties?.textColor }}>
                  Loading...
                </TableCell>
              </TableRow>
            </TableHead>
          ) : (

            <TableHead>
              <TableRow sx={{ backgroundColor: themeProperties?.boxBackgroundTop || "#f5f5f5" }}>
                <TableCell sx={{ fontWeight: "normal", color: themeProperties?.textColorAlt }}>
                  PowerEdu ID
                </TableCell>
                <TableCell sx={{ fontWeight: "normal", color: themeProperties?.textColorAlt }}>
                  {profileType === "students" ? "Roll No." : "S No."}
                </TableCell>
                <TableCell sx={{ fontWeight: "normal", color: themeProperties?.textColorAlt }}>
                  {profileType === "students" ? "Student" : "Employee"} Name
                </TableCell>
                <TableCell sx={{ fontWeight: "normal", color: themeProperties?.textColorAlt }}>
                  {profileType === "students" || profileType === "teachers" ? "Class" : "Department"}
                </TableCell>
                <TableCell sx={{ fontWeight: "normal", color: themeProperties?.textColorAlt }}>
                  {profileType === "students" ? "Admission No." : "Employee ID"}
                </TableCell>
                <TableCell sx={{ fontWeight: "normal", color: themeProperties?.textColorAlt , textAlign: "end"}}>
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
          
          )}

          {isLoading ? (
            <TableBody>
              {Array.from({ length: 5 }).map((_, index) => (
                <TableRow key={index}>
                  <TableCell colSpan={6} align="center">
                    <Skeleton height={50} variant="rectangular" />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          ) : (
            <TableBody>
            {allUsers[profileType]?.map((profile, index) => (
              <TableRow key={profile.user_id} hover>
                <TableCell>{profile.rekorid || "N/A"}</TableCell>
                <TableCell>{profileType === "students" ? profile.rollno : index + 1}</TableCell>
                <TableCell>{profile.name || "N/A"}</TableCell>
                <TableCell>{getClassOrDepartment(profile)}</TableCell>
                <TableCell>{getAdmissionOrEmployeeId(profile)}</TableCell>
                <TableCell sx = {{textAlign: "end"}}>
                  <Link
                    to={{ pathname: "/admin/edit-profile", userId: profile.user_id, userType: profileType }}
                    style={{ textDecoration: "none" }}
                  >
                    <button
                    onClick={() => {  
                      const editUserDetails = { ...profile, profiletype: profileType };
                      localStorage.setItem("editUserDetails", JSON.stringify(editUserDetails));
                    }}

                      className="px-4 py-2 rounded-md"
                      style={{
                        textTransform: "none",
                        backgroundColor: themeProperties?.buttonColor,
                        color: themeProperties?.textColorAlt,
                        '&:hover': {
                          backgroundColor: themeProperties?.hoverColor,
                        },
                      }}
                    >
                      Edit Profile
                    </button>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          )}
        </Table>
      </TableContainer>

      <Stack
        alignItems="center"
        spacing={2}
        sx={{ marginTop: 2, padding: 2 }}
      >
        <Pagination
          count={Math.ceil(total / limit)}
          page={page}
          onChange={onPageChange}
          sx={{
            '& .MuiPaginationItem-root': {
              color: themeProperties?.textColor,
              '&.Mui-selected': {
                backgroundColor: themeProperties?.normal1,
                color: themeProperties?.textColorAlt,
              },
              '&:hover': {
                backgroundColor: themeProperties?.normal1,
                color: themeProperties?.textColorAlt,
              },
            },
          }}
        />
      </Stack>
    </div>
  );
}

export default ProfileTable;
