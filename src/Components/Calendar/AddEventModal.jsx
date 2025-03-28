import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDropdownClasses } from "../../slices/principal";
import CalendarServices from "../../services/calendar.service";
import { toast } from "sonner";
import { Formik, Form, Field } from "formik";
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/Components/ui/dialog";
import { selectThemeProperties } from "@/slices/theme";
import InputField from "@/Components/InputField/InputField";
import SelectBox from "@/Components/InputField/SelectBox";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/Components/ui/popover";
import { cn } from "@/lib/utils";
import { Button } from "@/Components/ui/button";
import { Calendar } from "@/Components/ui/calendar";
import { Calendar as CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { FaGoogle } from "react-icons/fa";
import { CiAlarmOff } from "react-icons/ci";


const AddEventModal = ({
  setOpen,
  open,
  holiday,
  getEvents,
  editData,
  setEditData,
  setHoliday,
  selectedDate,
  events,
}) => {
  const { classes } = useSelector((state) => state.principal);
  const { user: currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [editing, setEditing] = useState(false);
  const themeProperties = useSelector(selectThemeProperties);
  const [selectedMeeting, setSelectedMeeting] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    dispatch(getDropdownClasses({ school_id: currentUser.school_id }));
  }, []);

  const handleClose = () => {
    setOpen(false);
    setEditData(null);
    setHoliday(null);
  };

  const initialValues = {
    eventName: editData ? editData.title : "",
    description: editData ? editData.extendedProps.description : "",
    selectedClass: editData ? editData.class_code : "",
    startDate: editData ? editData.start : "",
    endDate: editData ? editData.end : "",
  };

  const handleDateChange = (name, selectedDate, setFieldValue) => {
    if (selectedDate) {
      const localDate = new Date(selectedDate.getTime() - selectedDate.getTimezoneOffset() * 60000);
      const formattedDate = localDate.toISOString().split("T")[0];
      setFieldValue(name, formattedDate);
    }
  };

  const handleSubmit = (values, { setSubmitting }) => {
    const data = {
      event_name: values.eventName,
      event_desc: values.description,
      start_date: values.startDate,
      end_date: values.endDate,
      event_type: values.selectedClass ? "class" : "school",
      class_code: values.selectedClass,
      school_code: currentUser.school_id,
      isHoliday: holiday,
    };

    if (editData) {
      CalendarServices.editEvent(editData.id, data)
        .then((res) => {
          getEvents();
          handleClose();
          toast.success(res.data.message, {
            autoClose: 1000,
            position: "bottom-right",
          });
        })
        .catch((error) => {
          console.error("Error editing event:", error);
          toast.error("Error editing event. Please try again later.", {
            autoClose: 3000,
            position: "bottom-right",
          });
        })
        .finally(() => setSubmitting(false));
    } else {
      CalendarServices.addEvent(data)
        .then((res) => {
          getEvents();
          handleClose();
          toast.success(res.data.message, {
            autoClose: 1000,
            position: "bottom-right",
          });
        })
        .catch((error) => {
          console.error("Error adding event:", error);
          toast.error("Error adding event. Please try again later.", {
            autoClose: 3000,
            position: "bottom-right",
          });
        })
        .finally(() => setSubmitting(false));
    }
  };

  const eventsForSelectedDate = events.filter(
    (event) =>
      new Date(event.start).toDateString() === selectedDate.toDateString()
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="hidden">Open</DialogTrigger>
      <DialogContent
        className="p-0 overflow-hidden"
        style={{
          color: themeProperties.textColorAlt,
        }}
      >
        <div className="">
          <DialogHeader
            className=" p-4 "
            style={{
              backgroundColor: themeProperties.boxBackgroundTop,
              color: themeProperties.textColorAlt,
            }}
          >
            <DialogTitle className=" font-normal">
              Events on {selectedDate.toDateString()}
            </DialogTitle>
          </DialogHeader>
          <DialogDescription className="p-4 ">

              {
                  eventsForSelectedDate.map((event, index) => (
                    console.log(event)
                ))}


              {!editing && (
              <div>
                {eventsForSelectedDate.map((event, index) => (
                  !event.isHoliday ? (
                    <div key={index} className="mb-4">
                      <button
                        onClick={() => {
                          setSelectedMeeting(event);
                          setDialogOpen(true);
                        }}
                        className="font-medium bg-[#ff3e5f] px-4 py-2 rounded"
                        style={{
                          background: event?.event_name ? themeProperties.buttonColor : "#ff3e5f",
                          color: themeProperties.textColorAlt,
                        }}
                      >
                        {event.title}
                      </button>
                    </div>
                  ) : (
                    <div key={index} className="mb-4">
                      <button
                        className="font-medium bg-[#ff7e1c] px-4 py-2 rounded"
                        style={{
                          color: themeProperties.textColorAlt,
                        }}
                      >
                        {event.title}
                      </button>
                    </div>
                  )
                ))}
              </div>
            )}
                
            <button
              onClick={() => {
                setEditing(!editing);
                setEditData(null);
              }}
              className="px-4 py-2 rounded mt-4"
              style={{
                backgroundColor: themeProperties.buttonColor,
                color: themeProperties.textColorAlt,
                display: !editing ? "block" : "none",
              }}
            >
              {editData ? "Edit Event" : "Add Event"}
            </button>
            {editing && (
              <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                {({ values, handleChange, setFieldValue, isSubmitting }) => (
                  <Form className="mt-4 flex flex-col gap-10">
                    <div className="flex justify-between">
                      <InputField
                        value={values.eventName}
                        htmlFor="eventName"
                        placeholder="Event Name"
                        name="eventName"
                        handleChange={handleChange}
                        required
                      />
                      <InputField
                        value={values.description}
                        htmlFor="description"
                        placeholder="Description"
                        name="description"
                        handleChange={handleChange}
                        required
                      />
                    </div>
                    <div className="flex justify-between">
                      <div className="startDate">
                        <label
                          htmlFor="startDate"
                          className="text-black text-[12px] font-normal absolute -translate-y-5 translate-x-1"
                          style={{ color: themeProperties?.textColorLight }}
                        >
                          Start Date
                        </label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "justify-start text-center w-48 font-normal text-black",
                                !values.startDate && "text-muted-foreground"
                              )}
                              style={{
                                background: themeProperties?.inputBackground,
                                color: themeProperties?.inputTextColor,
                              }}
                            >
                              <CalendarIcon className="h-4 w-4" />
                              {values.startDate ? (
                                format(new Date(values.startDate), "PPP")
                              ) : (
                                <span>Start Date</span>
                              )}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <Calendar
                              mode="single"
                              selected={
                                values.startDate ? new Date(values.startDate) : undefined
                              }
                              onSelect={(selectedDate) => handleDateChange("startDate", selectedDate, setFieldValue)}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                      <div className="endDate">
                        <label
                          htmlFor="endDate"
                          className="text-black text-[12px] font-normal absolute -translate-y-5 translate-x-1"
                          style={{ color: themeProperties?.textColorLight }}
                        >
                          End Date
                        </label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "justify-start text-center w-48 font-normal text-black",
                                !values.endDate && "text-muted-foreground"
                              )}
                              style={{
                                background: themeProperties?.inputBackground,
                                color: themeProperties?.inputTextColor,
                              }}
                            >
                              <CalendarIcon className="h-4 w-4" />
                              {values.endDate ? (
                                format(new Date(values.endDate), "PPP")
                              ) : (
                                <span>End Date</span>
                              )}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <Calendar
                              mode="single"
                              selected={
                                values.endDate ? new Date(values.endDate) : undefined
                              }
                              onSelect={(selectedDate) => handleDateChange("endDate", selectedDate, setFieldValue)}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                    </div>
                    <div className="">
                      <label
                        htmlFor="class"
                        className="text-black text-[12px] font-normal absolute -translate-y-5 translate-x-1"
                        style={{ color: themeProperties?.textColorLight }}
                      >
                        Class
                      </label>
                      <SelectBox
                        options={classes}
                        info={values.selectedClass}
                        setInfo={(value) =>
                          setFieldValue("selectedClass", value)
                        }
                        placeHolder="Class"
                        value={values.selectedClass}
                      />
                    </div>
                    <div className="flex justify-between flex-row-reverse mt-12 mb-2">
                      <div className="text-center">
                        <button
                          type="submit"
                          className=" text-white px-4 py-2 rounded"
                          style={{
                            backgroundColor: themeProperties.buttonColor,
                            color: themeProperties.textColorAlt,
                          }}
                          disabled={isSubmitting}
                        >
                          {editData ? "Edit Event" : "Add Event"}
                        </button>
                      </div>
                      <button
                        onClick={() => {
                          setEditing(!editing);
                          setEditData(null);
                        }}
                        className="px-4 py-2 rounded "
                        style={{
                          backgroundColor: themeProperties.buttonColor,
                          color: themeProperties.textColorAlt,
                          display: editing ? "block" : "none",
                        }}
                      >
                        Back
                      </button>
                    </div>
                  </Form>
                )}
              </Formik>
            )}
          </DialogDescription>
        </div>
      </DialogContent>
      {selectedMeeting && (
        <></>
      )}
    </Dialog>
  );
};

export default AddEventModal;