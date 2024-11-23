import React, { useEffect, useState } from "react";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import InputParent from "../Profiles/EditProfile/InputParent";
import { ClickAwayListener, backdropClasses } from "@mui/material";
import "./Select.css";

function MultiSelectBox({
  text,
  placeholder,
  options,
  formValues,
  setFormValues,
}) {
  const [isSelectDropdownOpen, setSelectDropdownOpen] = useState(false);
  const [isAllpressed, setAllPressed] = useState(false);

  return (
    <ClickAwayListener onClickAway={() => setSelectDropdownOpen(false)}>
      <div
        style={{
          width: "100%",
          height: "100%",
        }}
      >
        <InputParent text={text}>
          <div
            style={{
              width: "100%",
              height: "100%",
              backgroundColor: "white",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "10px",
              userSelect: "none",
            }}
            onClick={() => setSelectDropdownOpen(!isSelectDropdownOpen)}
          >
            <div
              style={{
                fontFamily: "Inter",
                fontSize: "22px",
                fontWeight: "400",
                color: "rgba(0,0,0,0.65)",
              }}
            >
              {formValues?.subjectName?.length === 0 ? (
                <div
                  style={{
                    fontStyle: "italic",
                    color: "#909090",
                    opacity: "65%",
                  }}
                >
                  {placeholder}
                </div>
              ) : (
                formValues?.subjectName?.join(", ")
              )}
            </div>
            <div style={{ color: "#C6C6C6" }}>
              <ArrowDropDownIcon />
            </div>
          </div>
        </InputParent>

        {isSelectDropdownOpen && (
          <div
            style={{
              position: "absolute",
              top: "100%",
              width: "100%",
              height: "143px",
              backgroundColor: "white",
              boxShadow: "0 4px 4px 0 rgba(0, 0, 0, 0.25)",
              border: "1px solid #E0DDDD",
              overflowY: "scroll",
              overflowX: "hidden",
              zIndex: "30",
            }}
          >
            {options.map((option, index) => (
              <div
                className="classNo"
                style={{
                  width: "100%",
                  fontFamily: "Lato",
                  fontSize: "18px",
                  fontWeight: "400",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                }}
                onClick={() => {
                  if (option.subject_name === "All") {
                    setList([option.subject_name]);
                    setAllPressed(true);
                  } else {
                    if (isAllpressed) {
                      setList([option.subject_name]);
                    } else {
                      if (
                        !formValues?.subjectName.includes(option.subject_name)
                      ) {
                        const newSubjectNameList = [
                          ...formValues?.subjectName,
                          option.subject_name,
                        ];

                        const newSubjectCodeList = [
                          ...formValues?.subjectCode,
                          option.subject_code,
                        ];

                        const newChapterNoList = [
                          ...formValues?.noOfChapters,
                          option.chapter_nos,
                        ];

                        setFormValues({
                          ...formValues,
                          subjectName: newSubjectNameList,
                          subjectCode: newSubjectCodeList,
                          noOfChapters: newChapterNoList,
                        });
                      }
                    }
                    setAllPressed(false);
                  }
                }}
                key={option.subject_code} // Make sure to add a unique key when mapping over an array
              >
                {option.subject_name}
              </div>
            ))}
          </div>
        )}
      </div>
    </ClickAwayListener>
  );
}

export default MultiSelectBox;
