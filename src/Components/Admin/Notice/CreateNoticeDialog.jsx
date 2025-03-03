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
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import SchoolNoticeService from "../../../services/schoolnotice.service";
import SelectBox from "@/Components/InputField/SelectBox";
import { format, set } from "date-fns";
import { resetStatus } from "@/slices/schoolnotice";
import { useDispatch, useSelector } from "react-redux";
import { createSchoolNotice } from "../../../slices/schoolnotice";
const CreateNoticeDialog = ({ themeProperties, user }) => {
  const status = useSelector((state) => state.schoolnotice.status);
  const [openDialog, setOpenDialog] = useState(false);
  const [formValues, setFormValues] = useState({
    title: "",
    message: "",
    notice_links: "",
    expiry_date: "",
    notice_type: "General",
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
      ...formValues,
      school_id: user?.school_id,
      issued_by: user?.id,
      academic_year_id: 1,
    };
    dispatch(createSchoolNotice(noticeData));
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
                {formValues.notice_type && (
                  <p className="text-[12px] absolute -top-5 left-1">Notice Type</p>
                )}
                <SelectBox
                  name="notice_type"
                  value={formValues.notice_type}
                  info={formValues.notice_type}
                  placeHolder="Notice Type"
                  options={["General", "Urgent"]}
                  setInfo={() => {
                    setFormValues({
                      ...formValues,
                      notice_type:
                        formValues.notice_type === "General"
                          ? "Urgent"
                          : "General",
                    });
                  }}
                />
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
                  <p className="text-[12px] absolute -top-5 left-1">Expiry Date</p>
                )}
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "justify-start text-center w-48 font-normal text-black"
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
                    </Button>
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
