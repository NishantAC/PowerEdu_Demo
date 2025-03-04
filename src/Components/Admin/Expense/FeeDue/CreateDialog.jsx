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
import {
  createFeeStructure,
  getFeeStructures,
  resetStatus,
} from "@/slices/feeManagement";
import SelectBox from "@/Components/InputField/SelectBox";

const CreateDialog = ({ themeProperties, user }) => {
  const status = useSelector((state) => state.feeManagement.status);
  const feeStructures = useSelector(
    (state) => state.feeManagement.feeStructures
  );
  const [openDialog, setOpenDialog] = useState(false);
  const { classes } = useSelector((state) => state.manageClasses);
  const [classFilter, setClassFilter] = useState(null);
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

  useEffect(() => {
    if (classes?.data) {
      const sortedClasses = classes.data.slice().sort(sortClassCodes);
      setClassFilter(sortedClasses[0]?.class_code);
    }
  }, [classes]);

  const [formValues, setFormValues] = useState({
    class_id: null,
    fee_structure_id: null,
    selectedFeeStructure: null,
    due_date: "",
    student_id: null,
    poweredu_id: null,
    amount: null,
    penalty_amount: null,
    frequency: "",
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
        penalty_amount: null,
        due_date: "",
        student_id: null,
        poweredu_id: null,
        amount: null,
        frequency: "",
        
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
      amount: formValues.amount,
      frequency: formValues.frequency,
      penalty_amount: formValues.penalty_amount,
      class_id: formValues.class_id,
      school_id: user?.school_id,
      academic_year_id: 1,
      
    };
    dispatch(createFeeStructure(data));
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
        Create Fee Payment
      </DialogTrigger>
      <DialogContent
        style={{
          backgroundColor: themeProperties?.boxBackgroundSolid,
        }}
      >
        <DialogHeader>
          <DialogTitle className="text-base">Create Fee Payment</DialogTitle>
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
  
              <div className="relative">
                {formValues.class_id && (
                  <p className="text-[12px] absolute -top-5 left-1">Class</p>
                )}
                <Select
                  value={
                    formValues.class_id
                      ? classes?.data?.find((c) => c.id === formValues.class_id)
                          ?.class_code
                      : ""
                  }
                  onValueChange={(value) =>
                    setFormValues((prev) => ({
                      ...prev,
                      class_id: classes?.data?.find(
                        (c) => c.class_code === value
                      )?.id,
                      fee_structure_id: null,
                      amount: "",
                      penalty_amount: "",
                      frequency: "",
                    }))
                  }
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
              <InputField
                type="text"
                name="student_id"
                placeholder="Student ID"
                value={formValues.student_id}
                handleChange={handleChange}
                label="Student ID"
              />
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
                        penalty_amount: selectedFee ? selectedFee.penalty_amount : "",
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
                placeholder="Amount ( Auto  )"
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
