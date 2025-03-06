import React from "react";
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
import { useSelector } from "react-redux";
import { selectThemeProperties } from "@/slices/theme";

const SelectClass = ({ formValues, setFormValues }) => {
     const themeProperties = useSelector(selectThemeProperties);
  const { classes } = useSelector((state) => state.manageClasses);
  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = React.useState();

  React.useEffect(() => {
    console.log("Classes data:", classes);
  }, [classes]);

  const sortClassCodes = (a, b) => {
    const regex = /^(\d+)([A-Za-z]*)$/;
    const aMatch = a.class_code.match(regex);
    const bMatch = b.class_code.match(regex);

    if (aMatch && bMatch) {
      const aNum = parseInt(aMatch[1], 10);
      const bNum = parseInt(bMatch[1], 10);

      if (aNum !== bNum) {
        return aNum - bNum;
      }

      return aMatch[2].localeCompare(bMatch[2]);
    }

    return a.class_code.localeCompare(b.class_code);
  };

  const filteredClasses = search ? classes?.data?.slice().sort(sortClassCodes).filter((classItem) =>
      classItem.class_code.toLowerCase().includes(search.toLowerCase())
    ) : classes?.data?.slice().sort(sortClassCodes);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          aria-expanded={open}
          className="w-[190px] justify-between opacity-100 bg-opacity-100 border-2 border-solid rounded-[8px] p-2"
          style={{
            color: themeProperties?.textColor,
            background: themeProperties?.inputBackground,
          }}
        >
          {formValues.class_id
            ? classes?.data?.find((c) => c.id === formValues.class_id)
                ?.class_code
            : "Select Class..."}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-[200px] p-0"
        style={{ backgroundColor: themeProperties?.inputBackground }}
      >
        <Command>
          <CommandInput
            placeholder="Search ..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              console.log("Search input:", e.target.value);
            }}
          />
          <CommandList>
            <CommandEmpty>No classes found.</CommandEmpty>
            <CommandGroup>
              {filteredClasses?.map((classItem) => (
                <CommandItem
                  key={classItem.class_code}
                  value={classItem.class_code}
                  onSelect={(currentValue) => {
                    const selectedClass = classes?.data?.find(
                      (c) => c.class_code === currentValue
                    );
                    setFormValues({
                      ...formValues,
                      class_id: selectedClass?.id,
                    });
                    setOpen(false);
                  }}
                >
                  {classItem.class_code}
                  <Check
                    className={cn(
                      "ml-auto",
                      formValues.class_id === classItem.id
                        ? "opacity-100"
                        : "opacity-0"
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

export default SelectClass;