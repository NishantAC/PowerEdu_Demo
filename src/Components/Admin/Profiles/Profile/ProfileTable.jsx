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
import { useMediaQuery } from "@mui/material";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Skeleton } from "@/components/ui/skeleton"

function ProfileTable({
  profileType,
  allUsers,
  page,
  limit,
  total,
  onPageChange,
  themeProperties,
  isLaoding
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
    <div className=" flex relative flex-col justify-between h-full" >
      <TableContainer
        component={Paper}
        sx={{
          boxShadow: "none",
          borderRadius: 2,
          overflow: "hidden",
        }}
      >
        <Table
        >
          {
            isLaoding ? ( 
              <TableHead >
                <TableRow sx={{ backgroundColor: themeProperties?.normal2 }}>
                  <TableCell sx={{ fontWeight: "normal", color: themeProperties?.textColor, textAlign: "center" }}>
                    Loading
                  </TableCell>
                </TableRow>
              </TableHead>

            ) : (
              <TableHead
        sx = {{ borderRadius : "20px"}}
              
              >
              <TableRow sx={{ backgroundColor: 
                "#f3f3f3"
               }}>
                <TableCell sx={{ fontWeight: "normal", color: themeProperties?.textColorAlt }}>
                  Rekor ID
                </TableCell>
                <TableCell sx={{ fontWeight: "normal", color: themeProperties?.textColorAlt }}>
                  {profileType === "students" ? "Roll No." : "S No."}
                </TableCell>
                <TableCell
                  align="left"
                  sx={{ fontWeight: "normal", color: themeProperties?.textColorAlt }}
                >
                  {profileType === "students" ? "Student" : "Employee"} Name
                </TableCell>
                <TableCell
                  align="left"
                  sx={{ fontWeight: "normal", color: themeProperties?.textColorAlt }}
                >
                  {profileType === "students" || profileType === "teachers"
                    ? "Class"
                    : "Department"}
                </TableCell>
                <TableCell
                  align="left"
                  sx={{ fontWeight: "normal", color: themeProperties?.textColorAlt }}
                >
                  {profileType === "students" ? "Admission No." : "Employee ID"}
                </TableCell>
                <TableCell align="left" sx={{  color: themeProperties?.textColorAlt }}>
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            )
          }
          {
            isLaoding ? (

              <>
              {
                Array.from({ length: 5 }).map((_, index) => (

                  <Skeleton className="h-[50px] static rounded-xl mt-4" />

              ))}
            </>


            ):(
              <TableBody>
              {allUsers[profileType]?.map((profile, index) => (
                <TableRow
                  key={profile.user_id}
                  sx={{
                  }}
                  
                >
                  <TableCell 
                  >{profile.rekorid || "N/A"}</TableCell>
                  <TableCell>{profileType === "students" ? profile.rollno : index + 1}</TableCell>
                  <TableCell align="left">{profile.name || "N/A"}</TableCell>
                  <TableCell align="left">{getClassOrDepartment(profile)}</TableCell>
                  <TableCell align="left">{getAdmissionOrEmployeeId(profile)}</TableCell>
                  <TableCell align="left">
                    <Link
                      to={{
                        pathname: "/admin/edit-profile",
                        userId: profile.user_id,
                        userType: profileType,
                      }}
                      style={{ textDecoration: "none" }}
                    >
                      <button className=" px-4 py-2 rounded-lg"
                        style={{
                          textTransform: "none",
                          color: themeProperties?.textColor,
                          backgroundColor: themeProperties?.normal2,
  
                        }}
                      >
                        Edit Profile
                      </button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            )
          }
        </Table>
      </TableContainer>
      <Stack
        alignItems="center"
        spacing={2}
        sx={{
          marginTop: 2,
          padding: 2,
        }}
      >
        <Pagination
          count={Math.ceil(total / limit)}
          page={page}
          onChange={onPageChange}
          sx={{
            "& .MuiPaginationItem-root": {
              color: themeProperties?.textColorAlt,
              "&.Mui-selected": {
                backgroundColor: themeProperties?.normal2,
                color: themeProperties?.textColor,
              },
              "&:hover": {
                backgroundColor: themeProperties?.normal2,
                color: themeProperties?.textColor,
              },
            },
          }}
        />
      </Stack>
    </div>
  );
}

export default ProfileTable;
