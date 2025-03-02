import { API_BASE_URL } from "@/common/constant";
import axios from "axios";
import { toast } from "sonner";
const API_URL = API_BASE_URL + "admin/subjects";
const powerEduAuthToken = localStorage.getItem("powerEduAuthToken");
const token = "Bearer " + JSON.parse(powerEduAuthToken);

const registerSubject = async (
  subject_code,
  subject_name,
  class_code,
  pclass,
  description
) => {
  try {
    toast.info("Creating subject");
    const response = await axios.post(
      `${API_URL}`,
      {
        subject_code,
        subject_name,
        class: class_code,
        pclass,
        description,
      },
      {
        headers: {
          Authorization: token,
        },
      }
    );
    toast.success("Subject created successfully");
    return response.data;
  } catch (error) {
    toast.error("Error creating subject");
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

const updateSubjectsOfClasses = async ({
  subject_name,
  description,
  subject_code,
}) => {
  try {
    toast.info("Updating subject");
    const response = await axios.put(
      `${API_URL}/${subject_code}`,
      {
        subject_name,
        description,
      },
      {
        headers: {
          Authorization: token,
        },
      }
    );
    toast.success("Subject updated successfully");
    return response.data;
  } catch (error) {
    toast.error("Error updating subject");
    console.error(error);
    throw error;
  }
};

const getSubjectsOfClasses = async (class_code) => {
  try {
    const response = await axios.get(`${API_URL}/?class=${class_code}`, {
      headers: {
        Authorization: token,
      },
    });

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

const deleteSubjectsOfClasses = async (subject_code) => {
  try {
    toast.info("Deleting subject");
    const response = await axios.delete(
      `${API_URL}/${subject_code}`,
      {
        headers: {
          Authorization: token,
        },
      }
    );
    //
    toast.success("Subject deleted successfully");
    return response.data;
  } catch (error) {
    toast.error("Error deleting subject");
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
