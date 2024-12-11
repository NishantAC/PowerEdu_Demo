import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTheme } from "@/slices/theme";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import { SunIcon } from "lucide-react";

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
          className=" p-2 rounded-full flex items-center justify-center"
          style={{
            background: themes[currentTheme].primaryColor,  
          }}
        >
          <SunIcon size={20} className="text-white" />
        </DrawerTrigger>
        <DrawerContent
          className="min-h-[80vh] min-w-[60vw] rounded-lg p-6 "
          style={{
            background: themes[currentTheme].secondaryColor,
          }}
        >
          <DrawerHeader className="text-center mb-6">
            <DrawerTitle className="text-4xl font-bold mb-2 text-gray-800">
              Customize Your Theme
            </DrawerTitle>
            <DrawerDescription className="text-lg text-gray-600">
              Choose a theme to personalize your application's look and feel.
            </DrawerDescription>
          </DrawerHeader>

          <div className="mt-6">
            <div className="grid grid-cols-5 gap-8">
              {Object.keys(themes).map((themeKey) => (  
                <div
                  key={themeKey}
                  className={`p-4 rounded-lg shadow-md transition-transform transform hover:scale-105 border-2 ${
                    themeKey === currentTheme
                      ? `border-${themes[themeKey].primaryColor}`
                      : "border-transparent"
                  } group relative`}
                  style={{
                    background: themes[themeKey].secondaryColor,
                    opacity: themeKey === selectedTheme ? 1 : 0.5,
                  }}
                >
                  <button
                    onClick={() => handleThemeChange(themeKey)}
                    className="w-full h-full flex flex-col items-center justify-center"
                  >
                    <span
                      className="block w-8 h-8 rounded-full border-2"
                      style={{
                        backgroundColor: themes[themeKey].primaryColor,
                        borderColor: themes[themeKey].textColor,
                      }}
                    />
                    <p className="mt-2 text-white font-medium">{themeKey}</p>
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-700">
              Selected Theme Details
            </h2>
            <div className="grid grid-cols-5 gap-6">
              {Object.entries(themes[selectedTheme]).map(([key, value]) => (
                <div key={key} className="flex items-center">
                  <span className="font-medium text-gray-800 capitalize">{key}:</span>
                  <div
                    className="ml-4 w-10 h-10 rounded-md"
                    style={{
                      background: value,
                      border: `2px solid ${themes[selectedTheme].textColor}`,
                    }}
                  />
                </div>
              ))}
            </div>
          </div>

          <DrawerFooter className="flex justify-end mt-8">
            <DrawerClose>
              <button className="px-6 py-3 text-lg font-semibold rounded-lg shadow-md bg-gray-800 text-white hover:bg-gray-700 transition-all">
                Close
              </button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default SelectTheme;