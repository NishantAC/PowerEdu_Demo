import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createSchoolNotice,
  getSchoolNoticeData,
  deleteSchoolNotice,
  updateSchoolNotice,
  resetStatus,
} from "../../../slices/schoolnotice";
import { selectThemeProperties } from "@/slices/theme";
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
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import CreateNoticeDialog from "./CreateNoticeDialog";
import SelectBox from "@/Components/InputField/SelectBox";
import { Link } from "react-router-dom";

export default function AdminNotice() {
  const { user } = useSelector((state) => state.user);
  const school_id = user?.school_id;
  const academic_year_id = 1;
  const dispatch = useDispatch();
  const themeProperties = useSelector(selectThemeProperties);
  const notices = useSelector((state) => state.schoolnotice.notices);
  const status = useSelector((state) => state.schoolnotice.status);
  const [selectedNotice, setSelectedNotice] = useState(null);
  const [updateDialogOpen, setUpdateDialogOpen] = useState(false);
  const [noticeDialogOpen, setNoticeDialogOpen] = useState(false);
  const [formValues, setFormValues] = useState({
    title: "",
    message: "",
    notice_links: "",
    issued_date: "",
    expiry_date: "",
    notice_type: "",
  });

  useEffect(() => {
    if (status === "succeeded") {
      setUpdateDialogOpen(false);
      setNoticeDialogOpen(false);
      dispatch(resetStatus());
      setFormValues({
        title: "",
        message: "",
        notice_links: "",
        issued_date: "",
        expiry_date: "",
      });
    }
  }, [status, setUpdateDialogOpen, dispatch]);

  useEffect(() => {
    if (user) {
      dispatch(getSchoolNoticeData({ school_id, academic_year_id }));
    }
  }, [user]);

  const handleUpdateNotice = (id, body) => {
    dispatch(updateSchoolNotice({ id, body }));
  };

  const handleDeleteNotice = (id) => {
    dispatch(deleteSchoolNotice(id));
  };

  if (!notices.length) {
    return (
      <div className="p-4 h-full relative">
        <div
          className="p-6 rounded-lg shadow-md h-full flex justify-center items-center relative"
          style={{ backgroundColor: themeProperties?.boxBackgroundSolid }}
        >
          <p style={{ color: themeProperties?.textColor }}>No notices found</p>
          <CreateNoticeDialog themeProperties={themeProperties} user={user} />
        </div>
      </div>
    );
  }

  return (
    <div className="h-full">
      <div
        className="p-6 rounded-lg shadow-md h-full"
        style={{ backgroundColor: themeProperties?.boxBackgroundSolid }}
      >
        <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-20">
          {notices.map((notice) => (
            <div key={notice?.id} className="">
              <Dialog
                open={noticeDialogOpen}
                onOpenChange={setNoticeDialogOpen}
              >
                <DialogTrigger
                  onClick={() => setSelectedNotice(notice)}
                  className="w-80 rounded-lg text-start border-2 text-base"
                  style={{
                    borderColor: themeProperties?.normal1,
                    color: themeProperties?.textColor,
                  }}
                >
                  <h1
                    className="p-4 text-sm"
                    style={{
                      backgroundColor: themeProperties?.normal1,
                      color: themeProperties?.textColorAlt,
                    }}
                  >
                    {/* <span className="text-sm">Notice: </span>  */}
                    {notice?.title}
                  </h1>
                  <div className="flex  justify-between">
                    <p className="text-sm px-4 py-4 flex items-center gap-2">
                      <CalendarIcon className="h-4 w-4" />
                      Date: {new Date(notice?.issued_date).toLocaleDateString()}
                    </p>
                    <p
                      className="text-sm px-4 py-4"
                      style={{
                        color: themeProperties?.logoutColor,
                      }}
                    >
                      {notice?.notice_type !== "General" && notice?.notice_type}
                    </p>
                  </div>
                </DialogTrigger>
                {selectedNotice && selectedNotice?.id === notice?.id && (
                  <DialogContent
                    style={{
                      backgroundColor: themeProperties?.boxBackgroundSolid,
                    }}
                  >
                    <DialogHeader>
                      <DialogTitle className="text-base">
                        {selectedNotice?.title}
                      </DialogTitle>
                    </DialogHeader>
                    <DialogDescription
                      className="flex flex-col gap-1"
                      style={{
                        color: themeProperties?.textColor,
                      }}
                    >
                      <p>{selectedNotice?.message}</p>

                      <div className="flex justify-between mt-10">
                        <p
                          className="text-sm my-2"
                          style={{
                            color: themeProperties?.logoutColor,
                          }}
                        >
                          Expiry date:{" "}
                          {new Date(
                            selectedNotice.expiry_date
                          ).toLocaleDateString()}
                        </p>
                        <p
                          className="text-sm my-2"
                          style={{
                            color: themeProperties?.logoutColor,
                          }}
                        >
                          Notice Type: {selectedNotice?.notice_type}
                        </p>
                      </div>

                      {selectedNotice?.notice_links && (
                        <a
                          href={selectedNotice?.notice_links}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="underline"
                          style={{ color: themeProperties?.specialColor }}
                        >
                          More details
                        </a>
                      )}
                    </DialogDescription>
                    <DialogFooter className="flex justify-between w-full items-center">
                      <Dialog>
                        <DialogTrigger
                          className="self-end px-4 py-2 rounded-lg text-sm"
                          style={{
                            backgroundColor: themeProperties?.logoutColor,
                            color: themeProperties?.textColorAlt,
                          }}
                        >
                          Delete
                        </DialogTrigger>
                        <DialogContent
                          style={{
                            backgroundColor:
                              themeProperties?.boxBackgroundSolid,
                          }}
                        >
                          <DialogHeader>
                            <DialogTitle className="text-base">
                              Delete Notice
                            </DialogTitle>
                          </DialogHeader>
                          <DialogDescription>
                            <p>Are you sure you want to delete this notice?</p>
                          </DialogDescription>
                          <div className="text-end">
                            <button
                              className="px-6 py-2 rounded-lg text-sm"
                              style={{
                                backgroundColor: themeProperties?.logoutColor,
                                color: themeProperties?.textColorAlt,
                              }}
                              onClick={() => handleDeleteNotice(notice?.id)}
                            >
                              Delete
                            </button>
                          </div>
                        </DialogContent>
                      </Dialog>

                      <Dialog
                        open={updateDialogOpen}
                        onOpenChange={setUpdateDialogOpen}
                      >
                        <DialogTrigger
                          className="self-end px-4 py-2 rounded-lg text-sm"
                          style={{
                            backgroundColor: themeProperties?.buttonColor,
                            color: themeProperties?.textColorAlt,
                          }}
                          onClick={() => {
                            setFormValues({
                              title: selectedNotice?.title,
                              message: selectedNotice?.message,
                              notice_links: selectedNotice?.notice_links,
                              expiry_date: selectedNotice?.expiry_date,
                              notice_type: selectedNotice?.notice_type,
                            });
                          }}
                        >
                          Edit
                        </DialogTrigger>
                        <DialogContent
                          style={{
                            backgroundColor:
                              themeProperties?.boxBackgroundSolid,
                          }}
                        >
                          <DialogHeader>
                            <DialogTitle className="text-base">
                              Edit Notice
                            </DialogTitle>
                          </DialogHeader>
                          <DialogDescription className="flex flex-col gap-10">
                            <div className="flex justify-between mt-4">
                              <InputField
                                type="text"
                                name="title"
                                placeholder="Title"
                                value={formValues.title}
                                handleChange={(e) =>
                                  setFormValues({
                                    ...formValues,
                                    title: e.target.value,
                                  })
                                }
                                label="Title"
                              />

                              <div className=" relative">
                                {formValues.notice_type && (
                                  <p className="text-[12px] absolute -top-5 left-1">
                                    Notice Type
                                  </p>
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
                                handleChange={(e) =>
                                  setFormValues({
                                    ...formValues,
                                    notice_links: e.target.value,
                                  })
                                }
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
                                        background:
                                          themeProperties?.inputBackground,
                                        color: themeProperties?.inputTextColor,
                                      }}
                                    >
                                      <CalendarIcon className="h-4 w-4" />
                                      {formValues.expiry_date
                                        ? format(
                                            new Date(formValues.expiry_date),
                                            "dd/MM/yyyy"
                                          )
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
                                      onSelect={(selectedDate) =>
                                        setFormValues({
                                          ...formValues,
                                          expiry_date: selectedDate,
                                        })
                                      }
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
                                handleChange={(e) =>
                                  setFormValues({
                                    ...formValues,
                                    message: e.target.value,
                                  })
                                }
                                label="Message"
                              />
                            </div>
                          </DialogDescription>
                          <div className="text-end">
                            <button
                              className="px-4 text-sm py-2 rounded-lg"
                              style={{
                                backgroundColor: themeProperties?.normal1,
                                color: themeProperties?.textColorAlt,
                              }}
                              onClick={() => {
                                handleUpdateNotice(notice?.id, {
                                  title: formValues.title,
                                  message: formValues.message,
                                  notice_links: formValues.notice_links,
                                  expiry_date: formValues.expiry_date,
                                  notice_type: formValues.notice_type,
                                });
                              }}
                            >
                              Update
                            </button>
                            <button
                              className="px-4 text-sm py-2 rounded-lg mx-2"
                              style={{
                                backgroundColor: themeProperties?.logoutColor,
                                color: themeProperties?.textColorAlt,
                              }}
                              onClick={() => {
                                setUpdateDialogOpen(false);
                              }}
                            >
                              Cancel
                            </button>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </DialogFooter>
                  </DialogContent>
                )}
              </Dialog>
            </div>
          ))}
        </div>
        <CreateNoticeDialog themeProperties={themeProperties} user={user} />
        <div className="absolute bottom-6 left-6">
          <Link
            to="/admin/class-notice"
            className="text-sm px-4 py-2 rounded-lg"
            style={{
              backgroundColor: themeProperties?.logoutColor,
              color: themeProperties?.textColorAlt,
            }}
          >
            Manage Class Notice
          </Link>
        </div>
      </div>
    </div>
  );
}
