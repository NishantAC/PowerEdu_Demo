import React, { useState } from "react";
import InputField from "@/Components/InputField/InputField";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import SelectionBox from "./SelectionBox";

const genderOptions = ["Male", "Female", "Others"];

const UserDetailsForm = ({
  formValues,
  setFormValues,
  handleChange,
  admissionNoPlaceholder,
  classesDropdown,
  userType,
  errorMsg,
  handleSubmit,
  themeProperties,
}) => {

  const handleDateChange = (name, selectedDate) => {
    if (selectedDate) {
      const localDate = new Date(selectedDate.getTime() - selectedDate.getTimezoneOffset() * 60000);
      const formattedDate = localDate.toISOString().split("T")[0];
      handleChange({
        target: {
          name,
          value: formattedDate,
        },
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 h-full w-full rounded-[17px] relative"
      style={{
        background: themeProperties.boxBackground,
      }}
    >
      <div
        className="flex flex-col gap-5 h-full w-full "
        style={{
          color: themeProperties?.textColor,
        }}
      >
        {!userType && (
          <div className="flex items-center justify-center text-[20px] font-normal">
            Select The User Type To Get Started
          </div>
        )}

        {userType && (
          <>
            <div className=" flex justify-around ">
              <div className=" border-2 py-2 px-6 rounded-lg">
                <div className=" flex gap-4 items-center">
                  <div>Rekor Id:</div>
                  <div className="text-nowrap p-">{formValues.rekorId}</div>
                </div>
              </div>
              <div className=" flex items-center border-2 px-4 gap-4 rounded-lg">
                <div className="text-nowrap ">
                  {formValues.userType === "Student"
                    ? "Admission No"
                    : "Employee Id"}
                </div>
                <input
                  name="admissionNo"
                  value={formValues.admissionNo}
                  onChange={handleChange}
                  placeholder={admissionNoPlaceholder}
                  className="w-fit p-2 bg-white text-black rounded outline-none"
                  required
                />
              </div>
            </div>
            <div className="flex justify-start gap-10 items-center mt-4">
              <InputField
                value={formValues.firstName}
                htmlFor="firstName"
                placeholder="First Name"
                name="firstName"
                handleChange={handleChange}
                themeProperties={themeProperties}
                required={true}
              />
              <InputField
                value={formValues.middleName}
                htmlFor="middleName"
                placeholder="Middle Name (optional)"
                name="middleName"
                handleChange={handleChange}
                themeProperties={themeProperties}
                required={false}
              />
              <InputField
                value={formValues.lastName}
                htmlFor="lastName"
                placeholder="Last Name"
                name="lastName"
                handleChange={handleChange}
                themeProperties={themeProperties}
                required={true}
              />
              {(userType === "Student" || userType === "Teacher") && (
                <div className=" flex items-center gap-4">
                  <SelectionBox
                    formValues={formValues}
                    setFormValues={setFormValues}
                    themeProperties={themeProperties}
                    array={genderOptions}
                    formfield="gender"
                  />
                </div>
              )}
            </div>

            <div className=" flex justify-start gap-10 items-center mt-4">
              {formValues.userType === "Student" ? (
                <>
                  <div className="flex items-center">
                    <SelectionBox
                      formValues={formValues}
                      setFormValues={setFormValues}
                      themeProperties={themeProperties}
                      array={classesDropdown}
                      formfield="class"
                    />
                  </div>
                  <InputField
                    value={formValues.rollNo}
                    htmlFor="rollNo"
                    placeholder="Roll No"
                    name="rollNo"
                    type="number"
                    handleChange={handleChange}
                    themeProperties={themeProperties}
                    required={true}
                  />
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "justify-start text-center w-48 font-normal text-black",
                          !formValues.admissionDate && "text-muted-foreground"
                        )}
                        style={{
                          background: themeProperties?.inputBackground,
                          color: themeProperties?.inputTextColor,
                        }}
                      >
                        <CalendarIcon className="h-4 w-4" />
                        {formValues.admissionDate ? (
                          format(new Date(formValues.admissionDate), "PPP")
                        ) : (
                          <span>Admission Date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={
                          formValues.admissionDate
                            ? new Date(formValues.admissionDate)
                            : undefined
                        }
                        onSelect={(selectedDate) => handleDateChange("admissionDate", selectedDate)}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>

                  <InputField
                    value={formValues.email}
                    htmlFor="email"
                    placeholder="Email"
                    name="email"
                    type="email"
                    handleChange={handleChange}
                    themeProperties={themeProperties}
                    required={true}
                  />
                </>
              ) : formValues.userType === "Teacher" ? (
                <>
                  <div className=" flex items-center gap-4">
                    <SelectionBox
                      formValues={formValues}
                      setFormValues={setFormValues}
                      themeProperties={themeProperties}
                      array={["Teacher", "Class Teacher"]}
                      formfield="role"
                    />
                  </div>

                  {formValues.role === "Class Teacher" && (
                    <div className="flex items-center">
                      <SelectionBox
                        formValues={formValues}
                        setFormValues={setFormValues}
                        themeProperties={themeProperties}
                        array={classesDropdown}
                        formfield="class"
                      />
                    </div>
                  )}

                  <div className="flex items-center">
                    <SelectionBox
                      formValues={formValues}
                      setFormValues={setFormValues}
                      themeProperties={themeProperties}
                      array={["Science", "English", "Hindi", "Mathematics"]}
                      formfield="subject"
                    />
                  </div>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "justify-start text-center w-48 font-normal text-black",
                          !formValues.admissionDate && "text-muted-foreground"
                        )}
                        style={{
                          background: themeProperties?.inputBackground,
                          color: themeProperties?.inputTextColor,
                        }}
                      >
                        <CalendarIcon className="h-4 w-4" />
                        {formValues.admissionDate ? (
                          format(new Date(formValues.admissionDate), "PPP")
                        ) : (
                          <span>Admission Date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={
                          formValues.admissionDate
                            ? new Date(formValues.admissionDate)
                            : undefined
                        }
                        onSelect={(selectedDate) => handleDateChange("admissionDate", selectedDate)}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </>
              ) : (
                <>
                  {userType === "Staff" && (
                    <div className="flex items-center">
                      <SelectionBox
                        formValues={formValues}
                        setFormValues={setFormValues}
                        themeProperties={themeProperties}
                        array={["Driver", "Janitor"]}
                        formfield="role"
                      />
                    </div>
                  )}

                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "justify-start text-center w-48 font-normal text-black",
                          !formValues.admissionDate && "text-muted-foreground"
                        )}
                        style={{
                          background: themeProperties?.inputBackground,
                          color: themeProperties?.inputTextColor,
                        }}
                      >
                        <CalendarIcon className="h-4 w-4" />
                        {formValues.admissionDate ? (
                          format(new Date(formValues.admissionDate), "PPP")
                        ) : (
                          <span>Admission Date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={
                          formValues.admissionDate
                            ? new Date(formValues.admissionDate)
                            : undefined
                        }
                        onSelect={(selectedDate) => handleDateChange("admissionDate", selectedDate)}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <InputField
                    value={formValues.email}
                    htmlFor="email"
                    placeholder="Email"
                    name="email"
                    type="email"
                    handleChange={handleChange}
                    themeProperties={themeProperties}
                    required={true}
                  />

                  <div className="gender">
                    <SelectionBox
                      formValues={formValues}
                      setFormValues={setFormValues}
                      themeProperties={themeProperties}
                      array={genderOptions}
                      formfield="gender"
                    />
                  </div>
                </>
              )}
            </div>

            <div className="flex justify-start gap-10 items-center mt-4">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "justify-start text-center w-48 font-normal text-black",
                      !formValues.dob && "text-muted-foreground"
                    )}
                    style={{
                      background: themeProperties?.inputBackground,
                      color: themeProperties?.inputTextColor,
                    }}
                  >
                    <CalendarIcon className="h-4 w-4" />
                    {formValues.dob ? (
                      format(new Date(formValues.dob), "PPP")
                    ) : (
                      <span>Date Of Birth</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={
                      formValues.dob ? new Date(formValues.dob) : undefined
                    }
                    onSelect={(selectedDate) => handleDateChange("dob", selectedDate)}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>

              {userType === "Student" ? (
                <>
                  <InputField
                    value={formValues.fatherName}
                    htmlFor="fatherName"
                    placeholder="Father Name"
                    name="fatherName"
                    type="text"
                    handleChange={handleChange}
                    themeProperties={themeProperties}
                    required={true}
                  />

                  <InputField
                    value={formValues.motherName}
                    htmlFor="motherName"
                    placeholder="Mother Name"
                    name="motherName"
                    type="text"
                    handleChange={handleChange}
                    themeProperties={themeProperties}
                    required={true}
                  />

                  <InputField
                    value={formValues.guardianName}
                    htmlFor="guardianName"
                    placeholder="Guardian Name (optional)"
                    name="guardianName"
                    type="text"
                    handleChange={handleChange}
                    themeProperties={themeProperties}
                    required={false}
                  />
                </>
              ) : (
                <>
                  <InputField
                    value={formValues.primaryContactNumber}
                    htmlFor="primaryContactNumber"
                    placeholder="Contact No. (primary)"
                    name="primaryContactNumber"
                    type="tel"
                    pattern="[0-9]{10}"
                    title="Contact must have 10 digits number"
                    handleChange={handleChange}
                    themeProperties={themeProperties}
                    required={true}
                  />

                  <InputField
                    value={formValues.secondaryContactNumber}
                    htmlFor="secondaryContactNumber"
                    placeholder="Contact No. (secondary)"
                    name="secondaryContactNumber"
                    type="tel"
                    pattern="[0-9]{10}"
                    title="Contact must have 10 digits number"
                    handleChange={handleChange}
                    themeProperties={themeProperties}
                    required={true}
                  />

                  {userType === "Teacher" && (
                    <InputField
                      value={formValues.email}
                      htmlFor="email"
                      placeholder="Email"
                      name="email"
                      type="email"
                      handleChange={handleChange}
                      themeProperties={themeProperties}
                      required={true}
                    />
                  )}
                </>
              )}
            </div>

            {userType === "Student" && (
              <div className="flex justify-start gap-10 items-center mt-4">
                <InputField
                  value={formValues.fatherContactNo}
                  htmlFor="fatherContactNo"
                  placeholder="Father Contact No."
                  name="fatherContactNo"
                  type="tel"
                  pattern="[0-9]{10}"
                  title="Contact must have 10 digits number"
                  handleChange={handleChange}
                  themeProperties={themeProperties}
                  required={true}
                />

                <InputField
                  value={formValues.motherContactNo}
                  htmlFor="motherContactNo"
                  placeholder="Mother Contact No."
                  name="motherContactNo"
                  type="tel"
                  pattern="[0-9]{10}"
                  title="Contact must have 10 digits number"
                  handleChange={handleChange}
                  themeProperties={themeProperties}
                  required={true}
                />

                <InputField
                  value={formValues.guardianContactNo}
                  htmlFor="guardianContactNo"
                  placeholder="Guardian Contact No."
                  name="guardianContactNo"
                  type="tel"
                  pattern="[0-9]{10}"
                  title="Contact must have 10 digits number"
                  handleChange={handleChange}
                  themeProperties={themeProperties}
                  required={false}
                />
              </div>
            )}

            <div className=" mt-4 flex w-full justify-between">
              <InputField
                value={formValues.addressLine1}
                htmlFor="addressLine1"
                placeholder="Address Line 1"
                name="addressLine1"
                type="text"
                handleChange={handleChange}
                themeProperties={themeProperties}
                required
                address={true}
              />

              <InputField
                value={formValues.addressLine2}
                htmlFor="addressLine2"
                placeholder="Address Line 2"
                name="addressLine2"
                type="text"
                handleChange={handleChange}
                themeProperties={themeProperties}
                required
                address={true}
              />
            </div>

            <div className="flex gap-5 absolute bottom-6 right-6 text-lg">
              <Button
                className=" px-14 w-fit py-3 rounded"
                type="submit"
                disabled={!formValues.userType}
                style={{
                  display: !formValues.userType ? "none" : "block",
                  background: themeProperties?.buttonColor,
                  color: themeProperties?.textColorAlt,
                }}
              >
                Upload
              </Button>
            </div>
          </>
        )}
      </div>

      <div className="absolute bottom-5 text-center text-red-500">
        {errorMsg}
      </div>
    </form>
  );
};

export default UserDetailsForm;