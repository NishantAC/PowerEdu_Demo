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

function SelectBox({ options, info, setInfo, placeHolder, value }) {
  const themeProperties = useSelector(selectThemeProperties);
  return (
    <Select
      value={info}
      onValueChange={(selectedValue) => setInfo(selectedValue)}
    >
      <SelectTrigger className="w-48" style={{ textAlign: "left" }}>
        <SelectValue placeholder={placeHolder}
          style={{
            color: themeProperties?.inputTextColor,
            background: themeProperties?.inputBackground,
          }}
        className={` capitalize`}>
          {info || placeHolder}
        </SelectValue>
      </SelectTrigger>
      <SelectContent className=" capitalize">
        {options.map((option, index) => (
          <SelectItem key={index} value={option}>
            {option}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export default SelectBox;
