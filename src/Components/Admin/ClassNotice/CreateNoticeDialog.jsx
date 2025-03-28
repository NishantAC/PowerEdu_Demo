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
} from "@/Components/ui/dialog";
import InputField from "@/Components/InputField/InputField";
import { Button } from "@/Components/ui/button";
import { Calendar } from "@/Components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/Components/ui/popover";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/Components/ui/select";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import SchoolNoticeService from "../../../services/schoolnotice.service";
import SelectBox from "@/Components/InputField/SelectBox";
import { format, set } from "date-fns";
import { resetStatus } from "@/slices/schoolnotice";
import { useDispatch, useSelector } from "react-redux";
import { createClassNotice } from "@/slices/classnotice";
const CreateNoticeDialog = ({ themeProperties, user }) => {
  const status = useSelector((state) => state.classnotice.status);
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
    title: "",
    message: "",
    notice_links: "",
    expiry_date: "",
    notice_type: "",
    class_id: null,
    selectedClass: null,
  });

  const dispatch = useDispatch();

  useEffect(() => {
    if (status == "succeeded") {
      setOpenDialog(false);
      setFormValues({
        title: "",
        message: "",
        notice_links: "",
        expiry_date: "",
        notice_type: "",
        class_id: null,
        selectedClass: null,
      });
      dispatch(resetStatus());
    }
  }, [status, setOpenDialog, dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleDateChange = (date) => {
    setFormValues({ ...formValues, expiry_date: date });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const noticeData = {
      title: formValues.title,
      message: formValues.message,
      notice_links: formValues.notice_links,
      expiry_date: formValues.expiry_date,
      class_id: formValues.class_id,
      school_id: user?.school_id,
      issued_by: user?.id,
      academic_year_id: 1,
    };
    dispatch(createClassNotice(noticeData));
  };

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogTrigger
        className=" absolute bottom-5 right-5 px-4 py-2 rounded-lg text-sm"
        style={{
          backgroundColor: themeProperties?.buttonColor,
          color: themeProperties?.textColorAlt,
        }}
      >
        Create Notice
      </DialogTrigger>
      <DialogContent
        style={{
          backgroundColor: themeProperties?.boxBackgroundSolid,
        }}
      >
        <DialogHeader>
          <DialogTitle className=" text-base">Create Notice</DialogTitle>
        </DialogHeader>
        <DialogDescription className="">
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
              <div className=" relative">
                {formValues.class_id && (
                  <p className="text-[12px] absolute -top-5 left-1">Class</p>
                )}
                <Select
                value={formValues.class_id ? classes?.data?.find((c) => c.id === formValues.class_id)?.class_code : ""}
                onValueChange={(value) =>
                  // get the id of the selected class
                  setFormValues((prev) => ({ ...prev, class_id: classes?.data?.find((c) => c.class_code === value)?.id }))
                }
                 
                >
                  <SelectTrigger
                    className="w-48 relative z-[50]" // Ensure it's on top
                  >
                    <SelectValue placeholder="Select Class" />
                  </SelectTrigger>
                  <SelectContent
                    className="capitalize z-[1000] pointer-events-auto absolute top-full mt-1 bg-white shadow-lg rounded-md"
                    style={{ position: "absolute" }} // Ensures dropdown renders above
                  >
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
                type="text"
                name="notice_links"
                placeholder="Notice Links"
                value={formValues.notice_links}
                handleChange={handleChange}
                label="Notice Links"
              />
              <div className=" relative">
                {formValues.expiry_date && (
                  <p className="text-[12px] absolute -top-5 left-1">
                    Expiry Date
                  </p>
                )}
                <Popover>
                  <PopoverTrigger asChild>
                    <button
                      variant={"outline"}
                      className={cn(
                        " text-sm text-center w-48 font-normal flex gap-2 items-center px-4 py-2 border rounded-md"
                      )}
                      style={{
                        background: themeProperties?.inputBackground,
                        color: themeProperties?.inputTextColor,
                      }}
                    >
                      <CalendarIcon className="h-4 w-4" />
                      {formValues.expiry_date
                        ? format(new Date(formValues.expiry_date), "dd/MM/yyyy")
                        : "Expiry Date"}
                    </button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={
                        formValues.expiry_date
                          ? new Date(formValues.expiry_date)
                          : new Date()
                      }
                      onSelect={handleDateChange}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            <div>
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
                    title: "",
                    message: "",
                    notice_links: "",
                    issued_date: "",
                    expiry_date: "",
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

export default CreateNoticeDialog;
