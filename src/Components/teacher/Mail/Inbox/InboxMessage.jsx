import React, { useState, useRef, useEffect, useCallback } from "react";
import { MdDelete } from "react-icons/md";
import { CiStar } from "react-icons/ci";
import { FaStar } from "react-icons/fa";
import { IoPrint } from "react-icons/io5";
import DeleteModal from "../Deleted/DeleteModal";
import ReplyForwardMail from "../ReplyForwardMail/ReplyForwardMail";
import ReactToPrint from "react-to-print";
import { getCurrentTime } from "../../../../common/Time";
import DOMPurify from "dompurify";
import IframeContent from "../IframeContent";
import { Skeleton } from "@mui/material";
import { addStarred } from "@/services/mail.service";
import { toast } from "sonner";
import gsap from "gsap";
import debounce from "lodash.debounce";
import { selectThemeProperties } from "@/slices/theme";
import { useSelector } from "react-redux";


function InboxMessage({ messageData, setValue, refreshLoading , disableRefresh}) {
  const componentRef = useRef();
  const starRef = useRef();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [sanitizedContent, setSanitizedContent] = useState("");
  const [isPrinting, setIsPrinting] = useState(false);
  const themeProperties = useSelector(selectThemeProperties);

  const [isStarred, setIsStarred] = useState(messageData?.isStarred);
  useEffect(() => {
    setSanitizedContent(DOMPurify.sanitize(messageData.body));
  }, [messageData.body]);

  const handleStarred = useCallback(
    debounce(() => {
      addStarred(messageData?.threadId)
        .then((res) => {
          if (res.status === 200) {
            setIsStarred(!isStarred);
            toast.success("Message Starred Successfully", {
              description: "This Message has been starred",
            });

            // Animate the lines
            const lines = starRef.current.querySelectorAll(".line");
            gsap.fromTo(
              lines,
              { opacity: 1, scaleY: 0.5 },
              {
                opacity: 0,
                scaleY: 2,
                duration: 0.8,
                stagger: 0.1,
                ease: "power2.out",
              }
            );
          }
        })
        .catch((error) => {
          toast.error("Failed to Star Message", {
            description: "Please try again",
          });
        });
    }, 1000),
    [isStarred, messageData?.threadId]
  );

  useEffect(() => {
    setIsStarred(messageData?.isStarred);
  }, []);


  const handlePrint = useCallback(() => {
    setIsPrinting(true);
    setTimeout(() => {
      // print the componentRef
      setIsPrinting(false);
    }, 0);
  }, []);

  return (
    <div className="h-full">
      <div className="flex items-center space-x-8 justify-end pr-10 py-2">
        <div className="relative group cursor-pointer" onClick={handleStarred} ref={starRef}>
          <div className="lines-container absolute inset-0 flex items-center justify-center ">
            {[...Array(5)].map((_, index) => (
              <div
                key={index}
                className="line absolute w-1 h-4 opacity-0"
                style={{
                  transform: `rotate(${index * 72}deg)`,
                  background: themeProperties?.primaryColor,
                }}
              ></div>
            ))}
          </div>
          {isStarred ? (
            <FaStar size={23} className="cursor-pointer" color={themeProperties?.primaryColor}/>
          ) : (
            <CiStar size={25} className="cursor-pointer" color="black" />
          )}
          <div className="absolute left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 bg-gray-700 text-white text-xs p-1 rounded-md transition-opacity">
            Starred
          </div>
        </div>

        <ReactToPrint
        
          trigger={() => (
            setIsPrinting(true),
            <div className="relative group cursor-pointer"
            >
              <IoPrint
                size={25}
                className="text-white cursor-pointer"
                color="blue"
              />
              <div className="absolute left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 bg-gray-700 text-white text-xs p-1 rounded-md transition-opacity">
                Print
              </div>
            </div>
          )}
          content={() =>{ 
            setIsPrinting(true);
            return componentRef.current;
          }}
        />

        <div onClick={handleOpen} className="relative group cursor-pointer">
          <MdDelete
            size={25}
            className="text-white cursor-pointer"
            color="red"
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

      <div className=" h-full">
        <IframeContent
          content={DOMPurify.sanitize(messageData.body)}
          messageData={messageData}
          setValue={setValue}
          showReplyForward={true}
          refreshLoading={refreshLoading}
          
        />
      </div>

      <div ref={componentRef}>
  <style>
    {`
      .print-content {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: -1; /* Ensure it doesn't affect the layout */
        visibility: hidden; /* Hidden by default */
      }

      @media print {
        .print-content {
          position: static; /* Reset positioning for print layout */
          z-index: auto; /* Allow it to appear normally */
          visibility: visible; /* Make visible only during print */
          width: 100%;
          height: auto;
        }
      }
    `}
  </style>
  <div
    className="print-content"
    dangerouslySetInnerHTML={{ __html: sanitizedContent }}
  />
</div>

    </div>
  );
}

export default InboxMessage;