import React from "react";
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
import { format } from "date-fns";
import ClassNoticeService from "../../../services/classnotice.service";
import SelectBox from "@/Components/InputField/SelectBox";

const UpdateNoticeDialog = ({
  themeProperties,
  selectedNotice,
  setUpdateDialogOpen,
  updateDialogOpen,
}) => {
  const formik = useFormik({
    initialValues: {
      title: selectedNotice?.title || "",
      message: selectedNotice?.message || "",
      notice_links: selectedNotice?.notice_links || "",
      expiry_date: selectedNotice?.expiry_date || "",
      notice_type: selectedNotice?.notice_type || "",
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Title is required"),
      message: Yup.string().required("Message is required"),
      expiry_date: Yup.date().required("Expiry date is required"),
    }),
    onSubmit: (values) => {
      ClassNoticeService.updateClassNotice(selectedNotice?.id, values);
      setUpdateDialogOpen(false);
    },
  });

  return (
    <Dialog open={updateDialogOpen} onOpenChange={setUpdateDialogOpen}>
      <DialogTrigger
        className="self-end px-4 py-2 rounded-lg text-sm"
        style={{
          backgroundColor: themeProperties?.buttonColor,
          color: themeProperties?.textColorAlt,
        }}
      >
        Edit
      </DialogTrigger>
      <DialogContent
        style={{
          backgroundColor: themeProperties?.boxBackgroundSolid,
        }}
      >
        <DialogHeader>
          <DialogTitle className=" text-base">Edit Notice</DialogTitle>
        </DialogHeader>
        <DialogDescription className="flex flex-col gap-10">
          <form onSubmit={formik.handleSubmit}>
            <div className="flex justify-between mt-4">
              <InputField
                type="text"
                name="title"
                placeholder="Title"
                value={formik.values.title}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                label="Title"
                error={formik.touched.title && formik.errors.title}
              />

              <div className=" relative">
                {formik.values.notice_type && (
                  <p className="text-[12px] absolute -top-5 left-1">
                    Notice Type
                  </p>
                )}
                <SelectBox
                  name="notice_type"
                  value={formik.values.notice_type}
                  info={formik.values.notice_type}
                  placeHolder="Notice Type"
                  options={["General", "Urgent"]}
                  setInfo={() => {
                    formik.setFieldValue("notice_type", () => {
                      formik.values.notice_type === "General"
                        ? "Urgent"
                        : "General";
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
                value={formik.values.notice_links}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                label="Notice Links"
              />
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
                    {formik.values.expiry_date
                      ? format(
                          new Date(formik.values.expiry_date),
                          "dd/MM/yyyy"
                        )
                      : "Expiry Date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={
                      formik.values.expiry_date
                        ? new Date(formik.values.expiry_date)
                        : new Date()
                    }
                    onSelect={(selectedDate) =>
                      formik.setFieldValue("expiry_date", selectedDate)
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div>
              <InputField
                type="textarea"
                name="message"
                placeholder="Message"
                value={formik.values.message}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                label="Message"
                error={formik.touched.message && formik.errors.message}
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
                Update
              </button>
              <button
                type="button"
                className="px-4 text-sm py-2 rounded-lg mx-2"
                style={{
                  backgroundColor: themeProperties?.logoutColor,
                  color: themeProperties?.textColorAlt,
                }}
                onClick={() => setUpdateDialogOpen(false)}
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

export default UpdateNoticeDialog;
