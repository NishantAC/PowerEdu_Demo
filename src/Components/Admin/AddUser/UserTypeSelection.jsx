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

  const userTypes = [
    "Student",
    "Teacher",
    "Principal",
    "Accountant",
    "Staff",
  ];

  const UserTypeSelection = ({ userType, setUserType, themeProperties }) => {
    const [open, setOpen] = React.useState(false);

    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            aria-expanded={open}
            className="w-[190px] justify-between opacity-100 bg-opacity-100 border-2  border-solid rounded-[8px] p-2 "
            style = {{ color: themeProperties?.textColor, 
              backgroundColor: themeProperties?.inputBackground,
              
            }}
          >
            {userType ? userType : "Select user type..."}
            <ChevronsUpDown className="opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0"
        style = {{ backgroundColor: themeProperties?.inputBackground}}
        >
          <Command className =''>
            <CommandInput className='' placeholder="Search user type..." />
            <CommandList>
              <CommandEmpty>No user type found.</CommandEmpty>
              <CommandGroup>
                {userTypes.map((type) => (
                  <CommandItem
                    key={type}
                    value={type}
                    onSelect={(currentValue) => {
                      setUserType(currentValue === userType ? "" : currentValue);
                      setOpen(false);
                    }}
                  >
                    {type}
                    <Check
                      className={cn(
                        "ml-auto",
                        userType === type ? "opacity-100" : "opacity-0"
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

  export default UserTypeSelection;