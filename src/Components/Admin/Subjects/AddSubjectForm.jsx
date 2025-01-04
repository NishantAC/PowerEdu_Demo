import React from "react";
import { useDispatch } from "react-redux";
import { resetSubjectsDropdown, getSubjectsOfClasses } from "../../../slices/subject";
import SubjectService from "../../../services/subject.service";
import SelectBox from "../../InputField/SelectBox";
import InputField from "@/Components/InputField/InputField";
const AddSubjectForm = ({
  classesDropdown,
  formValues,
  setFormValues,
  alldropdownClassSubjects,
  user,
  dispatch,
  page,
  limit,
}) => {
  return (
    <div className="w-full min-h-[260px] shadow-md rounded-md relative">
      <div className="h-16 bg-gray-100 rounded-t-md pl-2 flex items-center font-semibold text-lg">
        Add Subject
      </div>
      <form>
        <div className="flex flex-wrap gap-8 p-5 pb-16">
          <div className="classNo bg-white">
            <SelectBox
              text="Class"
              options={classesDropdown}
              placeHolder=""
              info={formValues.class}
              setInfo={(selectedClass) =>
                setFormValues({
                  ...formValues,
                  class: selectedClass,
                })
              }
            />
          </div>

          <div className="subjectName relative">
            <MultiSelectBox
              text="Subject(s) *"
              placeholder="Enter Subject(s)"
              options={alldropdownClassSubjects}
              formValues={formValues}
              setFormValues={setFormValues}
            />
          </div>

          <div className="subjectCode">
            <InputParent text="Subject Code">
              <div className="inputBox flex items-center">
                {formValues?.subjectCode?.join(", ")}
              </div>
            </InputParent>
          </div>

          <div className="NoOfChapters">
            <InputParent text="No. Of Chapter(s)">
              <div className="inputBox flex items-center">
                {formValues?.noOfChapters?.join(", ")}
              </div>
            </InputParent>
          </div>
        </div>
      </form>
      <div className="absolute bottom-2 right-10 flex justify-center gap-5 font-medium text-lg">
        <button
          className="w-24 h-9 bg-white border border-red-600 text-red-600 rounded-md"
          onClick={() => {
            setFormValues({
              class: "",
              subjectName: [],
              subjectCode: [],
              noOfChapters: [],
            });
            dispatch(resetSubjectsDropdown()); // Clear the dropdown subjects
          }}
        >
          Reset
        </button>
        <button
          className="w-24 h-9 bg-blue-600 text-white border-none rounded-md"
          onClick={() => {
            const body = {
              school_code: user?.schoolcode,
              class_code: formValues.class,
              newSubjects: formValues.subjectCode,
            };
            SubjectService.updateSubjectsOfClasses(body).then(() => {
              setFormValues({
                class: "",
                subjectName: [],
                subjectCode: [],
                noOfChapters: [],
              });
              dispatch(
                getSubjectsOfClasses({
                  school_code: user?.schoolcode,
                  page,
                  limit,
                })
              );
            });
          }}
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default AddSubjectForm;
