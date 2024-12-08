import React, { useEffect, useRef, useState } from "react";
import ReplyForwardMail from "./ReplyForwardMail/ReplyForwardMail";
import { useSelector } from "react-redux";
import { selectThemeProperties } from "@/slices/theme";
import { getTime } from "@/common/Time";
import { FaRegFilePdf } from "react-icons/fa";
import { Document, Page } from "react-pdf";


function IframeContent({ content, messageData, setValue, showReplyForward }) {
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
        // add scroller class to iframe body
        iframeBody.classList.add("scroller");
        iframeRef.current.style.height = "0px";
        const calculatedHeight = iframeBody.scrollHeight + "px";
        setHeight(calculatedHeight);
        iframeRef.current.style.height = calculatedHeight;
      }
    };

    const handleLinkClick = (event) => {
      if (event.target.tagName === "A") {
        event.preventDefault();
        window.open(event.target.href, "_blank");
      }
    };

    iframeRef.current.addEventListener("load", updateHeight);
    iframeDoc.addEventListener("click", handleLinkClick);
    updateHeight();
  }, [content]);

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

  const renderPdfPages = () => {
    const pages = [];
    for (let i = 1; i <= numPages; i++) {
      pages.push(<Page key={i} pageNumber={i} width={128} />);
    }
    return pages;
  };

  const renderMessage = (message) => {
    const { name, email } = extractNameAndEmail(message?.from || "");

    return (
      <div
        className="w-full rounded-lg "
        style={{
          color: themeProperties?.textColorAlt,
          backgroundColor: themeProperties?.background,
        }}
      >
        {/* Message Metadata */}
        <div
          className="border-b py-6 px-4 pb-4 flex
           justify-between flex-col gap-4"
        >
          <h2 className=" text-[20px]">{message?.subject || ""}</h2>

          <div className="flex gap-4 items-center justify-between">
            <div className=" flex gap-2 items-center ">
              <div
                className="w-10 h-10 rounded-full  flex items-center justify-center"
                style={{ backgroundColor: themeProperties?.normal3 }}
              >
                <p
                  className="text-lg font-semibold"
                  style={{ color: themeProperties?.textColor }}
                >
                  {name.charAt(0)}
                </p>
              </div>

              <h1 className="text-[14px] ">{name}</h1>
              <h2
                className="text-[12px] font-light "
                style={{
                  color: themeProperties?.textColorLight,
                }}
              >
                {"< " + email + " >"}
              </h2>
            </div>

            <p className="text-[12px]">
              {getTime(message?.date)} {" • "}
              {getCurrentTime(message?.date)}
            </p>
          </div>
        </div>

        {/* Iframe Section */}
        <div className="w-full overflow-hidden   ">
          <iframe
            ref={iframeRef}
            className="w-full scroller"
            style={{
              height: height,
              minHeight: "100px",
              border: "none",
              backgroundColor: themeProperties?.backgroundColor,
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
        { showReplyForward &&
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