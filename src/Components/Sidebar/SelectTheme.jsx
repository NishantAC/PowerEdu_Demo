import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTheme } from "@/slices/theme";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

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
      <Dialog>
        <DialogTrigger
          className="w-8 h-8 rounded-full border-2 shadow-md transition-all transform hover:scale-105 flex items-center justify-center "
          style={{
            background: themes[currentTheme].secondaryColor,
          }}
        >
          <SunIcon size={24} />

        </DialogTrigger>
        <DialogContent className={`min-h-[80vh] min-w-[60vw] outline-none shadow-xl rounded-lg p-6 `}
        style={{
          background:themes[currentTheme].primaryColor,
          
        }}
        >
          <DialogHeader className="flex flex-col items-center mb-6 backdrop-blur-lg ">
            <DialogTitle className="text-3xl font-semibold mb-4 text-center text-primary">
              Choose a theme to customize the appearance of your application.
            </DialogTitle>
          </DialogHeader>
          <div className="flex flex-wrap justify-center gap-10 ">
            {Object.keys(themes).map((themeKey) => (
              <div key={themeKey} className="flex flex-col items-center">
                <button
                  onClick={() => handleThemeChange(themeKey)}
                  className={`w-8 h-8 rounded-full border-4 shadow-md transition-all transform hover:scale-110 focus:outline-none ${
                    themeKey === currentTheme
                      ? `border-${themes[themeKey].primaryColor} ring-4 ring-${themes[themeKey].primaryColor}`
                      : "border-transparent"
                  }`}
                  style={{
                    backgroundColor: themes[themeKey].primaryColor,
                    color: themes[themeKey].textColor,
                  }}
                >
                  {/* You can add mini color previews or icons here */}
                </button>
                <p className="mt-2 text-sm font-medium text-gray-700">{themeKey}</p>
              </div>
            ))}
          </div>
          <div className="mt-6">
            <h2 className="text-2xl font-semibold mb-4">Selected Theme Details</h2>
            <div className="grid grid-cols-2 gap-4">
              {Object.entries(themes[selectedTheme]).map(([key, value]) => (
                <div key={key} className="flex items-center">
                  <span className="font-medium text-gray-700">{key}:</span>
                  <div className="ml-2 min-w-20 min-h-10 border-2" style={{ background: value, 

                    borderColor: themes[selectedTheme].textColor,
                  }}>
                    
                  </div>
                </div>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SelectTheme;