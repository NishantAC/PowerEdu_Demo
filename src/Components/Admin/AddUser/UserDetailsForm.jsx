import React, { useEffect, useState } from "react";
import InputField from "@/Components/InputField/InputField";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/Components/ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/Components/ui/button";
import { Calendar } from "@/Components/ui/calendar";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import SelectionBox from "./SelectionBox";
import SelectClass from "@/Components/InputField/SelectClass";

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
  rollNoPlaceholder,
  themeProperties,
  powereduId,
  guardianFormValues,
  numberLoading,
  handleGuardianChange,
  setGuardianFormValues,
}) => {
  const handleDateChange = (name, selectedDate) => {
    if (selectedDate) {
      const localDate = new Date(
        selectedDate.getTime() - selectedDate.getTimezoneOffset() * 60000
      );
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
            <div className=" flex gap-10 mt-10">
              <InputField
                type="text"
                value={powereduId}
                disable
                placeholder="Poweredu Id"
              />

              <InputField
                type="text"
                value={admissionNoPlaceholder}
                readOnly
                placeholder={
                  userType === "Student" ? "Admission Nu" : "Employee Id"
                }
              />

              <InputField
                value={formValues.username}
                htmlFor="username"
                placeholder="User Name * "
                name="username"
                type="text"
                handleChange={handleChange}
                themeProperties={themeProperties}
                required
              />

              <InputField
                value={formValues.password}
                htmlFor="password"
                placeholder="User Password * "
                name="password"
                type="password"
                handleChange={handleChange}
                themeProperties={themeProperties}
                required
              />
            </div>
            <div className="flex justify-start gap-10 items-center mt-4">
              <InputField
                value={formValues.first_name}
                htmlFor="first_name"
                placeholder="First Name"
                name="first_name"
                handleChange={handleChange}
                themeProperties={themeProperties}
                required={true}
              />
              <InputField
                value={formValues.middle_name}
                htmlFor="middle_name"
                placeholder="Middle Name (optional)"
                name="middle_name"
                handleChange={handleChange}
                themeProperties={themeProperties}
                required={false}
              />
              <InputField
                value={formValues.last_name}
                htmlFor="last_name"
                placeholder="Last Name"
                name="last_name"
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
              {userType === "Student" ? (
                <>
                  <div className="flex items-center">
                    <SelectClass
                      formValues={formValues}
                      setFormValues={setFormValues}
                    />
                  </div>
                  <InputField
                    value={formValues.roll_number}
                    htmlFor="rollNo"
                    placeholder="Roll No ( Auto Fill )"
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
                          !formValues.admission_date && "text-muted-foreground"
                        )}
                        style={{
                          background: themeProperties?.inputBackground,
                          color: themeProperties?.inputTextColor,
                        }}
                      >
                        <CalendarIcon className="h-4 w-4" />
                        {formValues.admission_date ? (
                          format(new Date(formValues.admission_date), "PPP")
                        ) : (
                          <span>Admission Date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={
                          formValues.admission_date
                            ? new Date(formValues.admission_date)
                            : undefined
                        }
                        onSelect={(selectedDate) =>
                          handleDateChange("admission_date", selectedDate)
                        }
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
              ) : userType === "Teacher" ? (
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
                        onSelect={(selectedDate) =>
                          handleDateChange("admissionDate", selectedDate)
                        }
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
                        onSelect={(selectedDate) =>
                          handleDateChange("admissionDate", selectedDate)
                        }
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
                    onSelect={(selectedDate) =>
                      handleDateChange("dob", selectedDate)
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>

              {userType === "Student" ? (
                <>
                  <InputField
                    value={guardianFormValues.father_name}
                    htmlFor="father_name"
                    placeholder="Father Name"
                    name="father_name"
                    type="text"
                    handleChange={handleGuardianChange}
                    themeProperties={themeProperties}
                    required={true}
                  />

                  <InputField
                    value={guardianFormValues.mother_name}
                    htmlFor="mother_name"
                    placeholder="Mother Name"
                    name="mother_name"
                    type="text"
                    handleChange={handleGuardianChange}
                    themeProperties={themeProperties}
                    required={true}
                  />

                  <InputField
                    value={guardianFormValues.guardian_name}
                    htmlFor="guardian_name"
                    placeholder="Guardian Name"
                    name="guardian_name"
                    type="text"
                    handleChange={handleGuardianChange}
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

                  {userType == "Teacher" && (
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
                  value={formValues.contact}
                  htmlFor="contact"
                  placeholder=" Contact"
                  name="contact"
                  type="tel"
                  pattern="[0-9]{10}"
                  title="Contact must have 10 digits number"
                  handleChange={handleChange}
                  themeProperties={themeProperties}
                  required={true}
                />

                <InputField
                  value={guardianFormValues.father_contact}
                  htmlFor="father_contact"
                  placeholder="Father Contact No."
                  name="father_contact"
                  type="tel"
                  pattern="[0-9]{10}"
                  title="Contact must have 10 digits number"
                  handleChange={handleGuardianChange}
                  themeProperties={themeProperties}
                  required={true}
                />

                <InputField
                  value={guardianFormValues.mother_contact}
                  htmlFor="mother_contact"
                  placeholder="Mother Contact No."
                  name="mother_contact"
                  type="tel"
                  pattern="[0-9]{10}"
                  title="Contact must have 10 digits number"
                  handleChange={handleGuardianChange}
                  themeProperties={themeProperties}
                  required={true}
                />

                <InputField
                  value={guardianFormValues.guardian_contact}
                  htmlFor="guardian_contact"
                  placeholder="Guardian Contact No."
                  name="guardian_contact"
                  type="tel"
                  pattern="[0-9]{10}"
                  title="Contact must have 10 digits number"
                  handleChange={handleGuardianChange}
                  themeProperties={themeProperties}
                  required={false}
                />
              </div>
            )}

            <div className=" mt-4 flex w-full justify-between">
              {userType === "Student" && (
                <div className="flex gap-20">
                  <InputField
                    value={guardianFormValues.address}
                    htmlFor="address"
                    placeholder="Address"
                    name="address"
                    type="text"
                    handleChange={handleGuardianChange}
                    themeProperties={themeProperties}
                    required
                    address={true}
                  />
                </div>
              )}
              {userType !== "Student" && (
                <div className="flex gap-10">
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
                </div>
              )}
            </div>

            <div className="flex gap-5 absolute bottom-6 right-6 text-lg">
              <Button
                className=" px-14 w-fit py-3 rounded"
                type="submit"
                disabled={!userType}
                style={{
                  display: !userType ? "none" : "block",
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
