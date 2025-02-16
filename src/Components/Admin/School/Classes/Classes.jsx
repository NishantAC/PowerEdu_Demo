import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchClasses,
  createClass,
  updateClass,
  deleteClass,
} from "../../../../slices/manageClasses";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  LinearProgress,
} from "@mui/material";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { selectThemeProperties } from "@/slices/theme";
import Spinner from "@/Components/Spinner/Spinner";
import { Button } from "@/Components/ui/button";
import InputField from "@/Components/InputField/InputField";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { toast } from "sonner";
import CreateClassModal from "./CreateClassModal";
import { Link } from "react-router-dom";

const Classes = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const school_id = user?.school_id;

  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(5);

  const { classes, loading, error } = useSelector(
    (state) => state.manageClasses
  );
  const themeProperties = useSelector(selectThemeProperties);

  useEffect(() => {
    dispatch(fetchClasses({ school_id, academic_year_id: 1 }));
  }, [dispatch]);

  const handleCreateClass = (values) => {
    dispatch(createClass(values));
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setLimit(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSubmit = (values) => {
    dispatch(
      updateClass({
        id: values.id,
        classData: {
          pclass: values.pclass,
          class_name: values.class_name,
          capacity: values.capacity,
        },
      })
    );
  };

  const handleDeleteClass = (id) => {
    dispatch(deleteClass(id));
  };

  if (loading)
    return (
      <div className="flex items-center justify-center h-full">
        <div
          className="text-center text-sm mt-2"
          style={{ color: themeProperties.specialColor }}
        >
          <LinearProgress color="inherit" />
          <p style={{ color: themeProperties.textColor }}>
            Loading The Classes
          </p>
        </div>
      </div>
    );

  const paginatedClasses = classes?.data?.slice(
    page * limit,
    page * limit + limit
  );

  return (
    <div className="flex flex-col h-full p-4 relative">
      <CreateClassModal
        onCreate={handleCreateClass}
        themeProperties={themeProperties}
      />
      <Link
        className="mb-4 px-6 py-2 rounded-lg absolute bottom-5"
        style={{
          backgroundColor: themeProperties?.normal2,
          color: themeProperties?.textColorAlt,
        }}
        to="/admin/school"
      >
        Go Back
      </Link>
      <TableContainer
        component={Paper}
        sx={{
          boxShadow: "none",
          borderRadius: 3,
          overflow: "hidden",
          backgroundColor: themeProperties?.boxBackgroundSolid || "#ffffff",
        }}
        style={{ height: "" }}
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
                Class Code
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: "normal",
                  color: themeProperties?.textColorAlt,
                }}
              >
                Class Name
              </TableCell>

              <TableCell
                sx={{
                  fontWeight: "normal",
                  color: themeProperties?.textColorAlt,
                }}
              >
                Capacity
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
          <TableBody>
            {paginatedClasses?.length > 0 &&
              paginatedClasses.map((classItem) => (
                <TableRow key={classItem?.id} hover>
                  <TableCell>{classItem?.pclass}</TableCell>
                  <TableCell>{classItem?.class_code}</TableCell>
                  <TableCell>{classItem?.class_name}</TableCell>
                  <TableCell>{classItem?.capacity}</TableCell>
                  <TableCell sx={{ textAlign: "end" }}>
                    <Dialog>
                      <DialogTrigger
                        style={{
                          backgroundColor: themeProperties?.normal1,
                          color: themeProperties?.textColorAlt,
                        }}
                        className=" px-4 py-2 rounded-md"
                      >
                        Update
                      </DialogTrigger>
                      <DialogContent
                        style={{
                          backgroundColor: themeProperties?.boxBackgroundSolid,
                          padding: "0px",
                          overflow: "hidden",
                          color: themeProperties?.textColorAlt,
                        }}
                      >
                        <DialogHeader
                          style={{
                            backgroundColor: themeProperties?.boxBackgroundTop,
                            color: themeProperties?.textColorAlt,
                          }}
                          className="p-4 "
                        >
                          Update Class{" "}
                        </DialogHeader>
                        <div className="p-4">
                          <Formik
                            initialValues={{
                              id: classItem?.id,
                              pclass: classItem?.pclass,
                              class_name: classItem?.class_name,
                              capacity: classItem?.capacity,
                              class_code: classItem?.class_code,
                            }}
                            validationSchema={Yup.object({
                              pclass:
                                Yup.string().required("Class is required"),
                              class_name: Yup.string().required(
                                "Class name is required"
                              ),
                              capacity: Yup.number()
                                .required("Capacity is required")
                                .positive("Capacity must be positive")
                                .integer("Capacity must be an integer"),
                            })}
                            onSubmit={handleSubmit}
                          >
                            {({ values, handleChange }) => (
                              <Form className="space-y-6">
                                <div className="flex w-full justify-between">
                                  <InputField
                                    value={values.pclass}
                                    htmlFor="pclass"
                                    placeholder="Class"
                                    name="pclass"
                                    handleChange={handleChange}
                                    required
                                  />
                                  <InputField
                                    value={values.class_name}
                                    htmlFor="class_name"
                                    placeholder="Class Name"
                                    name="class_name"
                                    handleChange={handleChange}
                                    required
                                  />
                                </div>
                                <div className="flex w-full justify-between">
                                  <InputField
                                    value={values.capacity}
                                    htmlFor="capacity"
                                    placeholder="Capacity"
                                    name="capacity"
                                    handleChange={handleChange}
                                    required
                                    type="number"
                                  />

                                  <InputField
                                    value={values.class_code}
                                    htmlFor="class_code"
                                    placeholder="Class Code"
                                    name="class_code"
                                    disable={true}
                                  />
                                </div>

                                <DialogFooter>
                                  <button
                                    type="submit"
                                    className="px-4 py-2 rounded-md"
                                    style={{
                                      backgroundColor: themeProperties?.normal1,
                                      color: themeProperties?.textColorAlt,
                                    }}
                                  >
                                    Update
                                  </button>
                                </DialogFooter>
                              </Form>
                            )}
                          </Formik>
                        </div>
                      </DialogContent>
                    </Dialog>
                    <Dialog>
                      <DialogTrigger
                        style={{
                          backgroundColor: themeProperties?.logoutColor,
                          color: themeProperties?.textColorAlt,
                        }}
                        className=" px-4 ml-4 py-2 rounded-md"
                      >
                        Delete
                      </DialogTrigger>
                      <DialogContent
                        style={{
                          backgroundColor: themeProperties?.boxBackgroundSolid,
                          padding: "0px",
                          overflow: "hidden",
                          color: themeProperties?.textColorAlt,
                        }}
                      >
                        <DialogHeader
                          style={{
                            backgroundColor: themeProperties?.boxBackgroundTop,
                            color: themeProperties?.textColorAlt,
                          }}
                          className="p-4 "
                        >
                          Delete Class{" "}
                        </DialogHeader>
                        <div
                          className="p-4"
                          style={{ color: themeProperties?.textColor }}
                        >
                          <p>Are you sure you want to delete this class?</p>
                        </div>
                        <DialogFooter>
                          <button
                            className="px-4 py-2 rounded-md mb-2 mr-2"
                            style={{
                              backgroundColor: themeProperties?.logoutColor,
                              color: themeProperties?.textColorAlt,
                            }}
                            onClick={() => handleDeleteClass(classItem?.id)}
                          >
                            Delete
                          </button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={classes?.data?.length || 0}
          rowsPerPage={limit}
          page={page}
          sx={{
            "& .MuiPaginationItem-root": {
              color: themeProperties?.textColor,
              "&.Mui-selected": {
                backgroundColor: themeProperties?.normal1,
                color: themeProperties?.textColorAlt,
              },
              "&:hover": {
                backgroundColor: themeProperties?.normal1,
                color: themeProperties?.textColorAlt,
              },
            },
          }}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    </div>
  );
};

export default Classes;
