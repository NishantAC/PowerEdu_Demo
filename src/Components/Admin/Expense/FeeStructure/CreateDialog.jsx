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
import { createFeeStructure, resetStatus } from "@/slices/feeManagement";
import SelectBox from "@/Components/InputField/SelectBox";

const CreateDialog = ({ themeProperties, user }) => {
  const status = useSelector((state) => state.feeManagement.status);
  const [openDialog, setOpenDialog] = useState(false);
  const { classes } = useSelector((state) => state.manageClasses);
  const [classFilter, setClassFilter] = useState(null);

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
    fee_type: "",
    amount: null,
    frequency: "",
    penalty_amount: null,
  });

  const dispatch = useDispatch();

  useEffect(() => {
    if (status === "succeeded") {
      setOpenDialog(false);
      setFormValues({
        class_id: null,
        fee_type: "",
        amount: null,
        frequency: "",
        penalty_amount: null,
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
      fee_type: formValues.fee_type,
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
        Create Fee Structure
      </DialogTrigger>
      <DialogContent
        style={{
          backgroundColor: themeProperties?.boxBackgroundSolid,
        }}
      >
        <DialogHeader>
          <DialogTitle className="text-base">Create Fee Structure</DialogTitle>
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
              <InputField
                type="text"
                name="fee_type"
                placeholder="Fee Type"
                value={formValues.fee_type}
                handleChange={handleChange}
                label="Fee Type"
              />
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
            </div>
            <div className="flex justify-between">
              <InputField
                type="number"
                name="amount"
                placeholder="Amount"
                value={formValues.amount}
                handleChange={handleChange}
                label="Amount"
              />
              <div className="relative">
                {formValues.frequency && (
                  <p className="text-[12px] absolute -top-5 left-1">
                    Frequency
                  </p>
                )}
                <SelectBox
                  name="frequency"
                  value={formValues.frequency}
                  info={formValues.frequency}
                  placeHolder="Frequency"
                  options={["Monthly", "Quarterly", "Annually"]}
                  setInfo={(selectedValue) => {
                    setFormValues({
                      ...formValues,
                      frequency: selectedValue,
                    });
                  }}
                />
              </div>
            </div>
            <div className="flex justify-between">
              <InputField
                type="number"
                name="penalty_amount"
                placeholder="Penalty Amount"
                value={formValues.penalty_amount}
                handleChange={handleChange}
                label="Penalty Amount"
              />
            </div>
            <div className="text-end">
              <button
                type="submit"
                className="px-4 text-sm py-2 rounded-lg"
                style={{
                  backgroundColor: themeProperties?.normal1,
                  color: themeProperties?.textColorAlt,
                }}
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