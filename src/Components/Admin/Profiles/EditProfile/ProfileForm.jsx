import React from "react";
import { useState, useEffect } from "react";
import SelectBox from "@/Components/InputField/SelectBox";
import InputField from "@/Components/InputField/InputField";
import { useSelector } from "react-redux";
import authService from "@/services/auth.service";
import classService from "@/services/class.service";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Calendar as CalendarIcon } from "lucide-react";
import { selectThemeProperties } from "@/slices/theme";
import { format } from "date-fns";


const ProfileForm = ({ profiletype, values, handleChange }) => {
  const themeProperties = useSelector(selectThemeProperties);
  const { user } = useSelector((state) => state.user);
  const [classesDropdown, setClassesDropdown] = useState([]);
  useEffect(() => {
    if (profiletype && user?.school_id !== undefined) {
      const body = {
        school_code: user?.school_id,
        userType: profiletype.toLowerCase(),
      };
      // authService
      //   .getUniqueRekorId(body)
      //   .then((res) => {
      //     setRekorId(res.id);
      //   })
      //   .catch((error) => {
          
      //   });

      authService
        .getUniqueAdmissionNo(body)
        .then((res) => {
          setAdmissionNoPlaceholder(res.admissionNo);
        })
        .catch((error) => {
          
        });

      if (profiletype == "students") {
        classService.getDropdownClasses(user?.school_id).then((res) => {
          setClassesDropdown(res);
        });
      }

      if (profiletype == "teachers") {
        classService
          .getAvailableClasses({ school_code: user?.school_id })
          .then((res) => {
            setClassesDropdown(res.data);
          });
      }
    }

    console.log("user", classesDropdown );
  }, [user, profiletype]);

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
    <>
      <div className=" flex flex-col gap-10 w-full">
        <div className=" flex items-center gap-10 ">
          <div className="PowerEduID">
            <InputField
              name="user_id"
              value={values.user_id}
              handleChange={handleChange}
              htmlFor="rekorId"
              placeholder="Rekor ID"
              required={true}
              disable={true}
              type="number"
            />
          </div>
          <div className="AdmissionNo">
            <div
              className="inputBox"
              style={{ display: "flex", alignItems: "center", width: "160px" }}
            >
              {values.profiletype &&
                values.profiletype.charAt(0).toUpperCase() +
                  values.profiletype.slice(1)}
            </div>
            <div className="admissionNo">
              <InputField
                name="admissionno"
                value={values.admissionno}
                handleChange={handleChange}
                htmlFor="admissionNo"
                placeholder="Admission No"
                required={true}
                disable={true}
                type="number"
              />
            </div>
          </div>
          <div className="dob">
          
          <label
            htmlFor="dob" 
            className="text-black text-[12px] font-normal absolute -translate-y-5 translate-x-1"
            style={{
              color : themeProperties?.textColorLight
            }}
          > Date of Birth
          </label>
          <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "justify-start text-center w-48 font-normal text-black",
                    !values.dob && "text-muted-foreground"
                  )}
                  style={{
                    background: themeProperties?.inputBackground,
                    color: themeProperties?.inputTextColor,
                  }}
                >
                  <CalendarIcon className="h-4 w-4" />
                  {values.dob ? (
                    format(new Date(values.dob), "PPP")
                  ) : (
                    <span>Date of Birth</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={
                    values.dob ? new Date(values.dob) : undefined
                  }
                  onSelect={(selectedDate) => handleDateChange("dob", selectedDate)}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          <div className="AdmissionDate">
          <label
            htmlFor="admissionDate" 
            className="text-black text-[12px] font-normal absolute -translate-y-5 translate-x-1"
            style={{
              color : themeProperties?.textColorLight
            }}
          > {profiletype === "students" ? "Admission Date" : "Joining Date"}
          </label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "justify-start text-center w-48 font-normal text-black",
                    !values.admissionDate && "text-muted-foreground"
                  )}
                  style={{
                    background: themeProperties?.inputBackground,
                    color: themeProperties?.inputTextColor,
                  }}
                >
                  <CalendarIcon className="h-4 w-4" />
                  {values.admissionDate ? (
                    format(new Date(values.admissionDate), "PPP")
                  ) : (
                    <span>
                      {profiletype === "students" ? "Admission Date" : "Joining Date"}
                    </span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={
                    values.admissionDate ? new Date(values.admissionDate) : undefined
                  }
                  onSelect={(selectedDate) => handleDateChange("admissionDate", selectedDate)}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        <div className="Name flex gap-10 items-center ">
          <div className="firstName">
            <InputField
              name="firstname"
              value={values.firstname}
              handleChange={handleChange}
              htmlFor="firstName"
              placeholder="First Name"
              required={true}
              type="text"
            />
          </div>
          <div className="middleName">
            <InputField
              name="middlename"
              value={values.middlename}
              handleChange={handleChange}
              htmlFor="middleName"
              placeholder="Middle Name"
              type="text"
            />
          </div>
          <div className="lastName">
            <InputField
              name="lastname"
              value={values.lastname}
              handleChange={handleChange}
              htmlFor="lastName"
              placeholder="Last Name"
              required={true}
              type="text"
            />
          </div>
          <div>
            <InputField
              name="email"
              value={values.email}
              handleChange={handleChange}
              htmlFor="email"
              placeholder="Email"
              required={true}
              type="email"
            />
          </div>
        </div>
        <div className="">
          {profiletype === "students" ? (
            <div className=" flex gap-10 items-center">
              <div className="studentClass">
                <label htmlFor="class" className="text-black text-[12px] font-normal absolute -translate-y-5 translate-x-1"
                  style={{  color : themeProperties?.textColorLight }}
                > Class
                </label>
                <SelectBox
                  text="Class"
                  options={classesDropdown}
                  placeHolder="Class"
                  info={values.class}
                  setInfo={(selectedClass) =>
                    handleChange({
                      target: { name: "class", value: selectedClass },
                    })
                  }
                />
              </div>
              <div className="studentRollNo">
                <InputField
                  name="rollno"
                  value={values.rollno}
                  handleChange={handleChange}
                  htmlFor="rollNo"
                  placeholder="Roll No"
                  required={true}
                  type="number"
                />
              </div>

              <div className="gender">
              <label htmlFor="gender" className="text-black text-[12px] font-normal absolute -translate-y-5 translate-x-1"
                  style={{  color : themeProperties?.textColorLight }}
                > Gender
                </label>
                <SelectBox
                  text="Gender"
                  options={["Male", "Female", "Others"]}
                  placeHolder="Gender"
                  info={values.gender}
                  setInfo={(selectedGender) =>
                    handleChange({
                      target: { name: "gender", value: selectedGender },
                    })
                  }
                />
              </div>
            </div>
          ) : profiletype === "teachers" ? (
            <div className=" flex gap-10 items-center">
              <div className="teacherRole">
                <SelectBox
                  text="Role"
                  options={["Teacher", "Class Teacher"]}
                  placeHolder=""
                  info={values.role}
                  setInfo={(selectedRole) =>
                    handleChange({
                      target: { name: "role", value: selectedRole },
                    })
                  }
                />
              </div>
              <div className="teacherClass">
                <InputField
                  name="class"
                  value={values.class}
                  handleChange={handleChange}
                  htmlFor="class"
                  placeholder="Class"
                  required={true}
                  type="text"
                />
              </div>
              <div className="teacherSubject">
                <SelectBox
                  text="Subject"
                  options={["Science", "English", "Hindi", "Mathematics"]}
                  placeHolder=""
                  info={values.subject}
                  setInfo={(selectedSubject) =>
                    handleChange({
                      target: { name: "subject", value: selectedSubject },
                    })
                  }
                />
              </div>
              <div className="teacherAdmissionDate">
                <InputField
                  type="text"
                  name="admissionDate"
                  value={values.admissionDate}
                  handleChange={handleChange}
                  htmlFor="admissionDate"
                  placeholder="Admission Date"
                  required={true}
                  disable={true}
                />
              </div>
            </div>
          ) : (
            <>
              {profiletype === "staff" && (
                <div className="flex gap-10 items-center ">
                  <div className="staffRole">
                    <SelectBox
                      text="Role"
                      options={["Driver", "Janitor"]}
                      placeHolder=""
                      info={values.role}
                      setInfo={(selectedRole) =>
                        handleChange({
                          target: { name: "role", value: selectedRole },
                        })
                      }
                    />
                  </div>
                  <div className="gender">
                    <SelectBox
                      text="Gender"
                      options={["Male", "Female", "Others"]}
                      placeHolder=""
                      info={values.gender}
                      setInfo={(selectedGender) =>
                        handleChange({
                          target: { name: "gender", value: selectedGender },
                        })
                      }
                    />
                  </div>
                </div>
              )}
            </>
          )}
        </div>
        <div className="">
          {profiletype === "students" ? (
            <div className=" flex gap-10 items-center">
              <div className="fatherName">
                <InputField
                  name="fathername"
                  value={values.fathername}
                  handleChange={handleChange}
                  htmlFor="fatherName"
                  placeholder="Father's Name"
                  required={true}
                  type="text"
                />
              </div>
              <div className="motherName">
                <InputField
                  name="mothername"
                  value={values.mothername}
                  handleChange={handleChange}
                  htmlFor="motherName"
                  placeholder="Mother's Name"
                  required={true}
                  type="text"
                />
              </div>
              <div className="guardianName">
                <InputField
                  name="guardianname"
                  value={values.guardianname}
                  handleChange={handleChange}
                  htmlFor="guardianName"
                  placeholder="Guardian's Name"
                  type="text"
                />
              </div>
            </div>
          ) : (
            <div className=" flex gap-10 items-center ">
              <div className="primaryContactNo">
                <InputField
                  name="primaryContact"
                  value={values.primaryContact}
                  handleChange={handleChange}
                  htmlFor="primaryContactNo"
                  placeholder="Primary Contact No"
                  required={true}
                  type="tel"
                  pattern="[0-9]{10}"
                />
              </div>
              <div className="secondaryContactNo">
                <InputField
                  name="secondaryContact"
                  value={values.secondaryContact}
                  handleChange={handleChange}
                  htmlFor="secondaryContactNo"
                  placeholder="Secondary Contact No"
                  required={true}
                  type="tel"
                  pattern="[0-9]{10}"
                />
              </div>
            </div>
          )}
        </div>
        {profiletype === "students" && (
          <div className=" flex gap-10 items-center ">
            <div className="fatherContactNo">
              <InputField
                name="fatherContact"
                value={values.fatherContact}
                handleChange={handleChange}
                htmlFor="fatherContactNo"
                placeholder="Father's Contact No"
                required={true}
                type="tel"
                pattern="[0-9]{10}"
              />
            </div>
            <div className="motherContactNo">
              <InputField
                name="motherContact"
                value={values.motherContact}
                handleChange={handleChange}
                htmlFor="motherContactNo"
                placeholder="Mother's Contact No"
                required={true}
                type="tel"
                pattern="[0-9]{10}"
              />
            </div>
            <div className="guardianContactNo">
              <InputField
                name="guardianContact"
                value={values.guardianContact === "NaN" ? "" : values.guardianContact}
                handleChange={handleChange}
                htmlFor="guardianContactNo"
                placeholder="Guardian's Contact No"
                type="tel"
                pattern="[0-9]{10}"
              />
            </div>
          </div>
        )}
        <div className="flex gap-4 justify-between">
          <InputField
            name="address1"
            value={values.address1}
            handleChange={handleChange}
            htmlFor="address1"
            placeholder="Address Line 1"
            required={true}
            type="text"
            address={true}
          />
          <InputField
            name="address2"
            value={values.address2}
            handleChange={handleChange}
            htmlFor="address2"
            placeholder="Address Line 2"
            required={true}
            type="text"
            address={true}
          />
        </div>
      </div>
    </>
  );
};

export default ProfileForm;
