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
import { useMediaQuery, Button } from "@mui/material";
import { Skeleton } from "@/components/ui/skeleton";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import InputField from "@/Components/InputField/InputField";
import SubjectService from "@/services/subject.service";

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
  const [updatedSubject, setUpdatedSubject] = React.useState({});

  const handleUpdateSubject = (subject_name, description, subject_code) => {
    SubjectService.updateSubjectsOfClasses({
      subject_name,
      description,
      subject_code,
    });
  };

  const handleDeleteSubject = (subject_code) => {
    SubjectService.deleteSubjectsOfClasses(subject_code);
  };


  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedSubject((prev) => ({
      ...prev,
      [name]: value,
    }));
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
          <TableHead>
            <TableRow
              sx={{
                backgroundColor: themeProperties?.boxBackgroundTop || "#f5f5f5",
              }}
            >
              <TableCell
                sx={{
                  fontWeight: "normal",
                  color: themeProperties?.textColorAlt,
                }}
              >
                Grade
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: "normal",
                  color: themeProperties?.textColorAlt,
                }}
              >
                Subject Name
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: "normal",
                  color: themeProperties?.textColorAlt,
                }}
              >
                Class
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: "normal",
                  color: themeProperties?.textColorAlt,
                  textAlign: "end",
                  paddingRight: "30px",
                }}
              >
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          {isLoading ? (
            <TableBody>
              {Array.from({ length: 4 }).map((_, index) => (
                <TableRow key={index}>
                  <TableCell colSpan={5} align="center">
                    <Skeleton className="h-10 w-full" />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          ) : (
            <TableBody>
              {subjects && subjects.length == 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={4}
                    align="center"
                    style={{
                      color: themeProperties?.textColor,
                      padding: "80px",
                    }}
                  >
                    No subjects found
                  </TableCell>
                </TableRow>
              ) : (
                <>
                  {Array.isArray(subjects) &&
                    subjects.map((subject, index) => (
                      <TableRow key={index} hover>
                        <TableCell
                          style={{
                            color: themeProperties?.textColor,
                          }}
                        >
                          {subject?.pclass}
                        </TableCell>
                        <TableCell
                          style={{
                            color: themeProperties?.textColor,
                          }}
                        >
                          {subject?.subject_name}
                        </TableCell>
                        <TableCell
                          style={{
                            color: themeProperties?.textColor,
                          }}
                        >
                          {subject?.class}
                        </TableCell>
                        <TableCell sx={{ textAlign: "end" ,  }}>
                          <Dialog className="">
                            <DialogTrigger
                              as={Button}
                              variant="contained"
                              color="primary"
                              className="px-4 py-2 rounded-lg mr-4"
                              style={{
                                backgroundColor: themeProperties?.logoutColor,
                                color: themeProperties?.textColorAlt,
                              }}
                            >
                              Delete
                            </DialogTrigger>
                            <DialogContent>
                              <DialogTitle
                                className="text-[16px] font-normal"
                                style={{ color: themeProperties?.textColor }}
                              >
                                Are you sure you want to delete this subject?
                              </DialogTitle>
                              <DialogDescription></DialogDescription>
                              <div className="flex justify-end space-x-4">
                                <button
                                  className="px-4 py-2 w-fit rounded-lg"
                                  style={{
                                    backgroundColor:
                                      themeProperties?.logoutColor,
                                    color: themeProperties?.textColorAlt,
                                  }}
                                  onClick={() => {
                                    handleDeleteSubject(subject.subject_code);
                                  }}
                                >
                                  Delete
                                </button>
                              </div>
                            </DialogContent>
                          </Dialog>
                          <Dialog>
                            <DialogTrigger asChild>
                              <button
                                style={{
                                  backgroundColor: themeProperties?.normal1,
                                  color: themeProperties?.textColorAlt,
                                }}
                                className="px-4 py-2 rounded-md"
                              >
                                Update
                              </button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Create New Subject</DialogTitle>
                                <DialogDescription></DialogDescription>
                              </DialogHeader>
                              <div className="space-y-6 mt-10">
                                <div className="flex w-full justify-between items-center">
                                  <InputField
                                    value={subject?.subject_code}
                                    htmlFor="subject_code"
                                    placeholder="Subject Code ( Read only )"
                                    name="subject_code"
                                    required
                                    disable
                                  />

                                  <InputField
                                    value={
                                      updatedSubject.subject_name ||
                                      subject.subject_name
                                    }
                                    htmlFor="subject_name"
                                    placeholder="Subject Name"
                                    name="subject_name"
                                    required
                                    handleChange={handleChange}
                                  />
                                </div>

                                <div className="flex w-full justify-between items-center">
                                  <InputField
                                    value={subject?.class}
                                    htmlFor="class"
                                    placeholder="Class ( Read only )"
                                    name="class"
                                    required
                                    disable
                                  />

                                  <InputField
                                    value={subject?.pclass}
                                    htmlFor="pclass"
                                    placeholder="Grade ( Read only ) "
                                    name="pclass"
                                    required
                                    disable
                                  />
                                </div>

                                <InputField
                                  value={
                                    updatedSubject.description ||
                                    subject?.description
                                  }
                                  htmlFor="description"
                                  placeholder="Description"
                                  name="description"
                                  handleChange={handleChange}
                                  required
                                  type="textarea"
                                />
                              </div>
                              <button
                                onClick={() =>
                                  handleUpdateSubject(
                                    updatedSubject.subject_name ||
                                      subject.subject_name,
                                    updatedSubject.description ||
                                      subject.description,
                                    subject.subject_code
                                  )
                                }
                                className="px-4 py-2 w-fit rounded-lg"
                                style={{
                                  backgroundColor: themeProperties?.normal1,
                                  color: themeProperties?.textColorAlt,
                                }}
                              >
                                Update
                              </button>
                            </DialogContent>
                          </Dialog>
                        </TableCell>
                      </TableRow>
                    ))}
                </>
              )}
            </TableBody>
          )}
        </Table>
      </TableContainer>
    </div>
  );
};

export default SubjectsTable;
