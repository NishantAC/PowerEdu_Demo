import { API_BASE_URL } from "@/common/constant";
import axios from "axios";

const API_URL = API_BASE_URL+"question-paper/";

const addPaper = async (
  schoolcode,
  classid,
  examtype,
  subject,
  academicyear,
  paperFile,
  createdby
) => {
  try {
    const formData = new FormData();
    formData.append("schoolcode", schoolcode);
    formData.append("classid", classid);
    formData.append("examtype", examtype);
    formData.append("subject", subject);
    formData.append("paper", paperFile);
    formData.append("academicyear", academicyear);
    formData.append("createdby", createdby);

    const response = await axios.post(`${API_URL}add`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const fetchPapers = async (schoolcode, classid, subject) => {
  try {
    const response = await axios.post(`${API_URL}get`, {
      schoolcode,
      classid,
      subject,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const fetchAllPapers = async (schoolcode) => {
  try {
    const response = await axios.post(`${API_URL}getAll`, { schoolcode });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const deletePaper = async (id) => {
  try {
    console.log(id);
    const response = await axios.delete(`${API_URL}/` + id);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
const QuestionPaperService = {
  addPaper,
  fetchPapers,
  fetchAllPapers,
  deletePaper,
};

export default QuestionPaperService;
