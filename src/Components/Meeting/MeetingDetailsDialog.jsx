import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

function MeetingDetailsDialog({ meeting, themeProperties, open, onOpenChange }) {
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
        className="p-0 overflow-hidden rounded-lg shadow-lg"
        style={{ color: themeProperties.textColorAlt }}
      >
        <DialogHeader className="">
          <DialogTitle
            className="text-2xl p-4 font-normal text-center "
            style={{ color: themeProperties.textColorAlt , background: themeProperties.boxBackgroundTop }}
          >
            {meeting.summary || 'No Title'}
          </DialogTitle>
        </DialogHeader>
        <div className="min-h-80 p-4 flex flex-col justify-around items-start" 
          style={{ color: themeProperties.textColor  }}>
          <div className='w-full text-start'>
            Time : {startTime} - {endTime}
          </div>

          <p dangerouslySetInnerHTML={{ __html: meeting.description || '' }} />

          {meeting.attachments && meeting.attachments.length > 0 && (
            <div className="w-full text-start ">
              {meeting.attachments.map((attachment, index) => (
                <div key={index} className="mt-2">
                  <a
                    href={attachment.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center"
                  >
                    <img src={attachment.iconLink} alt="icon" className="mr-2" />
                    {attachment.title}
                  </a>
                </div>
              ))}
            </div>
          )}
          <p className='text-end w-full'>
            {meeting.hangoutLink ? (
              <a
                href={meeting.hangoutLink}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-3 rounded-md"
                style={{ background: themeProperties.buttonColor, 
                    color: themeProperties.textColorAlt
                 }}
              >
                Join Meeting
              </a>
            ) : (
              'No link available'
            )}
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default MeetingDetailsDialog;