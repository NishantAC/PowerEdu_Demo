import axios from "axios";

const API_URL = "exam-type/";

const addExamType = async ({ school_code, class_code, title }) => {
  try {
    const response = await axios.post(API_URL + "add", {
      school_code,
      class_code,
      title,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const fetchExamTypes = async ({ school_code, class_code }) => {
  try {
    const response = await axios.post(API_URL + "get", {
      school_code,
      class_code,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const fetchDropdownExamTypes = async ({ school_code, class_code }) => {
  try {
    const response = await axios.post(
      API_URL + "dropdownExamTypesAndSubjects",
      {
        school_code,
        class_code,
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// use this for examtype dropdown in exam component in student dashboard
const fetchDropdownExamTypesForClass = async ({ school_code, class_code }) => {
  try {
    const response = await axios.post(API_URL + "dropdownExamTypeForClass", {
      school_code,
      class_code,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const updateExamType = async ({ id, school_code, class_code, title }) => {
  try {
    const response = await axios.put(API_URL + `update/${id}`, {
      school_code,
      class_code,
      title,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const deleteExamType = async (id) => {
  try {
    const response = await axios.delete(API_URL + `delete/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const mergeExamTypes = async (examTypeData, class_code) => {
  try {
    const response = await axios.post(API_URL + "merge", {
      examTypeData,
      class_code,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const ExamTypeService = {
  fetchDropdownExamTypes,
  mergeExamTypes,
  addExamType,
  fetchExamTypes,
  updateExamType,
  deleteExamType,
};

export default ExamTypeService;
