import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { FaCalendarAlt } from "react-icons/fa";
import { Calendarmini } from "@/Components/ui/calendarmini";
import { selectThemeProperties } from "@/slices/theme";
import {
  getCirculars,
  updateCircular,
  deleteCircular,
  resetStatus,
} from "@/slices/circular";
import Loader from "@/Components/Loader/Loader";
import AddButton from "@/Components/Buttons/AddButton";

function CircularsList() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const circulars = useSelector(
    (state) => state.circularManagementSlice.circulars
  );
  const status = useSelector((state) => state.circularManagementSlice.status);

  const { googleEvents } = useSelector((state) => state.calendarSlice);
  const themeProperties = useSelector(selectThemeProperties);

  const formattedCirculars = circulars.map((circular) => ({
    id: circular.id,
    subject: circular.title,
    date: moment(circular.issued_date).format("DD-MM-YYYY"),
    message: circular.message,
  }));

  return (
    <div
      className="w-full lg:w-2/5 flex flex-col rounded-2xl overflow-y-scroll relative max-lg:min-h-fit max-lg:flex-row "
      style={{
        color: themeProperties.textColorAlt,
        background: themeProperties?.boxBackgroundSolid,
      }}
    >
      <div className="">
        <Calendarmini
          googleEvents={googleEvents}
          circular={formattedCirculars}
          className=" scale-90 shadow-md rounded-lg"
        />
      </div>
      <div className="px-2 rounded-lg flex-1 innerBlur">
        <div
          className="text-center font-normal sticky top-0 z-50 py-2"
          style={{
            color: themeProperties.textColor,
            background: themeProperties.boxBackgroundSolid,
          }}
        >
          Circulars
        </div>
        <div className="mx-1 relative">
          <div className="flex flex-col overflow-y-scroll h-full max-lg:h-72 gap-2 relative pt-2 pb-2 rounded-2xl">
            <style>
              {`
              .custom-scrollbar::-webkit-scrollbar-thumb {
                background-color: ${themeProperties.scrollColor};
              }
              .innerBlur::after {
                content: '';
                position: sticky;
                left: 0;
                right: 0;
                height: 40px;
                pointer-events: none;
                z-index: 1;
                display: block;
              }
              .innerBlur::before {
                content: '';
                position: absolute;
                left: 0;
                right: 0;
                height: 20px;
                pointer-events: none;
                z-index: 1;
              }
              .innerBlur::before {
                top: 0;
                background: linear-gradient(to bottom, ${themeProperties.boxBackgroundSolid} 0%, rgba(255, 255, 255, 0) 100%);
              }
              .innerBlur::after {
                bottom: 0;
                background: linear-gradient(to top, ${themeProperties.boxBackgroundSolid} 0%, rgba(255, 255, 255, 0) 100%);
              }
              `}
            </style>

            {status === "loading" && circulars.length === 0 && (
              <div className="text-center text-sm text-gray-500 mt-4">
                <Loader name="Circulars" />
              </div>
            )}

            {circulars.length > 0 &&
              formattedCirculars?.map((circular, index) => (
                <Dialog key={index} className="">
                  <DialogTrigger asChild>
                    <div
                      className="flex justify-between py-3 rounded-lg px-3 cursor-pointer transition circularButton border-2 text-sm"
                      style={{
                        "--hover-bg": themeProperties.boxHoverColor,
                        "--hover-text": themeProperties.boxHoverTextColor,
                        color: themeProperties.textColor,
                        borderColor: themeProperties.borderColor,
                      }}
                    >
                      <style>
                        {`
                        .circularButton {
                          background: ${themeProperties.lightColor};
                        }
                        .circularButton:hover {
                          background: var(--hover-bg);
                          color: var(--hover-text);
                        }
                      `}
                      </style>
                      <span className="w-2/3 truncate">
                        {circular?.subject}
                      </span>
                      <span className="w-1/3 text-right">{circular?.date}</span>
                    </div>
                  </DialogTrigger>
                  <DialogContent
                    className="overflow-hidden rounded-xl shadow-lg p-0"
                    style={{
                      backgroundColor: themeProperties.boxBackgroundSolid,
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
                          {circular?.date}
                        </div>
                      </div>
                      {circular?.subject}
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
        <div className=" absolute bottom-0 w-full flex justify-center pb-4">
          <AddButton name="Add Circular" onClick={() => {}} width={130} />
        </div>
      </div>
    </div>
  );
}

export default CircularsList;
