import { API_BASE_URL } from "@/common/constant";
import axios from "axios";

const API_URL = API_BASE_URL+"exam/";

const registerExam = async (school_id, classname, subjectname, syllabus, examdate, totalmarks, createdby) => {
  try {
    const response = await axios.post(API_URL + "registeryexam", {
      school_id,
      classname,
      subjectname,
      syllabus,
      examdate,
      totalmarks,
      createdby
    });

    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to register exam.");
  }
};

const YExamService = {
    registerExam,
};

export default YExamService;
