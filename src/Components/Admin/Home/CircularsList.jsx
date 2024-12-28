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
import { Calendar } from "@/components/ui/calendar";
import { getGoogleEvents } from "@/slices/calendar";
import { useDispatch } from "react-redux";
import { Calendarmini } from "@/Components/ui/calendarmini";

function CircularsList({ themeProperties }) {
  const { user } = useSelector((state) => state.user);
  const [circularsArray, setCircularsArray] = useState([]);
  const { googleEvents } = useSelector((state) => state.calendarSlice);

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
      className="w-full lg:w-2/5 flex flex-col rounded-2xl overflow-hidden "
      style={{
        color: themeProperties.textColorAlt,
        background: themeProperties?.boxBackgroundSolid,
      }}
    >
      <div className="m-2">
        <Calendarmini
          googleEvents={googleEvents}
          circular={circularsArray}
          className=" shadow-md rounded-lg"
        />
      </div>
      {/* Circulars */}

      <div
        className="text-center font-normal"
        style={{
          color: themeProperties.textColor,
        }}
      >
        Circulars
      </div>

      <div className="flex flex-col m-2">
        <div className="custom-scrollbar w-full flex flex-col overflow-y-scroll ">
          {circularsArray.map((circular, index) => (
            <Dialog key={index} className="custom-scrollbar">
              <DialogTrigger asChild>
                <div
                  className="flex justify-between py-3 rounded-lg px-3 cursor-pointer transition circularButton"
                  style={{
                    "--hover-bg": themeProperties.boxHoverColor,
                    "--hover-text": themeProperties.boxHoverTextColor,
                    color: themeProperties.textColor,
                  }}
                >
                  <style>
                    {`    
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
                className="overflow-hidden rounded-xl shadow-lg p-0"
                style={{
                  backgroundColor: themeProperties.backgroundColor,
                  color: themeProperties.textColorAlt,
                }}
              >
                <div
                  className="text-center p-4 text-2xl font-normal flex items-center justify-center"
                  style={{
                    color: themeProperties.textColorAlt,
                    background: themeProperties.boxBackgroundTop,
                  }}
                >
                  <div className="text-center flex items-center justify-center absolute left-4">
                    <div
                      className="flex p-4 gap-2 text-sm w-fit rounded-md justify-center items-center"
                      style={{
                        color: themeProperties.textColorAlt,
                      }}
                    >
                      <FaCalendarAlt />
                      {circular.date}
                    </div>
                  </div>
                  {circular.subject}
                </div>

                <div
                  className="p-6 space-y-4"
                  style={{ color: themeProperties.textColor }}
                >
                  <p
                    dangerouslySetInnerHTML={{
                      __html: circular.message,
                    }}
                    className="prose text-sm m-0 p-0"
                    style={{ color: themeProperties.textColor }}
                  />
                </div>
              </DialogContent>
            </Dialog>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CircularsList;
