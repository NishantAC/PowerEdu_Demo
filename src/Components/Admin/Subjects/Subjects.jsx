import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import SubjectsTable from "./SubjectsTable";
import { useDispatch, useSelector } from "react-redux";
import {
  getSubjectsOfClasses,
} from "../../../slices/subject";
import SubjectService from "../../../services/subject.service";
import useDebounce from "../../../Utils/debounce";
import { selectThemeProperties } from "@/slices/theme";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import InputField from "@/Components/InputField/InputField";
import { Button } from "@/components/ui/button"; // Import Button component
import { Link } from "react-router-dom";

function Subjects() {
  const { user } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500); // 500ms debounce delay
  const { subjects, status } = useSelector((state) => state.subject);
  const { classes } = useSelector((state) => state.manageClasses);
  const themeProperties = useSelector(selectThemeProperties);
  const [filteredSubjects, setFilteredSubjects] = useState(subjects);
  const [classFilter, setClassFilter] = useState(null);
  const dispatch = useDispatch();

  const [newSubject, setNewSubject] = useState({
    subject_code: "",
    class: "",
    subject_name: "",
    description: "",
    pclass: "",
  });

  const handleNewSubjectChange = (e) => {
    const { name, value } = e.target;
    setNewSubject((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreateSubject = async () => {
    try {
      await SubjectService.registerSubject(
        newSubject?.subject_code,
        newSubject?.subject_name,
        newSubject?.class,
        newSubject?.class.split(/[A-Za-z]/)[0],
        newSubject?.description
      );
      toast.success("Subject created successfully");
      setNewSubject({
        subject_code: "",
        class: "",
        subject_name: "",
        description: "",
        pclass: "",
      });
      dispatch(getSubjectsOfClasses(classFilter));
    } catch (error) {
      toast.error("Error creating subject");
      console.error("Error creating subject:", error);
    }
  };

  const getLimit = () => {
    const height = window.innerHeight;
    const intHeight = parseInt(height / 100);
    return intHeight - 1;
  };

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(getLimit());

  useEffect(() => {
    const intHeight = getLimit();
    setLimit(intHeight);
  }, [window.innerHeight, page]);


  useEffect(() => {
    if (user && user?.school_id !== undefined && classFilter !== null) {
      dispatch(getSubjectsOfClasses(classFilter));
    }
  }, [user, classFilter]);



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

  useEffect(() => {
    if (classes?.data) {
      const sortedClasses = classes.data.slice().sort(sortClassCodes);
      setClassFilter(sortedClasses[0]?.class_code);
    }
  }, [classes]);

  const handleClassChange = (value) => {
    setClassFilter(value);
  };

  return (
    <div className="subjectsContainer">
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "10px",
          }}
        >
          <div className="">
            <Select onValueChange={handleClassChange}>
              <SelectTrigger>
                <SelectValue placeholder={classFilter} />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {classes?.data
                    ?.slice() // Create a shallow copy of the array
                    .sort(sortClassCodes)
                    .map((classItem) => (
                      <SelectItem
                        key={classItem.class_code}
                        value={classItem.class_code}
                      >
                        {classItem.class_code}
                      </SelectItem>
                    ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <button
                style={{
                  backgroundColor: themeProperties?.normal1,
                  color: themeProperties?.textColorAlt,
                }}
                className="px-4 py-2 rounded-md bottom-5 absolute right-5"
              >
                Create New Subject
              </button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Subject</DialogTitle>
                <DialogDescription></DialogDescription>
              </DialogHeader>
              <div className="space-y-6 mt-10">
                <div className="flex w-full justify-between items-center">
                  <InputField
                    value={newSubject.subject_code}
                    htmlFor="subject_code"
                    placeholder="Subject Code ( Math104 )"
                    name="subject_code"
                    handleChange={handleNewSubjectChange}
                    required
                  />

                  <InputField
                    value={newSubject.subject_name}
                    htmlFor="subject_name"
                    placeholder="Subject Name"
                    name="subject_name"
                    handleChange={handleNewSubjectChange}
                    required
                  />
                </div>

                <div className="flex w-full justify-between items-center">
                  <Select
                    onValueChange={(value) =>
                      setNewSubject((prev) => ({ ...prev, class: value }))
                    }
                  >
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Select Class" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Class</SelectLabel>
                        {classes?.data
                          ?.slice()
                          .sort(sortClassCodes)
                          .map((classItem) => (
                            <SelectItem
                              key={classItem.class_code}
                              value={classItem.class_code}
                            >
                              {classItem.class_code}
                            </SelectItem>
                          ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <InputField
                    // value will be the subject code integer for example 10A then 10
                    value={newSubject.class.split(/[A-Za-z]/)[0]}
                    htmlFor="pclass"
                    placeholder="Grade ( auto select ) "
                    name="pclass"
                    handleChange={handleNewSubjectChange}
                    required
                    disable
                  />
                </div>

                <InputField
                  value={newSubject.description}
                  htmlFor="description"
                  placeholder="Description"
                  name="description"
                  handleChange={handleNewSubjectChange}
                  required
                  type="textarea"
                />
              </div>
              <Button onClick={handleCreateSubject}>Create</Button>
            </DialogContent>
          </Dialog>
        </div>
        <div
          style={{
            width: "100%",
          }}
        >
          <SubjectsTable
            subjects={subjects?.data}
            page={page}
            limit={limit}
            total={subjects.count}
            themeProperties={themeProperties}
            isLoading={status === "loading"}
          />

          <Link
            to="/admin/manage-classes"
            className="absolute bottom-5 left-5 px-6 rounded-lg py-2"
            style={{
              backgroundColor: themeProperties?.normal1,
              color: themeProperties?.textColorAlt,
            }}
          >
            Manage Classes
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Subjects;
