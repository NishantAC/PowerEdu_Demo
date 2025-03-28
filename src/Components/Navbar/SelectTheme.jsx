import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTheme } from "@/slices/theme";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTrigger,
} from "@/Components/ui/drawer";
import { SunIcon } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/Components/ui/select";
import { Skeleton } from "@/Components/ui/skeleton";

const SelectTheme = () => {
  const dispatch = useDispatch();
  const themes = useSelector((state) => state.theme.themes); // Retrieve themes from Redux
  const currentTheme = useSelector((state) => state.theme.theme); // Retrieve the current theme
  const [selectedTheme, setSelectedTheme] = useState(currentTheme);

  const handleThemeChange = (theme) => {
    dispatch(setTheme(theme)); // Update theme in Redux
    setSelectedTheme(theme); // Update selected theme state
  };

  return (
    <div className="p-4">
      <Drawer>
        <DrawerTrigger
          className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition"
          style={{
            background: themes[currentTheme].buttonColor,
            color: themes[currentTheme].textColorAlt,
          }}
        >
          <SunIcon size={18} />
          Select Theme
        </DrawerTrigger>

        <DrawerContent
          className=" w-full p-6 flex "
          style={{
            background: themes[currentTheme].backgroundSolid,
            color: themes[currentTheme].textColor,
          }}
        >
          <div className=" flex justify-around w-full items-center h-full mt-4">
            <div className="flex flex-col justify-center items-center pl-4 ">
              <div>
                <h1 className="text-xl font-work-sans text-center mb-4">
                  Select a Theme
                </h1>
                <h2 className="text-sm font-work-sans text-center mb-4">
                  Customize your experience with different themes.
                </h2>
              </div>
              <Select onValueChange={handleThemeChange} value={selectedTheme}>
                <SelectTrigger className="w-60 bg-transparent font-work-sans">
                  <SelectValue placeholder="Select a theme" className="  " />
                </SelectTrigger>
                <SelectContent
                  style={{
                    background: themes[currentTheme].background.boxBackgroundSolid,
                    borderColor: themes[currentTheme].borderColor,
                  }}
                >
                  <SelectGroup className="">
                    {Object.keys(themes).map((themeKey) => (
                      <SelectItem
                        key={themeKey}
                        value={themeKey}
                        className="w-full cursor-pointer themeSelectorHover "
                        style={{ "--hover-bg": themes[themeKey].normal1 }}
                      >
                        <style>
                          {`
                            .themeSelectorHover {
                            color: ${themes[themeKey].textColor};
                          }

                            .themeSelectorHover:hover {
                              background: var(--hover-bg);
                              color: ${themes[themeKey].textColorAlt};
                            }
                          `}
                        </style>

                        <div className="flex items-center justify-between w-full gap-10 ">
                          <p>{themeKey}</p>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div className=" flex-1 justify-center flex">
              <div
                className="shadow-lg w-1/2 h-80 rounded-[20px] border-2 flex p-2"
                style={{
                  background: themes[selectedTheme].background,
                  color: themes[selectedTheme].textColorAlt,
                  borderColor: themes[selectedTheme].borderColor,
                }}
              >
                <div className="text-[12px] font-work-sans text-center mt-4 w-1/5 flex flex-col items-center gap-4 ">
                  <div className="flex flex-col items-center gap-2">
                    <img
                      className="w-8 bg-white rounded-full p-1"
                      src="https://i.ibb.co/pn6BWTM/aquariacore.png"
                      alt="logo"
                    />
                    <h1 className=" border-b-2">PowerEdu</h1>
                  </div>
                  <h2>Theme </h2>
                </div>

                <div
                  className=" flex-1 rounded-[15px] dummyBox flex items-center justify-evenly p-2 gap-10 "
                  style={{
                    background: themes[selectedTheme].backgroundRight,
                    color: themes[selectedTheme].textColorAlt,
                  }}
                >
                  <div className="flex flex-col items-center gap-4">
                    <Skeleton
                      className="h-[60px] w-[120px]"
                      style={{
                        background: themes[selectedTheme].boxBackground,
                      }}
                    />
                    <Skeleton
                      className="h-[140px] w-[120px]"
                      style={{
                        background: themes[selectedTheme].boxBackground,
                      }}
                    />
                  </div>

                  <div className="flex flex-col items-center gap-4">
                    <Skeleton
                      className="h-[60px] w-[220px]"
                      style={{
                        background: themes[selectedTheme].boxBackground,
                      }}
                    />
                    <Skeleton
                      className="h-[140px] w-[220px]"
                      style={{
                        background: themes[selectedTheme].boxBackground,
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default SelectTheme;
