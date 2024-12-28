import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { IoTimeOutline } from "react-icons/io5";
import { CiCalendarDate } from "react-icons/ci";
import DOMPurify from "dompurify";


function MeetingDetailsDialog({ meeting, themeProperties, open, onOpenChange , date}) {
  const timeZone = meeting.timeZone || 'UTC';
  
  const startTime = new Date(meeting.start.dateTime).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
    timeZone: timeZone,
  });
  const endTime = new Date(meeting.end.dateTime).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
    timeZone: timeZone,
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="overflow-hidden rounded-xl shadow-lg p-0"
        style={{ backgroundColor: themeProperties.backgroundColor, color: themeProperties.textColorAlt }}
      >
        <DialogHeader>
          <DialogTitle
            className="text-xl font-normal text-center py-4"
            style={{ color: themeProperties.textColorAlt, background: themeProperties.boxBackgroundTop }}
          >
            {meeting.summary || 'No Title'}
          </DialogTitle>
        </DialogHeader>

        <div className="p-6 space-y-4"
          style={{ color: themeProperties.textColor }}
        >
          <div className="text-sm w-full flex justify-between items-center">
            <div className="flex items-center justify-center gap-2 ">
              <CiCalendarDate className="mr-2" size={24} />
              {date}
            </div>

            <div className=' flex items-center justify-center gap-2 '>
              <IoTimeOutline className="mr-2"  size={22}/>
            {startTime} - {endTime}
            </div>
          </div>

          {meeting.description && (
            <div className="prose text-sm m-0 p-0"
            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(meeting.description), }} style={{ color: themeProperties.textColor } } />
          )}

          {meeting.attachments && meeting.attachments.length > 0 && (
            <div className="space-y-2">
              {meeting.attachments.map((attachment, index) => (
                <div key={index}>
                  <a
                    href={attachment.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-sm text-primary hover:underline"
                    style={{ color: themeProperties.textColor }}
                  >
                    <img
                      src={attachment.iconLink}
                      alt="icon"
                      className="w-5 h-5 mr-2 object-contain"
                    />
                    {attachment.title}
                  </a>
                </div>
              ))}
            </div>
          )}

          <div className="text-end">
            {meeting.hangoutLink ? (
              <a
                href={meeting.hangoutLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-4 py-2 text-sm font-medium rounded-lg"
                style={{ background: themeProperties.buttonColor, color: themeProperties.textColorAlt }}
              >
                Join Meeting
              </a>
            ) : (
              <span className="text-sm text-muted">No link available</span>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default MeetingDetailsDialog;
