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
import { createCircular, resetStatus } from "@/slices/circular";
import SelectBox from "@/Components/InputField/SelectBox";

const CreateDialog = ({ themeProperties, user, openDialog, setOpenDialog }) => {
  const status = useSelector((state) => state.circularManagementSlice.status);
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
    school_id: user?.school_id,
    title: "",
    message: "",
    circular_links: "",
    issued_by: user?.id,
    academic_year_id: 1,
  });

  const dispatch = useDispatch();

  useEffect(() => {
    if (status === "succeeded") {
      setOpenDialog(false);
      setFormValues({
        school_id: user?.school_id,
        title: "",
        message: "",
        circular_links: "",
        issued_by: user?.id,
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
      ...formValues,
    };
    dispatch(createCircular(data));
  };

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogTrigger
        className="absolute bottom-5 right-5 px-4 py-2 rounded-lg text-sm hidden"
        style={{
          backgroundColor: themeProperties?.buttonColor,
          color: themeProperties?.textColorAlt,
        }}
      ></DialogTrigger>
      <DialogContent
        style={{
          backgroundColor: themeProperties?.boxBackgroundSolid,
        }}
      >
        <DialogHeader>
          <DialogTitle className="text-base">Add Circulars</DialogTitle>
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
                name="title"
                placeholder="Title"
                value={formValues.title}
                handleChange={handleChange}
                label="Title"
              />
              <InputField
                type="text"
                name="circular_links"
                placeholder="Circular Links"
                value={formValues.circular_links}
                handleChange={handleChange}
                label="Circular Links"
              />
            </div>
            <div className="">
              <InputField
                type="textarea"
                name="message"
                placeholder="Message"
                value={formValues.message}
                handleChange={handleChange}
                label="Message"
              />
            </div>
            <div className="text-end">
              <button
                type="submit"
                className="px-4 text-sm py-2 rounded-lg "
                style={{
                  backgroundColor: themeProperties?.normal1,
                  color: themeProperties?.textColorAlt,
                  opacity: formValues.title === "" || formValues.message === "" ? 0.5 : 1,
                  cursor: formValues.title === "" || formValues.message === "" ? "not-allowed" : "pointer",
                }}
                disabled = {formValues.title === "" || formValues.message === ""}
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
