import { API_BASE_URL } from "@/common/constant";
import axios from "axios";

const API_URL = API_BASE_URL+"sp";

const getInfoSchool = async () => {
  try {
    const response = await axios.get(
      `${API_URL}/sp_schoolinfo`
    );

    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};


const updateSchoolInfo = async (schoolData,school_code) => {
  try {
    const response = await axios.put(
      `${API_URL}/sp_schoolinfo/update/${school_code}`,schoolData
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};


const SpSchoolInfoService = {
   getInfoSchool,
   updateSchoolInfo
  };
  
  export default SpSchoolInfoService;
  