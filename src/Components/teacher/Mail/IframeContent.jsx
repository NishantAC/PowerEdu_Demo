import React, { useEffect, useRef, useState } from "react";
import ReplyForwardMail from "./ReplyForwardMail/ReplyForwardMail";
import { useSelector } from "react-redux";
import { selectThemeProperties } from "@/slices/theme";
import { getTime } from "@/common/Time";
import { FaRegFilePdf } from "react-icons/fa";
import { Skeleton } from "@mui/material";
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';

function IframeContent({ content, messageData, setValue, showReplyForward ,refreshLoading}) {
  const iframeRef = useRef(null);
  const [height, setHeight] = useState("100%");
  const themeProperties = useSelector(selectThemeProperties);
  const [numPages, setNumPages] = useState(null);
  
   useEffect(() => {
    const iframeDoc =
      iframeRef.current.contentDocument ||
      iframeRef.current.contentWindow.document;
  
    iframeDoc.open();
    iframeDoc.write(content);
    iframeDoc.close();
  
    const updateHeight = () => {
      if (iframeRef.current) {
        const iframeBody = iframeDoc.body || iframeDoc.documentElement;
        iframeBody.classList.add("scroller");
        iframeRef.current.style.height = "0px";
        const calculatedHeight = iframeBody.scrollHeight + "px";
        setHeight(calculatedHeight);
        iframeRef.current.style.height = calculatedHeight;
      }
    };
  
    const handleLinkClick = (event) => {
      const anchor = event.composedPath().find((el) => el.tagName === "A");
      if (anchor) {
        event.preventDefault();
        anchor.setAttribute("target", "_blank");
        window.open(anchor.href, "_blank");
      }
    };
  
    iframeRef.current.addEventListener("load", updateHeight);
    iframeDoc.addEventListener("click", handleLinkClick);
  
      iframeDoc.body.style.color = themeProperties?.textColor || "initial";
    iframeDoc.body.style.backgroundColor = themeProperties?.boxBackgroundSolid || "initial";
  
    updateHeight();
  }, [content, themeProperties]);

  const getCurrentTime = (date) => {
    const currentDate = new Date();
    const messageDate = new Date(date);
    const diff = currentDate - messageDate;
    const diffInSeconds = diff / 1000;
    const diffInMinutes = diffInSeconds / 60;
    const diffInHours = diffInMinutes / 60;
    const diffInDays = diffInHours / 24;
    const diffInMonths = diffInDays / 30;
    const diffInYears = diffInMonths / 12;

    if (diffInSeconds < 60) {
      return `${Math.floor(diffInSeconds)} seconds ago`;
    } else if (diffInMinutes < 60) {
      return `${Math.floor(diffInMinutes)} minutes ago`;
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)} hours ago`;
    } else if (diffInDays < 30) {
      return `${Math.floor(diffInDays)} days ago`;
    } else if (diffInMonths < 12) {
      return `${Math.floor(diffInMonths)} months ago`;
    } else {
      return `${Math.floor(diffInYears)} years ago`;
    }
  };

  const extractNameAndEmail = (from) => {
    if (!from) {
      return { name: "", email: "" };
    }
    const match = from.match(/(.*) <(.*)>/);
    if (match) {
      return { name: match[1], email: match[2] };
    }
    return { name: from, email: "" };
  };

  const renderAttachments = (attachments) => {
    const decodeBase64ToBlob = (base64Data, dataType) => {
      const byteCharacters = atob(base64Data);
      const byteArrays = [];

      for (let offset = 0; offset < byteCharacters.length; offset += 512) {
        const slice = byteCharacters.slice(offset, offset + 512);

        const byteNumbers = new Array(slice.length);
        for (let i = 0; i < slice.length; i++) {
          byteNumbers[i] = slice.charCodeAt(i);
        }

        const byteArray = new Uint8Array(byteNumbers);
        byteArrays.push(byteArray);
      }

      return new Blob(byteArrays, { type: dataType });
    };

    return (
      <div className="flex flex-wrap gap-3 p-4">
        {attachments.map((attachment, index) => {
          const blob = decodeBase64ToBlob(attachment.data, attachment.dataType);
          const fileUrl = URL.createObjectURL(blob);
          return (
            <div
              key={index}
              className="flex flex-col items-center border rounded-lg cursor-pointer bg-white shadow-md transition-transform hover:scale-105 p-2 w-48 h-fit gap-4"
            >
              {attachment.dataType.startsWith("image/") ? (
                <img
                  src={fileUrl}
                  alt={attachment.filename || `Attachment ${index}`}
                  className="w-full h-20 object-cover mb-4 rounded"
                />
              ) : attachment.dataType === "application/pdf" ? (
                <div className="flex items-center justify-center w-full h-20 mb-4">
                  <FaRegFilePdf size={48} className="text-red-500" />
                </div>
              ) : (
                <div className="flex items-center justify-center w-full h-32 bg-gray-200 mb-4 rounded">
                  <span className="text-sm font-medium">File Preview</span>
                </div>
              )}
              <a href={fileUrl} download={attachment.filename || `attachment_${index}`} className="mt-auto">
                <span className="text-sm font-medium  hover:underline ">
                  {attachment.filename || "Download File"}
                </span>
              </a>
            </div>
          );
        })}
      </div>
    );
  };



  const renderMessage = (message) => {
    const { name, email } = extractNameAndEmail(message?.from || "");

    return (
      <div
        className="w-full rounded-lg "
        style={{
          color: themeProperties?.textColor,
          backgroundColor: themeProperties?.boxBackgroundSolid,
        }}
      >
        
        <div
          className="border-b py-6 px-4 pb-4 flex
           justify-between flex-col gap-4"
        >
          <h2 className=" text-[20px]">
          { refreshLoading ? <Skeleton variant="rectangular" width="100%" className=' h-[20px]' /> : message?.subject }
          </h2>

          <div className="flex gap-4 items-center justify-between">
          {
            refreshLoading ? 
            <Skeleton variant="rectangular" width="100%" className=' h-[20px]' /> 
            :
            <div className=" flex gap-2 items-center ">
            <div
              className="w-10 h-10 rounded-full  flex items-center justify-center"
              style={{ backgroundColor: themeProperties?.normal3 }}
            >
              <p
                className="text-lg font-semibold text-white"
                
              >
                {refreshLoading ? "" : name.charAt(0) }
              </p>
            </div>

            <h1 className="text-[14px] ">
              {name}
              </h1>
            <h2
              className="text-[12px] font-light "
              style={{
                color: themeProperties?.textColorLight,
              }}
            >
              { !refreshLoading && "< " + email + " >"}
            </h2>
          </div>
          }

            {
              !refreshLoading &&
              <p className="text-[12px]">
              {getTime(message?.date)} {" • "}
              {getCurrentTime(message?.date)}
            </p>
            }
          </div>
        </div>

        {/* Iframe Section */}
        <div className="w-full h-full overflow-hidden   ">


            {
              refreshLoading && <Skeleton variant="rectangular" sx={{ bgcolor: 'grey.100' }} className=' mx-4 mt-10 h-full' />
            }
          <iframe
            ref={iframeRef}
            className="w-full scroller"
            style={{
              height: refreshLoading ? "0px" : height,
              minHeight: "100px",
              border: "none",
              backgroundColor: themeProperties?.boxBackgroundSolid,
              visibility: refreshLoading ? "hidden" : "visible",
              color: themeProperties?.textColor,
            }}
          />
        </div>

        {/* Attachments Section */}
        {message.attachments && message.attachments.length > 0 && (
          <div className="w-full py-4">
            <h3 className="px-4 text-lg">Attachments:</h3>
            {renderAttachments(message.attachments)}
          </div>
        )}

        {/* Reply/Forward Section */}
        { showReplyForward && !refreshLoading &&
          <div className="w-full  py-4 mt-4">
          <ReplyForwardMail email={message} setValue={setValue} />
        </div>
        }
      </div>
    );
  };

  return (
    <div>
      {Array.isArray(messageData)
        ? messageData.map((message, index) => (
            <div key={index}>{renderMessage(message)}</div>
          ))
        : renderMessage(messageData)}
    </div>
  );
}

export default IframeContent;