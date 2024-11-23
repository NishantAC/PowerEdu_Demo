import axios from 'axios';

const API_URL = "https://api.poweredu.in/api";

const getSubjectsByClass = (classNumber) => {
  return axios.get(`${API_URL}/subjectlist?class=${classNumber}`);
};

const SubjectsListClassService = {
  getSubjectsByClass,
};

export default SubjectsListClassService;
