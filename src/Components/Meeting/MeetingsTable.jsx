import React, { useState } from "react";
import MeetingDetailsDialog from "./MeetingDetailsDialog.jsx";

function MeetingsTable({ meetings, themeProperties }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <div className="bg-white divide-y divide-gray-200">
            {meetings.map((meeting) => (
              <div
                key={meeting.id}
                className=" flex items-center justify-between border-b-2 cursor-pointer w-full py-2"
                onClick={() => setOpen(true)}
              >
                <div
                  className=" whitespace-nowrap"
                  style={{ color: themeProperties.textColor }}
                >
                  {meeting.summary || "No Title"}
                </div>
                <div className=" text-end flex-1">
                  {meeting.start.dateTime && meeting.end.dateTime && (
                    <div className="text-sm font-medium">
                      {new Date(meeting.start.dateTime).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true,
                      })}
                    </div>
                  )}
                </div>
                <div className="py-1 whitespace-nowrap text-end text-sm font-medium ">
                  <MeetingDetailsDialog
                    meeting={meeting}
                    themeProperties={themeProperties}
                    open={open}
                    onOpenChange={setOpen}
                    date = {new Date(meeting.start.dateTime).toLocaleDateString()}
                  />
                </div>
              </div>
            ))}
          </div>
        </table>
      </div>
    </div>
  );
}

export default MeetingsTable;
