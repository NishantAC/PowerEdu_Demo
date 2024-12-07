import React, { useEffect, useRef, useState } from "react";
import ReplyForwardMail from "./ReplyForwardMail/ReplyForwardMail";
import { useSelector } from "react-redux";
import { selectThemeProperties } from "@/slices/theme";
import { getTime } from "@/common/Time";

function IframeContent({ content, messageData, setValue }) {
  const iframeRef = useRef(null);
  const [height, setHeight] = useState("100%");
  const themeProperties = useSelector(selectThemeProperties);

  useEffect(() => {
    const iframeDoc =
      iframeRef.current.contentDocument ||
      iframeRef.current.contentWindow.document;
  
    iframeDoc.open();
    iframeDoc.write(content);
    iframeDoc.close();
  
    console.log(messageData);
  
    const updateHeight = () => {
      if (iframeRef.current) {
        const iframeBody = iframeDoc.body || iframeDoc.documentElement;
        // Reset height to prevent retaining the previous height
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
  
    // Update height afte content is loaded
    iframeRef.current.addEventListener("load", updateHeight);
    iframeDoc.addEventListener("click", handleLinkClick);
    updateHeight();
  

  }, [content, messageData]);
  

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
    const match = from.match(/(.*) <(.*)>/);
    if (match) {
      return { name: match[1], email: match[2] };
    }
    return { name: from, email: "" };
  };

  const { name, email } = extractNameAndEmail(messageData.from);

  return (
    <div
      className="w-full rounded-lg shadow-lg"
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
        <h2 className=" text-[20px]">{messageData.subject}</h2>

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
              {" "}
              {"< " + email + " >"}
            </h2>
          </div>

          <p className="text-[12px]">
               {getTime(messageData.date)} {" • "}
               {getCurrentTime(messageData.date)}</p>
        </div>
      </div>

      {/* Iframe Section */}
      <div className="w-full overflow-hidden  ">
        <iframe
          ref={iframeRef}
          className="w-full "
          style={{
            height: height,
            border: "none",
            backgroundColor: themeProperties?.backgroundColor,
          }}
        />
      </div>

      {/* Reply/Forward Section */}
      <div className="w-full  py-4 mt-4">
        <ReplyForwardMail email={messageData} setValue={setValue} />
      </div>
    </div>
  );
}

export default IframeContent;