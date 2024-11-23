import { API_BASE_URL } from "@/common/constant";
import axios from "axios";
const Api_Url = API_BASE_URL;

const getimageUrl = async (path) => {
    const res = await axios.post(`${Api_Url}profile/getimg`, { path: path.toString() });
    return res;
}

const imageService = {
    getimageUrl
}

export default imageService;