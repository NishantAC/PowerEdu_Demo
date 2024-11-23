import { API_BASE_URL } from "@/common/constant";
import axios from "axios";

const API_URL = API_BASE_URL+"assignment/";

const registerassignmentstatus = (schoolcode, classname, subjectname, studentname, assigndate, submitdate, status) => {
  return axios.post(API_URL + "registerassignmentstatus", {
    schoolcode, classname, subjectname, studentname, assigndate, submitdate, status
  });
};

const AssignmentStatusService = {
    registerassignmentstatus
};

export default AssignmentStatusService;
