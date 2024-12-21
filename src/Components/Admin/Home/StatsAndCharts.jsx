import React, { useState } from "react";
import StatsBox from "./StatsBox";
import { PieChart } from "@mui/x-charts/PieChart";
import CalendarBox from "./CalendarBox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ImStatsDots } from "react-icons/im";
import { FaCalendarAlt } from "react-icons/fa";

const StatsAndCharts = ({
  totalStudents,
  totalTeachers,
  totalStaff,
  chartData,
  deviceSize,
  monthArray,
  yearArray,
  month,
  setMonth,
  year,
  setYear,
  initialDate,
  themeProperties,
}) => {
  const [modalContent, setModalContent] = useState("");

  const handleOpenModal = (content) => {
    setModalContent(content);
  };

  console.log("chartData:", chartData); // Debugging chartData

  return (
    <div className="flex items-center justify-center ">
      {/* Buttons */}
      <div className="flex gap-4 items-center justify-center w-full max-w-4xl">
        <Dialog>
          <DialogTrigger asChild>
            <button
              onClick={() => handleOpenModal("stats")}
              className="flex items-center gap-2 text-nowrap px-4 py-3 rounded-[10px] w-full md:w-auto"
              style={{
                background: themeProperties.boxBackground,
                color: themeProperties.textColor,
                boxShadow: "0 0 10px rgba(0,0,0,0.2)",
              }}
            >
              <ImStatsDots className="inline-block mr-2" />
              Show Stats
            </button>
          </DialogTrigger>
          <DialogContent style={{ background: themeProperties.secondaryColor }}>
            <DialogHeader>
              <DialogTitle
                className="w-full text-center font-sans text-[20px]"
                style={{ color: themeProperties.textColor }}
              >
                Statistics and Student Ratio
              </DialogTitle>
            </DialogHeader>
            <DialogDescription>
              {modalContent === "stats" && (
                <>
                  <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    <StatsBox text="Total Students" value={totalStudents} />
                    <StatsBox text="Total Teachers" value={totalTeachers} />
                    <StatsBox text="Total Staff" value={totalStaff} />
                    <StatsBox text="Upcoming Event" value="Diwali 13-08-2021" />
                  </div>
                  <div className="flex flex-col rounded-lg shadow-md mt-5">
                    <div className="w-full h-14 bg-gray-100 rounded-t-lg flex items-center font-poppins text-lg font-semibold pl-5">
                      Students's Ratio
                    </div>
                    <div
                      className="bg-white relative rounded-b-lg"
                      style={{ height: "300px" }}
                    >
                      <PieChart
                        series={[
                          {
                            data: chartData.map((item) => ({
                              id: item.id,
                              value: item.value,
                              label: item.label,
                              color: item.color,
                            })),
                            innerRadius: 60,
                            outerRadius: 100,
                            paddingAngle: 0,
                            cornerRadius: 0,
                            startAngle: 0,
                            endAngle: 360,
                            cx: 150,
                            cy: 150,
                          },
                        ]}
                      />
                      <div className="absolute top-2.5 right-2.5"></div>
                    </div>
                  </div>
                </>
              )}
            </DialogDescription>
          </DialogContent>
        </Dialog>

        <Dialog>
          <DialogTrigger asChild>
            <button
              onClick={() => handleOpenModal("calendar")}
              className="flex items-center gap-2 text-nowrap px-4 py-3 rounded-[10px] w-full md:w-auto"
              style={{
                background: themeProperties.boxBackground,
                color: themeProperties.textColor,
                boxShadow: "0 0 10px rgba(0,0,0,0.2)",
              }}
            >
              <FaCalendarAlt className="inline-block mr-2" />
              Event Calendar
            </button>
          </DialogTrigger>
          <DialogContent style={{ background: themeProperties.secondaryColor }}>
            <DialogHeader>
              <DialogTitle
                style={{ color: themeProperties.textColor }}
                className="w-full text-center font-sans text-[20px]"
              >
                Event Calendar
              </DialogTitle>
            </DialogHeader>
            <DialogDescription>
              {modalContent === "calendar" && (
                <div className="flex flex-col bg-white overflow-hidden rounded-[12px]">
                  <div className="relative">
                    <CalendarBox
                      date={initialDate}
                      themeProperties={themeProperties}
                    />
                  </div>
                </div>
              )}
            </DialogDescription>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default StatsAndCharts;