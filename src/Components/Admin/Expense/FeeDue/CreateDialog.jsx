import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import InputField from "@/Components/InputField/InputField";
import { Button } from "@/Components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { format, set } from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import { API_BASE_URL } from "@/common/constant";
import axios from "axios";
import {
  createFeeDue,
  createFeeStructure,
  getFeeStructures,
  resetStatus,
} from "@/slices/feeManagement";
import { Check, ChevronsUpDown } from "lucide-react";

const CreateDialog = ({ themeProperties, user }) => {
  const status = useSelector((state) => state.feeManagement.status);
  const feeStructures = useSelector(
    (state) => state.feeManagement.feeStructures
  );
  const [openDialog, setOpenDialog] = useState(false);
  const [open, setOpen] = useState(false);
  const { classes } = useSelector((state) => state.manageClasses);
  const [classFilter, setClassFilter] = useState(null);
  const [selectedClass, setSelectedClass] = useState(null);
  const [loadingClasses, setLoadingClasses] = useState(false);
  const [studentArray, setStudentArray] = useState([]);
  const school_id = user?.school_id;
  const academic_year_id = 1;

  const sortClassCodes = (a, b) => {
    const regex = /^(\d+)([A-Za-z]*)$/;
    const aMatch = a.class_code.match(regex);
    const bMatch = b.class_code.match(regex);

    if (aMatch && bMatch) {
      const aNum = parseInt(aMatch[1], 10);
      const bNum = parseInt(bMatch[1], 10);

      if (aNum !== bNum) {
        return aNum - bNum;
      }

      return aMatch[2].localeCompare(bMatch[2]);
    }

    return a.class_code.localeCompare(b.class_code);
  };

  const getStudents = async () => {
    setStudentArray([]);
    const powerEduAuthToken = localStorage.getItem("powerEduAuthToken");
    const token = "Bearer " + JSON.parse(powerEduAuthToken);
    try {
      const res = await axios.get(
        `${API_BASE_URL}admin/student?class_code=${selectedClass}`,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      setStudentArray(res?.data?.data);
      console.log(res?.data?.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingClasses(false);
    }
  };

  useEffect(() => {
    if (selectedClass) {
      console.log(selectedClass);
      setLoadingClasses(true);
      getStudents();
    }
  }, [selectedClass]);

  useEffect(() => {
    if (classes?.data) {
      const sortedClasses = classes.data.slice().sort(sortClassCodes);
      setClassFilter(sortedClasses[0]?.class_code);
    }
  }, [classes]);

  const [formValues, setFormValues] = useState({
    class_id: null,
    fee_structure_id: null,
    due_date: "",
    student_id: null,
    poweredu_id: null,
    student_name: "",
    amount: null,
    academic_year_id: 1,
  });

  const dispatch = useDispatch();

  useEffect(() => {
    if (user && feeStructures.length === 0) {
      dispatch(getFeeStructures({ school_id, academic_year_id }));
    }
  }, [user]);

  useEffect(() => {
    if (status === "succeeded") {
      setOpenDialog(false);
      setFormValues({
        class_id: null,
        fee_structure_id: null,
        due_date: "",
        student_id: null,
        poweredu_id: null,
        amount: null,
        academic_year_id: 1,
      });
      dispatch(resetStatus());
    }
  }, [status, dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      poweredu_id: formValues.poweredu_id,
      student_id: formValues.student_id,
      fee_structure_id: formValues.fee_structure_id,
      due_amount: formValues.amount,
      due_date: "2025-02-01",
      academic_year_id: 1,
    };
    dispatch(createFeeDue(data));
  };

  const handleClassChange = (value) => {
    const selectedClass = classes?.data?.find((c) => c.class_code === value);
    const selectedClassId = selectedClass?.id;

    if (selectedClassId && selectedClassId !== formValues.class_id) {
      setSelectedClass(value); // Optional if you need it elsewhere
      setClassFilter(value); // Update classFilter state

      setFormValues((prev) => ({
        ...prev,
        class_id: selectedClassId,
        fee_structure_id: null,
        amount: "",
        penalty_amount: "",
        frequency: "",
        student_id: null,
      }));
    }
  };

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogTrigger
        className="absolute bottom-5 right-5 px-4 py-2 rounded-lg text-sm"
        style={{
          backgroundColor: themeProperties?.buttonColor,
          color: themeProperties?.textColorAlt,
        }}
      >
        Create Fee Due
      </DialogTrigger>
      <DialogContent
        style={{
          backgroundColor: themeProperties?.boxBackgroundSolid,
        }}
      >
        <DialogHeader>
          <DialogTitle className="text-base">Create Fee Due</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-10"
            style={{
              color: themeProperties?.textColor,
            }}
          >
            <div className="flex justify-between mt-4">
              <div className="relative ">
                {formValues.class_id && (
                  <p className="text-[12px] absolute -top-5 left-1">Class</p>
                )}
                <Select
                  value={
                    formValues.class_id
                      ? classes?.data?.find((c) => c.id === formValues.class_id)
                          ?.class_code || ""
                      : ""
                  }
                  onValueChange={(value) => handleClassChange(value)}
                >
                  <SelectTrigger className="w-48 relative z-[50]">
                    <SelectValue placeholder="Select Class" />
                  </SelectTrigger>
                  <SelectContent className="capitalize z-[1000] pointer-events-auto absolute top-full mt-1 bg-white shadow-lg rounded-md">
                    <SelectGroup>
                      <SelectLabel>Class</SelectLabel>
                      {classes?.data
                        ?.slice()
                        .sort(sortClassCodes)
                        .map((classItem) => (
                          <SelectItem
                            key={classItem.class_code}
                            value={classItem.class_code}
                            className="hover:bg-gray-200"
                          >
                            {classItem.class_code}
                          </SelectItem>
                        ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button
                    aria-expanded={open}
                    className="w-[190px] justify-between opacity-100 bg-opacity-100 border-2 border-solid rounded-[8px] p-2"
                    style={{
                      color: themeProperties?.textColor,
                      backgroundColor: themeProperties?.inputBackground,
                    }}
                  >
                    {formValues?.student_id
                      ? formValues?.student_name
                      : "Select Student..."}
                    <ChevronsUpDown className="opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  className="w-[200px] p-0"
                  style={{
                    backgroundColor: themeProperties?.inputBackground,
                  }}
                >
                  <Command>
                    <CommandInput placeholder="Search ..." />
                    <CommandList>
                      <CommandEmpty>
                        {loadingClasses ? "Loading..." : "No students found."}
                      </CommandEmpty>
                      <CommandGroup>
                        {studentArray.length > 0 &&
                          studentArray.map((student, index) => (
                            <CommandItem
                              key={index}
                              value={student.student_id}
                              onSelect={() => {

                                setFormValues((prev) => ({
                                  ...prev,
                                  student_id: student.student_id,
                                  poweredu_id: student.poweredu_id,
                                  student_name: `${student.first_name} ${student.last_name}`,
                                }));

                                setOpen(false);
                              }}
                            >
                              {student.first_name + " " + student.last_name}

                              <Check
                                className={cn(
                                  "ml-auto",
                                  formValues.student_id === student.student_id
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                                style={{ color: themeProperties?.normal3 }}
                              />
                            </CommandItem>
                          ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>
            <div className="flex justify-between">
              <div className="relative">
                {formValues.fee_structure_id && (
                  <p className="text-[12px] absolute -top-5 left-1">
                    Fee Structure
                  </p>
                )}
                <Select
                  value={formValues.fee_structure_id || ""}
                  onValueChange={(value) => {
                    const selectedFee = feeStructures.find(
                      (c) => c.id === Number(value)
                    );

                    setFormValues((prev) => ({
                      ...prev,
                      fee_structure_id: selectedFee ? selectedFee.id : "",
                      amount: selectedFee ? selectedFee.amount : "",
                      penalty_amount: selectedFee
                        ? selectedFee.penalty_amount
                        : "",
                      frequency: selectedFee ? selectedFee.frequency : "",
                    }));
                  }}
                >
                  <SelectTrigger className="w-48 relative z-[50]">
                    <SelectValue placeholder="Select Fee Structure">
                      {feeStructures.find(
                        (c) => c.id === formValues.fee_structure_id
                      )?.fee_type || "Select Fee Structure"}
                    </SelectValue>
                  </SelectTrigger>

                  <SelectContent className="capitalize z-[1000] pointer-events-auto absolute top-full mt-1 bg-white shadow-lg rounded-md">
                    <SelectGroup>
                      <SelectLabel>
                        Fee Structure
                        {!formValues.class_id && (
                          <p className="text-[12px] font-normal mt-4 text-red-500">
                            Please select a class to view fee structures
                          </p>
                        )}
                        {classFilter !==
                          classes?.data?.find(
                            (c) => c.id === formValues.class_id
                          )?.class_code &&
                          formValues.class_id && (
                            <p className="text-[12px] font-normal mt-4 text-red-500">
                              No fee structure for selected class
                            </p>
                          )}
                      </SelectLabel>

                      {classFilter ===
                        classes?.data?.find((c) => c.id === formValues.class_id)
                          ?.class_code &&
                        feeStructures
                          ?.filter(
                            (feeStructure) =>
                              feeStructure.class_id === formValues.class_id
                          )
                          .map((feeStructure) => (
                            <SelectItem
                              key={feeStructure.id}
                              value={String(feeStructure.id)} // Ensure it's a string
                              className="hover:bg-gray-200"
                            >
                              {feeStructure.fee_type}
                            </SelectItem>
                          ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              <InputField
                type="number"
                name="amount"
                placeholder="Due Amount ( Auto  )"
                value={formValues.amount}
                // handleChange={handleChange}
                label="Amount"
                disable
              />
            </div>
            <div className="flex justify-between">
              <InputField
                type="number"
                name="penalty_amount"
                placeholder="Penalty Amount ( Auto  )"
                value={formValues.penalty_amount}
                // handleChange={handleChange}
                disable
                label="Penalty Amount"
              />
              <InputField
                type="text"
                name="frequency"
                placeholder="Frequency ( Auto  )"
                value={formValues.frequency}
                disable
                // handleChange={handleChange}
                label="Frequency"
              />
            </div>
            <div className="text-end">
              <button
                type="submit"
                className="px-4 text-sm py-2 rounded-lg"
                style={{
                  backgroundColor: themeProperties?.normal1,
                  color: themeProperties?.textColorAlt,
                  opacity:
                    !formValues.class_id || !formValues.fee_structure_id
                      ? 0.5
                      : 1,
                }}
                disabled={!formValues.class_id || !formValues.fee_structure_id}
              >
                Create
              </button>
              <button
                type="button"
                className="px-4 text-sm py-2 rounded-lg mx-2"
                style={{
                  backgroundColor: themeProperties?.logoutColor,
                  color: themeProperties?.textColorAlt,
                }}
                onClick={() =>
                  setFormValues({
                    class_id: null,
                    fee_type: "",
                    amount: null,
                    frequency: "",
                    penalty_amount: null,
                  })
                }
              >
                Cancel
              </button>
            </div>
          </form>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
};

export default CreateDialog;
