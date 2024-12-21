import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CircularService from "../../../services/circular.service";
import moment from "moment";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import DOMPurify from "dompurify";
import { FaCalendarAlt } from "react-icons/fa";


function CircularsList({ themeProperties }) {


  const { user } = useSelector((state) => state.user);
  const [circularsArray, setCircularsArray] = useState([]);
  useEffect(() => {
    CircularService.getCirculars(user?.schoolcode).then((res) => {
      const formattedCirculars = res.map((circular) => ({
        id: circular.id,
        subject: circular.title,
        date: moment(circular.date).format("DD-MM-YYYY"),
        message: circular.message,
      }));
      setCircularsArray(formattedCirculars);
    });
  }, [user]);

  return (
    <div
      className="min-h-[72vh] w-full lg:w-4/5 flex flex-col rounded-2xl shadow-md overflow-hidden"
      style={{
        color: themeProperties.textColorAlt,
        background: themeProperties?.boxBackground

      }}

    >
      {/* Top heading box */}
      <div className="w-full flex items-center px-5 py-3 justify-center shadow-sm">
        <h2
          className={` text-lg font-normal text-center`}
          style={{
            color: themeProperties.normal2,
          }}
        >
          Circulars
        </h2>
      </div>

      {/* List container */}
      <div className="flex flex-col rounded-b-lg"
            style={{
              background: themeProperties?.boxBackground
      }}
      >
        {/* Header */}
        <div
          className="flex justify-between px-6 py-3 text-xs sticky top-0  left-0"
        >
          <span className="text-[12px] ">SUBJECT</span>
          <span className=" text-[12px] ">DATE</span>
        </div>

        {/* Circulars */}
        <div className="custom-scrollbar w-full flex flex-col overflow-y-scroll px-6 py-4 ">
          {circularsArray.map((circular, index) => (
            <Dialog key={index} className ="custom-scrollbar">
              <DialogTrigger asChild>
                <div
                  className="flex justify-between py-3 rounded-lg px-3 cursor-pointer transition circularButton"
                  style={{
                    "--hover-bg": themeProperties.boxHoverColor,
                    "--hover-text": themeProperties.boxHoverTextColor,
                  }}
                >

                      <style>
                      {`    
                        .circularButton{
                         color: ${themeProperties?.textColor},
                        } 
                        .circularButton:hover {
                          background: var(--hover-bg);
                          color: var(--hover-text);
                        }
                      `}
                    </style>

                  <span className="w-2/3 truncate">{circular.subject}</span>
                  <span className="w-1/3 text-right">{circular.date}</span>
                </div>
              </DialogTrigger>

              <DialogContent
                style={{
                  color: themeProperties.textColor,
                  background: themeProperties?.boxBackground

                }}
                className="p-0  max-h-[80vh] min-w-[60vw] overflow-y-scroll"
              >
                <DialogHeader >
                  <DialogTitle
                  className = "text-center p-4 text-2xl font-normal flex items-center justify-center"
                  style={{ color: themeProperties.textColor, 
                    background: themeProperties.secondaryColor,
                   }}>


                  <div className="text-center flex items-center justify-center absolute left-4">
                <DialogDescription className=" flex p-4 gap-2 w-fit rounded-md justify-center items-center"
                  style={{ 
                      color : themeProperties.textColor
                   }}
                  >
                      <FaCalendarAlt  />

                    {circular.date}
                  </DialogDescription>
                  </div>

                    {circular.subject}




                  </DialogTitle>
                  
                </DialogHeader>
                  <DialogDescription
                  className="m-4 p-4 flex flex-col items-start text-start "
                  style={{ color: themeProperties.textColorAlt }}
                >
                  <div
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(circular.message),
                    }}
                    className="prose text-sm m-0 p-0 "
                    style={{ color: themeProperties.textColor }}

                  />
                </DialogDescription>
              </DialogContent>
            </Dialog>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CircularsList;
