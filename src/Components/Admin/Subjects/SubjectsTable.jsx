import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useMediaQuery, Skeleton, Button } from "@mui/material";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

const SubjectsTable = ({
  subjects,
  setItemToDelete,
  page,
  limit,
  total,
  onPageChange,
  themeProperties,
  isLoading,
}) => {

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
                <TableCell colSpan={4} align="center" sx={{ color: themeProperties?.textColor }}>
                  Loading...
                </TableCell>
              </TableRow>
            </TableHead>
          ) : (
            <TableHead>
              <TableRow sx={{ backgroundColor: themeProperties?.boxBackgroundTop || "#f5f5f5" }}>
                <TableCell sx={{ fontWeight: "normal", color: themeProperties?.textColorAlt }}>
                  Code
                </TableCell>
                <TableCell sx={{ fontWeight: "normal", color: themeProperties?.textColorAlt }}>
                  Subject Name
                </TableCell>
                <TableCell sx={{ fontWeight: "normal", color: themeProperties?.textColorAlt }}>
                  Class
                </TableCell>
                <TableCell sx={{ fontWeight: "normal", color: themeProperties?.textColorAlt, textAlign: "end" , paddingRight: "30px"}}>
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
          )}

          {isLoading ? (
            <TableBody>
              {Array.from({ length: 5 }).map((_, index) => (
                <TableRow key={index}>
                  <TableCell colSpan={4} align="center">
                    <Skeleton height={50} variant="rectangular" />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          ) : (
            <TableBody>
              {Array.isArray(subjects?.result) && subjects.result.map((subject, index) => (
                <TableRow key={index} hover>
                  <TableCell>{subject?.subjectCode}</TableCell>
                  <TableCell>{subject?.subjectName}</TableCell>
                  <TableCell>{subject?.class}</TableCell>
                  <TableCell sx={{ textAlign: "end" }}>
                    <Dialog>
                      <DialogTrigger as={Button} variant="contained" color="primary"
                      className="px-4 py-2 rounded-lg" 
                        style={{
                          backgroundColor: themeProperties?.logoutColor,
                          color: themeProperties?.textColorAlt,
                        }}
                      >
                        Delete
                      </DialogTrigger>
                      <DialogContent>
                      <DialogTitle>
                        Are you sure you want to delete this subject?
                      </DialogTitle>
                        <DialogDescription>
                          This action cannot be undone.
                        </DialogDescription>
                        <button
                          className="px-4 py-2 w-fit rounded-lg"
                          style={{
                            backgroundColor: themeProperties?.logoutColor,
                            color: themeProperties?.textColorAlt,
                          }}
                          onClick={() => {
                            setItemToDelete({
                              class_code: subject.class,
                              subject_code: subject.subjectCode,
                            });
                          }}
                        >
                          Delete
                        </button>
                      </DialogContent>

                    </Dialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          )}
        </Table>
      </TableContainer>

      <Stack alignItems="center" spacing={2} sx={{ marginTop: 2, padding: 2 }}>
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
};

export default SubjectsTable;