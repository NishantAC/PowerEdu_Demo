import { API_BASE_URL } from "@/common/constant";
import axios from "axios";

const API_URL = API_BASE_URL+"syllabuses/";

const registerSyllabus = async (schoolCode, className, subjectName, chapterName, status, createdBy) => {
  try {
    const response = await axios.post(`${API_URL}register-syllabus`, {
      schoolCode,
      className,
      subjectName,
      chapterName,
      status,
      createdBy,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getSyllabusBySubject = async (school_id, classid, subjectid) => {
  try {
    const response = await axios.post(`${API_URL}get`, {
      school_id,
      classid,
      subjectid
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const SyllabusService = {
  registerSyllabus,
  getSyllabusBySubject
};

export default SyllabusService;
