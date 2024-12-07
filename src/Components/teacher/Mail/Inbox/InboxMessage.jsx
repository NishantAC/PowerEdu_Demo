import React, { useState, useRef, useEffect } from 'react';
import { MdDelete } from "react-icons/md";
import { CiStar } from "react-icons/ci";
import { IoPrint } from "react-icons/io5";
import DeleteModal from '../Deleted/DeleteModal';
import ReplyForwardMail from '../ReplyForwardMail/ReplyForwardMail';
import ReactToPrint from 'react-to-print';
import { getCurrentTime } from '../../../../common/Time';
import DOMPurify from 'dompurify';
import IframeContent from '../IframeContent';

function InboxMessage({ messageData, setValue }) {
  const componentRef = useRef();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [sanitizedContent, setSanitizedContent] = useState('');
  useEffect(() => {
    setSanitizedContent(DOMPurify.sanitize(messageData.body));
  }, [messageData.body]);

  return (
    <div className="h-full">
      <div className="flex items-center space-x-8 justify-end pr-10 py-2">
        <div className="relative group cursor-pointer">
          <CiStar size={25} className="cursor-pointer"
            color={messageData.isFavourite ? "yellow" : "black"}
          />
          <div className="absolute left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 bg-gray-700 text-white text-xs p-1 rounded-md transition-opacity">
            Favourites
          </div>
        </div>

        <ReactToPrint
          trigger={() => (
            <div className="relative group cursor-pointer">
              <IoPrint size={25} className="text-white cursor-pointer"
                color="blue"
              />
              <div className="absolute left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 bg-gray-700 text-white text-xs p-1 rounded-md transition-opacity">
                Print
              </div>
            </div>
          )}
          content={() => componentRef.current}
        />

        <div
          onClick={handleOpen}
          className="relative group cursor-pointer"
        >
          <MdDelete size={25} className="text-white cursor-pointer"
            color='red'
          />
          <div className="absolute  left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 bg-gray-700 text-white text-xs p-1 rounded-md transition-opacity">
            Delete
          </div>
        </div>

        {open && (
          <DeleteModal
            open={open}
            handleClose={handleClose}
            messageData={messageData}
          />
        )}
      </div>

      <div className="printme">
        <IframeContent
          content={DOMPurify.sanitize(messageData.body)}
          messageData={messageData}
          setValue={setValue}
        />
      </div>

      <div ref={componentRef} className="print-content">

	   <style>
		{`
		.print-content {
		visibility:hidden;
		height:0;
		overflow:hidden;
		opacity:0;

		}

		@media print {
		.print-content {

		visibility:visible;
		height:auto;
		overflow:visible;
		opacity:1;
		}
		}
		`}
	   </style>
		
        <div
          dangerouslySetInnerHTML={{ __html: sanitizedContent }} />
      </div>
    </div>
  );
}

export default InboxMessage;