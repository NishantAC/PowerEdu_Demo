import axios from "axios";
import { API_BASE_URL } from "../common/constant";
import download from "downloadjs";

//{API_BASE_URL}common/ to {API_BASE_URL}assignments/
const API_URL = `${API_BASE_URL}assignments/`;

const downloadFileByPath = async (filePath) => {
  try {
    
    const response = await axios.post(`${API_URL}download-file`, filePath);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const downloadFileByBytes = (file, filePath) => {
  const spl = filePath.split("/");
  const fileName = spl[spl.length - 1];
  download(file.data, fileName);
};

const CommonService = {
  downloadFileByPath,
  downloadFileByBytes,
};

export default CommonService;
