import { API_BASE_URL } from "@/common/constant";
import axios from "axios";

const API_URL = API_BASE_URL + "admin/subjects";
const powerEduAuthToken = localStorage.getItem("powerEduAuthToken");
const token = "Bearer " + JSON.parse(powerEduAuthToken);

const registerSubject = async (
  schoolCode,
  className,
  subjectName,
  createdBy
) => {
  try {
    const response = await axios.post(`${API_URL}register-subject`, {
      schoolCode,
      className,
      subjectName,
      createdBy,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getAllSubjectsDetails = async (class_code, school_code, subject_code) => {
  try {
    const response = await axios.post(`${API_URL}class-subjects`, {
      class_code,
      school_code,
      subject_code,
    });
    //
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getAllSubjectsBySchool = async (school_id) => {
  try {
    const response = await axios.post(`${API_URL}school-subjects`, {
      school_id,
    });
    //
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getAssignedSubjects = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}${userId}/subject-details`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

//args(clsid,shclcode,subjectid)
const updateStatus = async (chapterId, status, chapter_number) => {
  try {
    //
    const response = await axios.put(`${API_BASE_URL}chapters/status`, {
      chapterId,
      status,
      chapter_number,
    });
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getDropdownSubjectsByClass = async (school_id, class_code, timetable) => {
  try {
    const response = await axios.post(`${API_URL}class-subjects-dropdown`, {
      school_id,
      class_code,
      timetable,
    });
    //
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getAllDropdownSubjectsByClass = async (class_code) => {
  try {
    const response = await axios.post(`${API_URL}class-all-subjects-dropdown`, {
      class_code,
    });
    //
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const updateSubjectsOfClasses = async (body) => {
  try {
    const response = await axios.post(
      `${API_URL}update-subjects-of-classes`,
      body
    );
    //
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getSubjectsOfClasses = async (class_code) => {
  try {
    const response = await axios.get(
      `${API_URL}/?class=${class_code}`,
      {
        headers: {
          Authorization: token,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getSearchSubjectsOfClasses = async (body) => {
  try {
    const response = await axios.post(
      `${API_URL}get-search-subject-classes`,
      body
    );
    //

    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const deleteSubjectsOfClasses = async (body) => {
  try {
    const response = await axios.post(
      `${API_URL}delete-subjects-of-classes`,
      body
    );
    //
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const SubjectService = {
  registerSubject,
  getAllSubjectsDetails,
  getAssignedSubjects,
  updateStatus,
  getDropdownSubjectsByClass,
  getAllSubjectsBySchool,
  getAllDropdownSubjectsByClass,
  updateSubjectsOfClasses,
  getSubjectsOfClasses,
  deleteSubjectsOfClasses,
  getSearchSubjectsOfClasses,
};

export default SubjectService;
