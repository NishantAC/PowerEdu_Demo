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
          className="flex items-center gap-2 px-4 py-2 border rounded-full text-sm font-medium transition hover:bg-gray-100"
          style={{
            background: themes[currentTheme].normal1,
            color: themes[currentTheme].textColorAlt,
          }}
        >
          <SunIcon size={18} />
          Select Theme
        </DrawerTrigger>

        <DrawerContent
          className="min-h-[70vh] min-w-[50vw] p-6 rounded-lg shadow-lg"
          style={{
            background: themes[currentTheme].secondaryColor,
            color: themes[currentTheme].textColor,
          }}
        >
          <DrawerHeader className="mb-4 text-center">
            <h2 className="text-xl font-semibold">Select a Theme</h2>
            <p className="text-sm text-gray-500">
              Customize your application's look and feel.
            </p>
          </DrawerHeader>

          <div className="grid grid-cols-3 gap-4 mt-6">
            {Object.keys(themes).map((themeKey) => (
              <div
                key={themeKey}
                className={`p-4 rounded-lg shadow-sm transition hover:shadow-md ${
                  themeKey === currentTheme
                    ? "border-2"
                    : "border border-transparent"
                }`}
                onClick={() => handleThemeChange(themeKey)}
                style={{
                  background: themes[themeKey].background,
                  color : themes[themeKey].textColorAlt
                }}
              >
                <button
                  className="flex flex-col items-center w-full h-full"
                >
                  <div
                    className="w-10 h-10 rounded-full mb-2"
                    style={{
                      backgroundColor: themes[themeKey].background,
                    }}
                  />
                  <span
                    className="text-sm font-medium"
                    style={{
                      color: themes[themeKey].textColor,
                    }}
                  >
                    {themeKey}
                  </span>
                </button>
              </div>
            ))}
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default SelectTheme;
 