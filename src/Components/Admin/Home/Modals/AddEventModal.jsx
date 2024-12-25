import React, { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

const AddEventModal = ({ themeProperties }) => {
  const [deviceSize, setDeviceSize] = useState("pc");
  const [date, setDate] = useState(null);
  const [date2, setDate2] = useState(null);
  useEffect(() => {
    const handleResize = () => {
      const screenSize = window.innerWidth;
      if (screenSize < 640) {
        setDeviceSize("sm");
      } else if (screenSize < 768) {
        setDeviceSize("md");
      } else if (screenSize < 1024) {
        setDeviceSize("xl");
      } else if (screenSize < 1280) {
        setDeviceSize("2xl");
      } else {
        setDeviceSize("pc");
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <Dialog >
      <DialogTrigger >
        <div
          onClick={() => setAddEventModalOpen(true)}
          style={{
            borderRadius: "10px",
            color: themeProperties.specialColor,
            cursor: "pointer",
            overflow: "hidden",
            background: themeProperties.boxBackgroundSolid,
          }}
        >
          <p className="backdrop-blur-lg text-nowrap py-[10px] text-[14px] px-[20px] rounded-[8px]">
            New Event
          </p>
        </div>
      </DialogTrigger>
      <DialogContent className="p-0 overflow-hidden" style={{
        color : themeProperties.textColorAlt
      }}>
        <DialogHeader
          className="p-4 w-full"
          style={{
            color: themeProperties.textColorAlt,
            background: themeProperties.boxBackgroundTop
          }}
        >
          <DialogTitle className="text-center font-normal text-2xl">
            Create A New Event
          </DialogTitle>
        </DialogHeader>
        <div className="w-full bg-white flex flex-col items-center p-4 gap-4">
          <div className="w-full flex flex-col">
            <input
              className="border border-gray-300 p-3 rounded-md placeholder:font-normal"
              placeholder="Event name "
              style={{ background: themeProperties?.inputBackground, 
                color: themeProperties?.inputTextColor
                 }}
            />
          </div>
          <div className="w-full flex flex-col">
            <textarea
              placeholder="Enter event description"
              className="border border-gray-300 p-3 rounded-md placeholder:font-normal"

              style={{ background: themeProperties?.inputBackground, 
              color: themeProperties?.inputTextColor
               }}
            />
          </div>
          <div className="w-full items-center justify-center flex flex-col gap-2 ">
            <div className=" flex flex-col w-full ">
              <input
                placeholder="Enter Class"
                className="border border-gray-300 py-3 px-4 text-black rounded-md"
                style={{ background: themeProperties?.inputBackground, 
                  color: themeProperties?.inputTextColor
                   }}
              />
            </div>
            <div className=" flex justify-between  w-full">
            <div className="">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "justify-start text-center w-48 font-normal text-black",
                      !date && "text-muted-foreground"
                    )}
                    style={{ background: themeProperties?.inputBackground, 
                      color: themeProperties?.inputTextColor
                       }}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, 'PPP') : <span>Start Date </span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" >
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="">
              <Popover className =''>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      " justify-star text-center font-normal text-black",
                      !date2 && "text-muted-foreground w-48"
                    )}
                    style={{ background: themeProperties?.inputBackground, 
                      color: themeProperties?.inputTextColor
                       }}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date2 ? format(date2, "PPP") : <span>End date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={date2}
                    onSelect={setDate2}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            </div>
          </div>
          <button
            className="px-4 py-3 rounded-md  transition-all duration-300"
            style={{
              background: themeProperties.buttonColor,
              color: themeProperties.textColorAlt,
            }}
          >
            Add Event
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddEventModal;