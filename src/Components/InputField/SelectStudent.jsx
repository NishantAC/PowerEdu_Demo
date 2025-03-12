import React, { useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { selectThemeProperties } from "@/slices/theme";
import { useSelector } from "react-redux";

const SelectStudent = ({ formValues, setFormValues, array, formfield }) => {
  const themeProperties = useSelector(selectThemeProperties);
  const [open, setOpen] =useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          aria-expanded={open}
          className="w-[190px] justify-between opacity-100 bg-opacity-100 border-2 border-solid rounded-[8px] p-2"
          style={{
            color: themeProperties?.textColor,
            backgroundColor: themeProperties?.inputBackground,
          }}
        >
          {formValues[formfield] ? formValues[formfield] : `Select ${formfield}...`}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-[200px] p-0"
        style={{ backgroundColor: themeProperties?.inputBackground }}
      >
        <Command>
          <CommandInput placeholder="Search ..." />
          <CommandList>
            <CommandEmpty>No {formfield} found.</CommandEmpty>
            <CommandGroup>
              {array?.map((value, index) => (
                <CommandItem
                  key={index}
                  value={value}
                  onSelect={(currentValue) => {
                    const selectedValue = currentValue === formValues[formfield] ? "" : currentValue;
                    setFormValues({ ...formValues, [formfield]: selectedValue });
                    setOpen(false);
                  }}
                >
                  {value}
                  <Check
                    className={cn(
                      "ml-auto",
                      formValues[formfield] === value ? "opacity-100" : "opacity-0"
                    )}
                    style={{ color: themeProperties?.normal3 }}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default SelectStudent;