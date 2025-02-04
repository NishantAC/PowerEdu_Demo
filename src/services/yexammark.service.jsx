import { API_BASE_URL } from "@/common/constant";
import axios from "axios";

const API_URL = API_BASE_URL+"exammark/";

const registeryexammark = async (school_id, classname, subjectname, studentname, examdate, obtainedmarks, createdby) => {
  try {
    const response = await axios.post(`${API_URL}registeryexammark`, {
      school_id,
      classname,
      subjectname,
      studentname,
      examdate,
      obtainedmarks,
      createdby,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message);
  }
};

// const classnoticedata = async (code, clas) => {
//   const response = await axios
//     .post(API_URL + "classnoticedata", {
//       code,
//       clas
//     });
//   if (response.data.classname) {
//     localStorage.setItem("classnotice", JSON.stringify(response.data));
//   }
//   return response.data;
// };

const YExamMarkService = {
  registeryexammark,
  // classnoticedata
};

export default YExamMarkService;
