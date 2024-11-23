import React from 'react';
import MeetingDetailsDialog from './MeetingDetailsDialog.jsx';

function MeetingsTable({ meetings, themeProperties }) {
  return (
    <div className="">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <div className="bg-white divide-y divide-gray-200">
            {meetings.map((meeting) => (
              <div key={meeting.id} className=' flex items-center justify-between'>
                <div className="py-4 whitespace-nowrap"
              style={{ color: themeProperties.textColorAlt }}>{meeting.summary || 'No Title'}</div>
                <div className="py-4 whitespace-nowrap text-end">
                  <MeetingDetailsDialog meeting={meeting} themeProperties={themeProperties} />
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