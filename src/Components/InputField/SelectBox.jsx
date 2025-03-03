import React from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { selectThemeProperties } from "@/slices/theme";
import { useSelector } from "react-redux";

function SelectBox({ options, info, setInfo, placeHolder }) {
  const themeProperties = useSelector(selectThemeProperties);

  return (
    <Select
      value={info}
      onValueChange={(selectedValue) => setInfo(selectedValue)}
    >
      <SelectTrigger
        className="w-48 relative z-[50]" // Ensure it's on top
        style={{
          textAlign: "left",
          background: themeProperties?.inputBackground,
          color: themeProperties?.inputTextColor,
        }}
      >
        <SelectValue placeholder={placeHolder} className="capitalize">
          {info || placeHolder}
        </SelectValue>
      </SelectTrigger>
      <SelectContent
        className="capitalize z-[1000] pointer-events-auto absolute top-full mt-1 bg-white shadow-lg rounded-md"
        style={{ position: "absolute" }} // Ensures dropdown renders above
      >
        {options.map((option, index) => (
          <SelectItem key={index} value={option} className="hover:bg-gray-200">
            {option}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export default SelectBox;
